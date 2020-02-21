import React, {useEffect, useState} from 'react';
import {addMessage, broadcastMessage, informUser, addInfoToUser} from "../api";
const url = 'http://localhost:8080/messages';
let moment = require('moment');

export const MessagesContext = React.createContext();

const MessagesContextProvider = (props)=>{
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [singleMes, setSingleMes] = useState('');
    const [canvasDisplaying, setCanvasDisplaying] = useState(false);
    const [typingMessage, setTypingMessage] = useState('');

    useEffect(() => {
        let data;
        if(!loaded){
            (async () => {
                const res = await fetch(url);
                data = await res.json();
                setMessages(data);

            })();
            setLoaded(true);
        }
        addMessage((err, msg) => {
            setMessages([...messages, msg]);
        });

        informUser((err, msg)=>{
            setTypingMessage(msg);
            setTimeout(() => {
                setTypingMessage('');
            },1000)

        });
    });

    const clickHandler = (fontColor, canvasImage, canvasRef, clearCanvasImage) => {
        (singleMes || canvasImage) !== "" && broadcastMessage({
            author: 'mariola',
            text: singleMes,
            canvasImage: canvasImage,
            time: moment().calendar(),
            color: fontColor
        });
        setSingleMes('');
        setCanvasDisplaying(false);
        let canvas;
        let ctx;
        if (canvasRef.current !== null) {
            canvas = canvasRef.current;
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 150, 50);
            clearCanvasImage();
        }

    };

    const handleSingleMes = (mes) => setSingleMes(mes);

    const handleCanvasDisplaying = (arg) => setCanvasDisplaying(arg);

    const handleInfoToUser = () => addInfoToUser('is typing');

    return (
        <MessagesContext.Provider value={{
            messages,
            singleMes,
            typingMessage,
            canvasDisplaying,
            handleSingleMes,
            clickHandler,
            handleCanvasDisplaying,
            handleInfoToUser
        }}>
            {props.children}
        </MessagesContext.Provider>
    );

};

export default MessagesContextProvider;