import React from 'react';
import './arrangements.css';
import { Wall } from './socket';

export function Community() {
    const username = 'username';
    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        Wall.addHandler(handleEvent);
        return () => {
            Wall.removeHandler(handleEvent);
        };
    });

    function handleEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
        //let message = event.value.msg;

    messageArray.push(
        <tr key={i}>
        <td>{event.dt}</td>
        <td>{event.nm}</td>
        <td><img src={event.img}/></td>
        </tr>
    );
}
    return messageArray;
}


    return(
        <div>
        <h2>Community Arrangements</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Arrangement</th>
                </tr>
            </thead>
            <tbody id = "sharables">{createMessageArray()}</tbody>
        </table>
        </div>
    );
}