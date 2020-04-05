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
                    <div className='header-messages-area'>Chat message area</div>
                    <CustomScroll keepAtBottom={true} heightRelativeToParent="100%">
                        {!!messages && messages.map((e, i) => {
                            const name = `${e.authorName.charAt(0)}${e.authorSurname.charAt(0)}`;
                            return (
                                <div className='messages-area-body'>
                                    <div className='name-area'>
                                        {name.toUpperCase()}
                                    </div>
                                    <div key={i} className='messages-area-one'>
                                        <p className='message-one-time'>{e.time}</p>
                                        <div
                                            className={!!e.canvasImage
                                                ? 'message-one-text-with-canvas'
                                                : 'message-one-text'}>
                                            <p style={{color: e.OneButtonColorArea}}>{e.text}</p>
                                            {!!e.canvasImage &&
                                            <img src={e.canvasImage} className='canvas-image-style'/>}
                                        </div>
                                        {!!e.canvasImage
                                        && <p className='message-delivered'>Delivered</p>}
                                        <div className='typing-message'>{typingMessage}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </CustomScroll>
                </div>
            )
        }}
        </MessagesContext.Consumer>
    )
};

export default Messages;
