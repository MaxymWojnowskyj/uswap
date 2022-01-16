import React, { useState } from 'react'
import './lists.css'




// request current and future semesters here
const options = [
    { value: 'Winter 2022', label: 'Winter 2022'}
    //{ value: 'Fall 2022', label: 'Fall 2022'}
]

//let loadedClasses = []

const Lists = () => {
    const [classSem, setClassSem] = useState()
    const [className, setClassName] = useState()
    const [classCode, setClassCode] = useState()
    const [loadedClasses, setLoadedClasses] = useState([])

    const searchClass = async () => {
        console.log("Class Sem:", classSem)
        console.log(className)
        console.log(classCode)
        setLoadedClasses([])

        const response = await fetch(`https://class-swap.df.r.appspot.com/search/${className.toUpperCase().replace(/ /g, '')}%20${classCode.replace(/ /g, '')}`)//, {
        
        let json = await response.json() 
        console.log(json)

        //setLoadedClasses()
        setLoadedClasses([...loadedClasses, ...json])
        
        /*for (var key in json) {
            console.log(key)
            console.log(json[key])
            setLoadedClasses([...loadedClasses, json[key]])
            console.log(loadedClasses)
        }*/



    }

    const offerAdd = (e) => {
        console.log(e.target.id)
    }

    const wantAdd = (e) => {
        console.log(e.target.id)
    }

    const delListItem = (e) => {
        console.log(e.target)
    }

    return (
        <div>
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
                                    <button id={'O'+index} onClick={offerAdd}>Offer</button>
                                    <button id={'W'+index} onClick={wantAdd} >Want</button>
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
