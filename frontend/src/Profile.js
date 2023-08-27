import Navbar from "./Navbar";
import { useState, useEffect } from 'react';

function Profile () {

    const [username, setUsername] = useState("");

    useEffect(() => {
        const data = window.localStorage.getItem('USERNAME');
        if ( data !== null ) setUsername(data)
    }, [])

    return (
        <>
            <Navbar />
            <h1>Profile Page</h1>
            <h2>{username}</h2>
        </>
    );
}

export default Profile;