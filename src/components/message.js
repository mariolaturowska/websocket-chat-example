import React from 'react';
import Messages from "./messages";
import ScreenArea from "./screen_area";

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