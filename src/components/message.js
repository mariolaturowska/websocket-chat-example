import React, {useState, useEffect} from 'react';
import {addMessage, broadcastMessage} from '../api';
import Color from "./color";
import {ColorContext} from '../contexts/colorContext';
import CanvasComponent from "./canvas";

let moment = require('moment');
const Message = () => {
    const [messages, setMessages] = useState([]);
    const [singleMes, setSingleMes] = useState('');

    useEffect(() => {
        addMessage((err, msg) => {
            setMessages([...messages, msg]);
        });
    }, [messages]);

    const clickHandler = (fontColor) => {
        broadcastMessage({
            text: singleMes,
            time: moment().calendar(),
            color: fontColor
        });
        setSingleMes('');
    };

    return (
        <div className='phone-area'>
            <ColorContext.Consumer>{(colorContext) => {
                const {fontColor, colors} = colorContext;
                return (
                    <div>
                        <div className ='messages-area'>
                            {!!messages && messages.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <p>{e.time}</p>
                                        <p style={{color: e.color}}>{e.text}</p>
                                    </div>)
                            })}
                        </div>
                        <div>
                            {colors.map((color, i) => {
                                return (
                                    <Color key={i} color={color}/>
                                )
                            })
                            }
                        </div>
                        <input value={singleMes}
                               placeholder="Type your message here..."
                               style={{color: fontColor}}
                               onChange={event => setSingleMes(event.target.value)}/>
                        <CanvasComponent/>
                        <button onClick={() => clickHandler(fontColor)}>Submit</button>
                    </div>)
            }}
            </ColorContext.Consumer>
        </div>
    );
};

export default Message;