import React, {useState, useEffect, useRef} from 'react';
import {addMessage, broadcastMessage} from '../api';
import Color from "./color";
import {ColorContext} from '../contexts/colorContext';
import CanvasComponent from "./canvas";
import {IoIosSend, IoIosBrush} from "react-icons/io";
import {CanvasContext} from "../contexts/canvasContext";

let moment = require('moment');
const Message = () => {
    const [messages, setMessages] = useState([]);
    const [singleMes, setSingleMes] = useState('');
    const [canvasDisplaying, setCanvasDisplaying] = useState(false);
    const prevCanvasImageRef = useRef();

    useEffect(() => {
        addMessage((err, msg) => {
            setMessages([...messages, msg]);
        });
    }, [messages, singleMes]);

    const clickHandler = (fontColor, canvasImage, canvasRef,clearCanvasImage) => {
        (singleMes || canvasImage) !== "" && broadcastMessage({
            text: singleMes,
            canvasImage:canvasImage,
            time: moment().calendar(),
            color: fontColor
        });
        setSingleMes('');
        setCanvasDisplaying(false);
        prevCanvasImageRef.current = canvasImage;
        let canvas;
        let ctx;
        if (canvasRef.current !== null) {
            canvas = canvasRef.current;
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 150, 50);
            clearCanvasImage();
        }

    };

    return (
        <div className='phone-area'>
            <CanvasContext.Consumer>{(canvasContext) => (
                <ColorContext.Consumer>{(colorContext) => {
                    const {fontColor, colors} = colorContext;
                    console.log('fontColot', fontColor);
                    const {canvasImage, canvasRef, clearCanvasImage} = canvasContext;
                    return (
                        <div>
                            <div className='messages-area'>
                                {!!messages && messages.map((e, i) => {
                                    return (
                                        <div key={i} className='messages-area-one'>
                                            <p className='message-one-time'>{e.time}</p>
                                            <div className='message-one-text'>
                                                <p style={{color: e.color}}>{e.text}</p>
                                                {!!e.canvasImage && <img src={e.canvasImage}/>}
                                            </div>
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
                                    <IoIosBrush color='grey'
                                                onClick={() => canvasDisplaying ? setCanvasDisplaying(false) : setCanvasDisplaying(true)}/>
                                </div>
                                <div className='input-write-and-canvas-area' style={{color: fontColor}}>
                                    <input className='content-editable-input' value={singleMes}
                                           onChange={(e) => setSingleMes(e.currentTarget.value)}/>
                                    {!!canvasDisplaying &&
                                    <CanvasComponent/>}
                                    <IoIosSend onClick={() => clickHandler(fontColor, canvasImage, canvasRef, clearCanvasImage)}
                                               color='grey' size='1.5em' className='submit-button'/>
                                </div>
                            </div>
                        </div>)
                }}
                </ColorContext.Consumer>)}
            </CanvasContext.Consumer>
        </div>
    );
};

export default Message;