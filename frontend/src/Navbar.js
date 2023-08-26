import './Navbar.css';

export default function Navbar() {
    return <nav className="nav">
        <h1>NoteShare</h1>
        <ul>
            <li>
               <a href ="/main">Home</a>
            </li>
            <li>
                <a href ="/profile">Profile</a>
            </li>
            <li>
                <a href ="/">Log out</a>
            </li>
        </ul>
    </nav>
}