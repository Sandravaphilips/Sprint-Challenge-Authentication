import React, {useState, useEffect} from 'react';
import withAuth from '../axios';

export default function Jokes(props) {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        withAuth().get('http://localhost:3300/api/jokes')
        .then(res => setJokes(res.data))
        .catch(err => alert(err.message))
    })

    // debugger

    return (
        
            
        <div>
            {jokes.map(joke => 
                <p key={joke.id} >{joke.joke}</p>
            )}
        </div>
       
    )
}