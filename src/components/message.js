import React, {useState, useEffect, useRef} from 'react';
import Messages from "./messages";
import ScreenArea from "./screen_area";

const url = 'http://localhost:8080/messages';

const Message = () => {

    const useFetch = (url) => {
        let data;
        useEffect(() => {
            (async () => {
                const res = await fetch(url);
                data = await res.json();
            })();
        }, [url]);
        return data;
    };
    // setMessages(data);


    return (
        <div className='phone-area'>
            {useFetch(url)}
            <div>
                <Messages/>
                <ScreenArea/>
            </div>
        </div>

    );
};

export default Message;