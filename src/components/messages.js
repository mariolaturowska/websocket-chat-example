import React, {useEffect, useState} from 'react';
import {addMessage} from "../api";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const messagesArea = React.createRef();

    useEffect(() => {
        addMessage((err, msg) => {
            setMessages([...messages, msg]);
        });
        messagesArea.current.scrollTo(0, 1000);
    });
    return (<div className='messages-area' ref={messagesArea}>
            {!!messages && messages.map((e, i) => {
                return (
                    <div key={i} className='messages-area-one'>
                        <p className='message-one-time'>{e.time}</p>
                        <div className={!!e.canvasImage ? 'message-one-text-with-canvas' : 'message-one-text'}>
                            <p style={{color: e.color}}>{e.text}</p>
                            {!!e.canvasImage && <img src={e.canvasImage} className='canvas-image-style'/>}
                        </div>
                        {!!e.canvasImage && <p className='message-delivered'>Delivered</p>}
                    </div>)
            })}
        </div>
    )
};

export default Messages;