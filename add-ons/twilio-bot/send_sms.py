import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ''
auth_token = ''
client = Client(account_sid, auth_token)

message = client.messages \
    .create(
         body='Hello, U have a class swap available! Access it at https://uswap-ua.herokuapp.com/lists',
         from_='+19147866638',
         to=''
     )

print(message.sid)
