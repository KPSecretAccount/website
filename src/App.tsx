import { useState } from 'react';
import { useGet, usePost, usePut, useDelete } from './hooks';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [userId] = useState(0);
    const [postToggle, setPostToggle] = useState(false);
    const [putToggle, setPutToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [deleteId, setDeleteId] = useState<number>(-1);

    usePost(email, pass, postToggle, () => setPostToggle(false));
    usePut(newEmail, newPass, userId, putToggle, () => setPutToggle(false));
    useDelete(deleteId, deleteToggle, () => setDeleteToggle(false));

    const tempID = useGet(0);

    return (
        <>
            <h1>Test GET</h1>
            <p>{tempID?.email}</p>

            <div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />
                <button onClick={() => setPostToggle(true)}>Create Account</button>
            </div>

            <div>
                <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="New Email" />
                <input value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="New Password" />
                <button onClick={() => setPutToggle(true)}>Update Account</button>
            </div>

            <div>
                <button onClick={() => { setDeleteId(0); setDeleteToggle(true); }}>Delete Account</button>
            </div>
        </>
    );
}

export default App;
