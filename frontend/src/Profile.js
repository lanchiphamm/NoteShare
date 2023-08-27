import Navbar from "./Navbar";
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
// import { get } from "mongoose";
const baseUrl = 'http://localhost:3001/users/'

const getUser = (username) => {
    const request = axios.get(baseUrl + username)
    return request.then(response => response.data)
}

function Profile (props) {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [year, setYear] = useState()

    let userName = props.username
    console.log(userName)

    let retrieved
    useEffect(() => {
        getUser('chi')
          .then(userInfo => {
            const data = JSON.stringify(userInfo[0])
            retrieved = JSON.parse(data)
            setUsername(retrieved.username)
            setName(retrieved.name)
            setSchool(retrieved.school)
            setMajor(retrieved.major)
            setYear(retrieved.year)
            setUser(data)
          })
      }, [])

    return (
        <>
            <Navbar />
            <h1>Profile Page</h1>
            <h2>Username: {username}</h2>
        </>
    );
}

export default Profile;