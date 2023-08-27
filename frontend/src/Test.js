import Navbar from "./Navbar";
import documentService from "./services/documents";
import { useState, useEffect, useRef } from 'react'

function Test () {
    const [docs, setDocs] = useState([])
    const [testDoc, setTestDoc] = useState('')
    
    let retrieved
    useEffect(() => {
        console.log('executed')
        documentService
          .getAll()
          .then(initialDocs => {
            const data = JSON.stringify(initialDocs)
            retrieved = JSON.parse(data)
            console.log(retrieved.files[0])
            setDocs(initialDocs)
            setTestDoc(retrieved.files[0].filename)
          })
      }, [])

    return (
        <>
            <Navbar />
            <h1>Chi's Testing Page</h1>
            <h2>hihi</h2>
            <h2>{testDoc}</h2>
            <p>Open a PDF file <a href="http://localhost:3001/documents/document/96a53247e4fa4d817028c3bd4bc7ae8f.pdf">example</a>.</p>
        </>
    );
}

export default Test;