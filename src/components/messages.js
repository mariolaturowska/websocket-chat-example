import React from 'react';
import {MessagesContext} from "../contexts/messagesContext";
import 'react-custom-scroll/dist/customScroll.css';
import CustomScroll from 'react-custom-scroll';

const Messages = () => {
    return (
        <MessagesContext.Consumer>{(messagesContext) => {
            const {messages, typingMessage} = messagesContext;
            return (

                <div className='messages-area'>
                    <CustomScroll keepAtBottom={true} heightRelativeToParent="100%">
                        {!!messages && messages.map((e, i) => {
                            return (
                                <div key={i} className='messages-area-one'>
                                    <p className='message-one-time'>{e.time}</p>
                                    <div className='name-area'>{e.author}</div>
                                    <div
                                        className={!!e.canvasImage ? 'message-one-text-with-canvas' : 'message-one-text'}>
                                        <p style={{color: e.color}}>{e.text}</p>
                                        {!!e.canvasImage && <img src={e.canvasImage} className='canvas-image-style'/>}
                                    </div>
                                    {!!e.canvasImage && <p className='message-delivered'>Delivered</p>}
                                    <div className='typing-message'>{typingMessage}</div>
                                </div>)
                        })}
                    </CustomScroll>
                </div>
            )
        }}
        </MessagesContext.Consumer>
    )
};

export default Messages;
