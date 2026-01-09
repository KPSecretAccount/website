import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/data';

function App() {
    const [data, setData] = useState([]);
    const [item, setItem] = useState('');
    const [index, setIndex] = useState('');


    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok)
                    throw new Error('HTTP erroe! status: ' + response.status);
                return response.json();
            })
            .then(data => {
                setData(data)
            })
            .catch(err => console.error(err));
    }, []);

    const createItem = () => {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item })
        })
            .then(res => res.json())
            .then(() => window.location.reload());
    };


    const updateItem = () => {
        fetch(`${API_URL}/${index}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item })
        })
            .then(res => res.json())
            .then(() => window.location.reload());
    };


    const deleteItem = () => {
        fetch(`${API_URL}/${index}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => window.location.reload());
    };

    return (
        <div>
            <ul>{data.map((value, i) => (<li key={i}>{i}: {value}</li>))}</ul>
            <input placeholder="Item text" value={item} onChange={e => setItem(e.target.value)}/>

            <input placeholder="Index" value={index} onChange={e => setIndex(e.target.value)}/>

            <button onClick={createItem}>post</button>
            <button onClick={updateItem}>put</button>
            <button onClick={deleteItem}>delete</button>
        </div>
    );
}

export default App;



