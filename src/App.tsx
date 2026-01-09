import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/accounts';

function App() {
    const [accounts, setAccounts] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('GET failed');
                }
                return response.json();
            })
            .then(data => setAccounts(data))
            .catch(err => console.error(err));
    }, []);

    const createAccount = () => {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email })
        })
            .then(res => {
                if (!res.ok) throw new Error('POST failed');
                return res.json();
            })
            .then(() => window.location.reload());
    };


    const updateAccount = () => {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email })
        })
            .then(res => {
                if (!res.ok) throw new Error('PUT failed');
                return res.json();
            })
            .then(() => window.location.reload());
    };

    const deleteAccount = () => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) throw new Error('DELETE failed');
                return res.json();
            })
            .then(() => window.location.reload());
    };

    return (
        <div>
            <h1>Accounts</h1>

            <ul>
                {accounts.map(account => (
                    <li key={account.id}>
                        ID {account.id}: {account.username} ({account.email})
                    </li>
                ))}
            </ul>

            <input
                placeholder="Account ID (PUT / DELETE)"
                value={id}
                onChange={e => setId(e.target.value)}
            />

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <button onClick={createAccount}>POST</button>
            <button onClick={updateAccount}>PUT</button>
            <button onClick={deleteAccount}>DELETE</button>
        </div>
    );
}

export default App;