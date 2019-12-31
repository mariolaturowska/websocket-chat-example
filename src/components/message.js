import React, {useState} from 'react';
import {addMessage} from '../api';

let moment = require('moment');

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [singleMes, setSingleMes] = useState('');

    const clickHandler = () => {
        setMessages([...messages, singleMes]);
        addMessage(singleMes);
        setSingleMes('');
    };

    return (
        <div>
            <div>
                {messages.map((e, i) => {
                    return (
                        <div key={i}>
                            <p>{moment().calendar()}</p>
                            {e}
                        </div>)
                })}
            </div>
            <input value={singleMes} placeholder="Type your message here..."
                   onChange={event => setSingleMes(event.target.value)}/>
            <button type='submit' onClick={clickHandler}>Submit</button>
        </div>
    );
};

export default Message;