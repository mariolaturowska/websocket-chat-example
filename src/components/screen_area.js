import React from 'react';
import CanvasComponent from "./canvas";
import {ColorContext} from "../contexts/colorContext";
import {MessagesContext} from '../contexts/messagesContext';
import ButtonsArea from "./buttons-color-area";
import ButtonSubmit from "./button";

const ScreenArea = () => (
        <MessagesContext.Consumer>{(messagesContext) => (
            <ColorContext.Consumer>{(colorContext) => {
                const {fontColor} = colorContext;
                const {singleMes, handleSingleMes, clickHandler,canvasDisplaying, handleInfoToUser} = messagesContext;
                return (
                    <div className={!canvasDisplaying ? 'screen-area' : 'screen-area-with-canvas'}>
                    <ButtonsArea/>
                    <div className='input-write-and-canvas-area' style={{color: fontColor}}>
                        <input
                            className='content-editable-input'
                            value={singleMes} style={{color: fontColor}}
                            placeholder = 'write message'
                            onChange={(e) => handleSingleMes(e.currentTarget.value)}
                                onKeyPress={() => handleInfoToUser()}/>
                        {!!canvasDisplaying && <CanvasComponent/>}
                    <ButtonSubmit fontColor={fontColor} clickHandler={clickHandler}/>
                    </div>
                </div>
                )
            }}
            </ColorContext.Consumer>)}
        </MessagesContext.Consumer>
);

export default ScreenArea;