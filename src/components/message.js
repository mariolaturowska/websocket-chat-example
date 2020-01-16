import React, {useState, useEffect} from 'react';
import {addMessage, broadcastMessage} from '../api';
import Color from "./color";
import {ColorContext} from '../contexts/colorContext';
import CanvasComponent from "./canvas";
import {IoMdBrush,IoIosSend} from "react-icons/io";

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
                                    <div key={i} className='messages-area-one'>
                                        <p className ='message-one-time'>{e.time}</p>
                                        <p style={{color: e.color}} className='message-one-text'>{e.text}</p>
                                    </div>)
                            })}
                        </div>
                        <div className='screen-area'>
                        <div className='buttons-color-area'>
                            {colors.map((color, i) => {
                                return (
                                    <Color key={i} color={color}/>
                                )
                            })
                            }
                            <IoMdBrush size='1.5em' color='grey'/>
                        </div>
                        <input value={singleMes}
                               placeholder="Type your message here..."
                               style={{color: fontColor}}
                               className='input-styling'
                               onChange={event => setSingleMes(event.target.value)}>

                        </input>
                            <IoIosSend onClick={() => clickHandler(fontColor)} color='grey' size='1.5em'/>
                        <CanvasComponent/>
                        </div>
                    </div>)
            }}
            </ColorContext.Consumer>
        </div>
    );
};

export default Message;