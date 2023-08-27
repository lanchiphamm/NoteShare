import Navbar from "./Navbar";
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import "./Profile.css";
// import { get } from "mongoose";
const baseUrl = 'http://localhost:3001/users/'

const getUser = (username) => {
    const request = axios.get(baseUrl + username)
    return request.then(response => response.data)
}

function Profile () {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [year, setYear] = useState(1)

    let retrieved
    useEffect(() => {
        const data = window.localStorage.getItem('USERNAME');
        if ( data !== null ) setUsername(data)

        console.log(data)
        getUser(username)
          .then(userInfo => {
            const dataFrombase = JSON.stringify(userInfo[0])
            console.log(dataFrombase )
            retrieved = JSON.parse(dataFrombase )
            setName(retrieved.name)
            setSchool(retrieved.school)
            setMajor(retrieved.major)
            setYear(retrieved.yearlevel)
            setUser(data)
          })
      })

    return (
        <>
            <Navbar />
            <h1 id="greet">Hello {username}!</h1>
            <div id="pfp">
                    <br/>
            </div>    
            <br/>
            <br/>
            <div id = "user-info">
                <h2>School: {school}</h2>
                <h2>Year: {year}</h2>
                <h2>Major: {major}</h2>
            </div>
            
        </>
    );
}

export default Profile;