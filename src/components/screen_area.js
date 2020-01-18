import React from 'react';
import Color from "./color";
import CanvasComponent from "./canvas";
import {IoIosSend, IoIosBrush} from "react-icons/io";
import {ColorContext} from "../contexts/colorContext";
import {CanvasContext} from "../contexts/canvasContext";

const ScreenArea = () => (
        <CanvasContext.Consumer>{(canvasContext) => (
            <ColorContext.Consumer>{(colorContext) => {
                const {canvasImage, canvasRef, clearCanvasImage,canvasDisplaying,clickHandler,handleCanvasDisplaying,singleMes,handleSingleMes} = canvasContext;
                const {fontColor, colors} = colorContext;
                return (<div className={!canvasDisplaying ? 'screen-area' : 'screen-area-with-canvas'}>
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
                    <div className='input-write-and-canvas-area' style={{color: fontColor}}>
                        <input className='content-editable-input' value={singleMes}
                               style={{color: fontColor}}
                               onChange={(e) => handleSingleMes(e.currentTarget.value)}/>
                        {!!canvasDisplaying &&
                        <CanvasComponent/>}
                        <IoIosSend onClick={() => clickHandler(fontColor, canvasImage, canvasRef, clearCanvasImage)}
                                   color='grey' size='1.5em' className='submit-button'/>
                    </div>
                </div>)
            }}
            </ColorContext.Consumer>)}
        </CanvasContext.Consumer>
    );

export default ScreenArea;