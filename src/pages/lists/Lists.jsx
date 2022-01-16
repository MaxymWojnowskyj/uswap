import React, { useState, useEffect } from 'react'
import './lists.css'




// request current and future semesters here
const options = [
    { value: 'Winter 2022', label: 'Winter 2022'}
    //{ value: 'Fall 2022', label: 'Fall 2022'}
]

//let loadedClasses = []


const outterDivStyle = {
    paddingTop: 20,
}

const Lists = () => {
    const [classSem, setClassSem] = useState()
    const [className, setClassName] = useState()
    const [classCode, setClassCode] = useState()
    const [loadedClasses, setLoadedClasses] = useState([])
    const [loadedOffers, setLoadedOffers] = useState([])
    const [loadedWants, setLoadedWants] = useState([])
    /*
    useEffect(() => {
        const getOWLists = async () => {
            const pulledLists = await fetchOWLists()
            setLoadedOffers(pulledLists.Offers)
            setLoadedOffers(pulledLists.Wants)
        }

        getOWLists()

    }, [loadedOffers, loadedWants]) //update the users offers and wants lists in the database when the user updates them in the page

    const fetchOWLists = async () => {
        const response = await fetch('url')
        const data = await response.json()
        return data
    }
    */

    const searchClass = async () => {
        console.log("Class Sem:", classSem)
        console.log(className)
        console.log(classCode)
        setLoadedClasses([])

        const response = await fetch(`https://class-swap.df.r.appspot.com/search/${className.toUpperCase().replace(/ /g, '')}%20${classCode.replace(/ /g, '')}`)//, {

        let json = await response.json()
        console.log(json)

        setLoadedClasses([...loadedClasses, ...json])

    }

    const addClass = (e) => {
        //grab index of btn id (OfferID): O0, O1, O2, etc
        let selected_class = loadedClasses[e.target.id[1]]
        let offer_or_want = e.target.id[0]
    }

    const delListItem = async (e) => {
        console.log(e.target)

        let selected_class = loadedClasses[e.target.id[1]]
        let offer_or_want = e.target.id[0]
        /*
        const response = await fetch('url', {
            method: 'DELETE'
        })

        if (response.status !== '200') {
            alert('Delete request failed, please try again')
        } else {
            //delete request went through successfully go back to useEffect so the lists can be refreshed
            //if offer_or_want == offer
            //setLoadedOffers()
        }*/






    }

    return (
        <div style={outterDivStyle}>
            <div className='classSearchDiv'>
                <label>Class Search:</label>
                <div className='searchInputsDiv'>
                    <select id='sem_select' value={classSem} onChange={e=>setClassSem(e.target.value)}>
                        <option>Select Semester</option>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input placeholder='Name (Cmput)' onChange={e => setClassName(e.target.value)}></input>
                    <input placeholder='Code (201)' onChange={e => setClassCode(e.target.value)}></input>
                    <button onClick={searchClass} >Search</button>
                </div>
            </div>
            <div className='foundClasses'>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedClasses.map((_class, index) => (
                            <tr key={index}>
                                <td>{_class.Title.substring(0,3)}</td>
                                <td>{_class.Class+', '+_class.Title.split(' ')[1]}</td>
                                <td>{`${_class.Days} ${_class.Start} - ${_class.Finish}`}</td>
                                <td>{_class.Primary_Instructor}</td>
                                <td>
                                    <button id={'O'+index} onClick={addClass}>Offer</button>
                                    <button id={'W'+index} onClick={addClass} >Want</button>
                                </td>
                            </tr>
                        ))}
                        {/*<tr>
                            <td>Lec</td>
                            <td>Cmput 201, B1</td>
                            <td>10:00-11:50</td>
                            <td>Guohui Lin</td>
                            <td>
                                <button id="O1" onClick={offerAdd}>Offer</button>
                                <button id="W1" onClick={wantAdd} >Want</button>
                            </td>
                        </tr>*/}

                    </tbody>
                </table>
            </div>
            <div className='listsDiv'>
                <div className='ofListDiv'>
                    <label className='listLabel' >Offer List</label>
                    <table className='listTable'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/*loadedClasses.map((_class) => (
                            <tr>
                                <td>{_class.Title.substring(0,3)}</td>
                                <td>{_class.Class+', '+_class.Title.split(' ')[1]}</td>
                                <td>{`${_class.Days} ${_class.Start} - ${_class.Finish}`}</td>
                                <td>{_class.Primary_Instructor}</td>
                                <td>
                                    <button className='listDel' >X</button>
                                </td>
                            </tr>
                        ))*/}
                        <tr>
                            <td>Lec</td>
                            <td>Cmput 201, B1</td>
                            <td>10:00-11:50</td>
                            <td>Guohui Lin</td>
                            <td>
                                <button className='listDel' >X</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className='wntListDiv'>
                    <label className='listLabel' >Want List</label>
                    <table className='listTable'>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Class</th>
                            <th>Time</th>
                            <th>Instructor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lab</td>
                            <td>Cmput 201, R2</td>
                            <td>10:00-11:50</td>
                            <td>Guohui Lin</td>
                            <td>
                                <button className='listDel'>X</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Lists
