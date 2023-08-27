import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import axios from "axios";


function Result () {

    const [courseCode, setCourseCode] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const data = window.localStorage.getItem('COURSE-CODE');
        if ( data !== null ) setCourseCode(data)
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem('USERNAME');
        if ( data !== null ) setUsername(data)
    }, [])


    const [ file, setFile ] = useState(null);
    const [ progress, setProgress] = useState({ started: false, pc: 0 });
    const [ msg, setMsg ] = useState(null);

    function handleUpload() {
        if (!file) {
            setMsg("No file selected");
            return;
        }

        const fd = new FormData();
        fd.append('file', file);

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true}
        })

        axios.post('http://httpbin.org/post', fd, {
            onUploadProgress: (progressEvent) => { setProgress(prevState => {
                return { ...prevState, pc: progressEvent.progress*100 }
            })}, 
            headers: {
                "Custom-Header": "value",
            }
        })

        .then(res => {
            setMsg("Upload successful");
            console.log(res.data);
        })
        .catch(err => {
            setMsg("Upload failed");
            console.error(err);
        });
    }

    return (
        <div>
            <Navbar />
            <h1>Result Page</h1>
            <h2>Showing notes for {courseCode}</h2>

            <input onChange={ (e) => { setFile(e.target.files[0]) } } type="file"/>
            
            <button onClick={ handleUpload }>Upload</button>

            { progress.started && <progress max="100" value={progress.pc}></progress> }
            { msg && <span>{msg}</span> }
        </div>

    );
}

export default Result;