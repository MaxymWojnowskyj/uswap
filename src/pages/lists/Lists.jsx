import React, { useState } from 'react'
import './lists.css'
import { useAuth0 } from '@auth0/auth0-react';



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
    const { user } = useAuth0()
    const [classSem, setClassSem] = useState()
    const [className, setClassName] = useState()
    const [classCode, setClassCode] = useState()
    const [loadedClasses, setLoadedClasses] = useState([])
    const [loadedOffers, setLoadedOffers] = useState([])
    const [loadedWants, setLoadedWants] = useState([])

    //console.log(loadedOffers)

    const fetchOWLists = async () => {
        const response = await fetch('https://class-swap.df.r.appspot.com/get_user_swaps/'+user.email)
        const data = await response.json()
        return data
    }

    async function updateUserLists() {
        
        console.log(user && user.email)
        const pulledLists = await fetchOWLists()
        if (pulledLists.length !== 0) {
            let newLoadedOffers = []
            let newLoadedWants = []
            pulledLists.forEach((pair) => {
                newLoadedOffers.push(pair.give[0])
                newLoadedWants.push(pair.get[0])
            })
            setLoadedOffers(newLoadedOffers)
            setLoadedWants(newLoadedWants)
        }
   
    }
    updateUserLists()
    
    function waitForUser(){
        if(typeof user !== "undefined"){
            updateUserLists() 
        } else setTimeout(waitForUser, 250);
        
    }

    waitForUser()
   

    /*
    useEffect(() => {
        console.log(user && user.email)
        const getOWLists = async () => {
            const pulledLists = await fetchOWLists()
            console.log(pulledLists)
            if (pulledLists == []) {
                setLoadedOffers([])
                setLoadedOffers([])
            } else {
                setLoadedOffers(pulledLists.Offers)
                setLoadedWants(pulledLists.Wants)
            }    
        }

        getOWLists()

    }, [user]) //update the users offers and wants lists in the database when the user updates them in the page
        
    */
        
 

    const searchClass = async () => {
        console.log("Class Sem:", classSem)
        console.log(className)
        console.log(classCode)
        //setLoadedClasses([])

        const response = await fetch(`https://class-swap.df.r.appspot.com/search/${className.toUpperCase().replace(/ /g, '')}%20${classCode.replace(/ /g, '')}`)//, {
        
        let json = await response.json() 
        console.log(json)

        setLoadedClasses([...json])

    }
    /*
    const addClass = (e) => {
        //grab index of btn id (OfferID): O0, O1, O2, etc
        let selected_class = loadedClasses[e.target.id[1]]
        let offer_or_want = e.target.id[0]
        
        
    }*/
    const addOffer = async (e) => {
        
        //grab index of btn id (OfferID): O0, O1, O2, etc
        let selected_class = loadedClasses[e.target.id[1]]
        console.log(selected_class)

        //make a submission with the added enrolled with every single want as a 1x1
        
        for (var want in loadedWants) {
            
            let offer_title = selected_class.Title
            let want_title = loadedWants[want].Title
            console.log(offer_title, want_title)
            const response = await fetch(`https://class-swap.df.r.appspot.com/add_swap_request/${user.email}/${offer_title}/${want_title}`)
            console.log(response)
        
        }
        setLoadedOffers([...loadedOffers, selected_class])

        
        
    }
    const addWant = async (e) => {
        //grab index of btn id (WantID): W0, W1, W2, etc
        let selected_class = loadedClasses[e.target.id[1]]
        console.log(selected_class)
        
        for (var offer in loadedOffers) {
            let enr_title = selected_class.Title
            let offer_title = loadedOffers[offer].Title
            console.log(enr_title, offer_title)
            const response = await fetch(`https://class-swap.df.r.appspot.com/add_swap_request/${user.email}/${offer_title}/${enr_title}`)
            console.log(response)
        
        }
        setLoadedWants([...loadedOffers, selected_class])
        
    }
    const delOffer = async (e) => {
        
        //grab index of btn id (LoadedOfferID): LO0, LO1, LO2, etc
        let selected_class = loadedOffers[e.target.id[2]]
        console.log(selected_class)

        //make a submission with the added enrolled with every single want as a 1x1
        /*
        loadedWants.forEach(want => {
            console.log('Waaaaa:', want)
        }) 
        */
        
        for (var want in loadedWants) {
            let offer_title = selected_class.Title
            let want_title = loadedWants[want].Title
            console.log(offer_title, want_title)
            const response = await fetch(`https://class-swap.df.r.appspot.com/delete_swap_request/${user.email}/${offer_title}/${want_title}`)
            console.log(response)
        
        }
        updateUserLists()

        
        
    }
    const delWant = async (e) => {
        //grab index of btn id (LoadedWantID): LW0, LW1, LW2, etc
        let selected_class = loadedWants[e.target.id[2]]
        console.log(selected_class)
        
        for (var offer in loadedOffers) {
            let want_title = selected_class.Title
            let offer_title = loadedOffers[offer].Title
            console.log(want_title, offer_title)
            const response = await fetch(`https://class-swap.df.r.appspot.com/delete_swap_request/${user.email}/${offer_title}/${want_title}`)
            console.log(response)
        
        }
        updateUserLists() 
    }


    /*
    const delListItem = async (e) => {
        console.log(e.target)

        let selected_class = loadedClasses[e.target.id[1]]
        let offer_or_want = e.target.id[0]

        const response = await fetch(`https://class-swap.df.r.appspot.com/delete_swap_request/<EMAIL>/<GIVE_TITLE>/<GET_TITLE>`)
        console.log(response)
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
        }
    } 
    */

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
                                    <button id={'O'+index} onClick={(e) => addOffer(e)}>Offer</button>
                                    <button id={'W'+index} onClick={(e) => addWant(e)} >Want</button>
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
                        {loadedOffers.map((_class, index) => (
                            <tr>
                                <td>{_class.Title.substring(0,3)}</td>
                                <td>{_class.Class+', '+_class.Title.split(' ')[1]}</td>
                                <td>{`${_class.Days} ${_class.Start} - ${_class.Finish}`}</td>
                                <td>{_class.Primary_Instructor}</td>
                                <td>
                                    <button id={"LO"+index} className='listDel' onClick={delOffer}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className='wntListDiv'>
                    <label className='listLabel'>Want List</label>
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
                        {loadedWants.map((_class, index) => (
                            <tr>
                                <td>{_class.Title.substring(0,3)}</td>
                                <td>{_class.Class+', '+_class.Title.split(' ')[1]}</td>
                                <td>{`${_class.Days} ${_class.Start} - ${_class.Finish}`}</td>
                                <td>{_class.Primary_Instructor}</td>
                                <td>
                                    <button id={"LW"+index} className='listDel' onClick={delWant}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Lists
