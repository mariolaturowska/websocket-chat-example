import React from 'react';
import Messages from "./messages";
import ScreenArea from "./screenArea";

const Message = () => {
    return (
        <div className='phone-area'>
            <div>
                <Messages/>
                <ScreenArea/>
            </div>
        </div>

    );
};

export default Message;