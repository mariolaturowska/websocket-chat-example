import React from 'react';
import Color from "./color";
import {IoIosBrush} from "react-icons/io";
import {ColorContext} from "../contexts/colorContext";
import {MessagesContext} from "../contexts/messagesContext";

const ButtonsArea = () => (
    <MessagesContext.Consumer>{(messagesContext) => (
        <ColorContext.Consumer>{(colorContext) => {
            const {colors} = colorContext;
            const {handleCanvasDisplaying, canvasDisplaying} = messagesContext;
            return (
                <div className='buttons-color-area'>
                    {colors.map((color, i) => {
                        return (
                            <Color key={i} color={color}/>
                        )
                    })
                    }
                    <IoIosBrush color='grey' style={{cursor: 'pointer'}}
                                onClick={() => canvasDisplaying ? handleCanvasDisplaying(false) : handleCanvasDisplaying(true)}/>
                </div>
            )
        }}
        </ColorContext.Consumer>)}
    </MessagesContext.Consumer>
);


export default ButtonsArea;