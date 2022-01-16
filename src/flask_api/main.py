from flask import Flask, jsonify
import psycopg2 as ps
import psycopg2.extras as extras
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_cursor():
    conn_string = 'postgresql://sheldon:K4aR1tPFtqbpjL5u@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/uswap-classes-5484.bank?sslmode=verify-full&sslrootcert=ssl/root.crt'
    conn = None
    try:
        conn = ps.connect(conn_string)
        result = 'Success!'
    except Exception as e:
        result = 'Failed to connect to database.'
        print('{0}'.format(e))
    cur = conn.cursor(cursor_factory=extras.DictCursor)
    return cur, conn

@app.route('/find_swaps')
def find_swaps():

    cur, conn = get_cursor()
    sql = """
        SELECT s1.id AS ID_1, s2.id AS ID_2, s1.give AS Gives_1, s2.give AS Gives_2
        FROM swap_requests s1, swap_requests s2
        WHERE s1.id != s2.id AND s1.give = s2.get AND s2.give = s1.get
    """
    cur.execute(sql)
    result = cur.fetchall()
    results = []
    for row in result:
        results.append(dict(row))
    return jsonify(results)


@app.route('/get_user_swaps/<email>')
def get_user_swaps(email):

    cur, conn = get_cursor()
    sql = """
        SELECT give, get
        FROM swap_requests
        WHERE id = %s
    """
    cur.execute(sql, (str(email),))
    result = cur.fetchall()
    results = []
    for row in result:
        get_title = row['get']
        give_title = row['give']
        cur.execute("SELECT * FROM winter2022 WHERE \"Title\" = %s", (get_title,))
        row['get'] = []
        get_class = cur.fetchall()
        for detail in get_class:
            row['get'].append(dict(detail))

        cur.execute("SELECT * FROM winter2022 WHERE \"Title\" = %s", (give_title,))
        row['give'] = []
        give_class = cur.fetchall()
        for detail in give_class:
            row['give'].append(dict(detail))

        results.append(dict(row))
    return jsonify(results)


@app.route('/search/<class_name>')
def search_class(class_name):

    cur, conn = get_cursor()
    cur.execute(f"SELECT * FROM winter2022 WHERE \"Class\" LIKE '{class_name}'", )
    result = cur.fetchall()
    results = []
    for row in result:
        results.append(dict(row))
    return jsonify(results)

@app.route('/add_swap_request/<user_id>/<give_title>/<get_title>')
def add_swap_request(user_id, give_title, get_title):

    cur, conn = get_cursor()
    try:
        cur.execute(f"INSERT INTO swap_requests VALUES ('{user_id}', '{give_title}','{get_title}')", )
        conn.commit()
        cur.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify('fail')

    return jsonify('success')


@app.route('/delete_swap_request/<user_id>/<give_title>/<get_title>')
def delete_swap_request(user_id, give_title, get_title):

    cur, conn = get_cursor()
    try:
        cur.execute(f"DELETE FROM swap_requests WHERE id = '{user_id}' AND give='{give_title}' AND get='{get_title}'")
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(e)
        return jsonify('fail')

    return jsonify('success')



if __name__ == '__main__':
    # This is used when running locally only.
    app.run(host='127.0.0.1', port=8070, debug=True)
