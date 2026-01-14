import { useEffect, useState } from 'react';

export function useGet(id: number) {
    const [data, setData] = useState<{ id: number; email: string; pass: string } | null>(null);
    useEffect(() => {
        fetch(`https://serverexploration.onrender.com/users/${id}`)
            .then(r => r.json())
            .then(setData);
    }, [id]);
    return data;
}

export function usePost(email: string, pass: string, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger)
            return;
        fetch('https://serverexploration.onrender.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, pass}),
        }).finally(reset);
    }, [email, pass, trigger]);
}

export function usePut(newEmail: string, newPass: string, id: number, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger)
            return;
        fetch(`https://serverexploration.onrender.com/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({newEmail, newPass}),
        }).finally(reset);
    }, [newEmail, newPass, id, trigger]);
}

export function useDelete(id: number, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger)
            return;
        fetch(`https://serverexploration.onrender.com/users/${id}`, {
            method: 'DELETE',
        }).finally(reset);
    }, [id, trigger]);
}

