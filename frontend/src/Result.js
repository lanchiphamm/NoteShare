import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import axios from "axios";
import './Result.css';

const baseUrl = 'http://localhost:3001/documents/files'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// const allUrl = 'http://localhost:3001/documents/'
// const getFile = (filename) => {
//     const request = axios.get(baseUrl + username)
//     return request.then(response => response.data)
// }

function Result () {

    const [courseCode, setCourseCode] = useState("");
    const [username, setUsername] = useState("");
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const data = window.localStorage.getItem('COURSE-CODE');
        if ( data !== null ) setCourseCode(data)
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem('USERNAME');
        if ( data !== null ) setUsername(data)
    }, [])

    useEffect(() => {
        getAll()
          .then(initialDocs => {
            console.log(JSON.parse(JSON.stringify(initialDocs)).files)
            setDocs(JSON.parse(JSON.stringify(initialDocs)).files)
          })
      }, [])
    
      console.log(docs.type)

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

    const url = "http://localhost:3001/documents/document/"
    return (
        <div>
            <Navbar />
            <h1 id='result-page'>Result Page</h1>
            <h2 id='showing-result'>Showing notes for {courseCode}</h2>
            <div id='upload'>
                <text id='upload-text'>Would you like to contribute your notes for this course?</text>
                <br ></br>
                <input onChange={ (e) => { setFile(e.target.files[0]) } } type="file"/>
                <button onClick={ handleUpload }>Upload</button>
                { progress.started && <progress max="100" value={progress.pc}></progress> }
                <br />
                { msg && <span>{msg}</span> }
            </div>
            <div id='document'>
                <ol>
                    {docs.map(doc =>
                        {const name = doc.filename;
                            console.log(name)
                        return (
                        <li id='resultList'>
                        <img src={require('./document.png')} />
                        <text id='info'>
                            Course: {courseCode} || 
                            File: &nbsp;
                            <a href="http://localhost:3001/documents/document/96a53247e4fa4d817028c3bd4bc7ae8f.pdf" target="_blank">{doc.filename}</a>
                            <br />
                        </text>
                        </li>)}
                    )}
                </ol>
            </div>
        </div>

    );
}

export default Result;