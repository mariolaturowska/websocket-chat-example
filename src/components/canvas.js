import React from 'react';
import {ColorContext} from '../contexts/colorContext';
import {CanvasContext} from '../contexts/canvasContext';

const CanvasComponent = () => (
    <CanvasContext.Consumer>{(canvasContext) => (
        <ColorContext.Consumer>{(colorContext) => {
            const {fontColor} = colorContext;
            const {canvasRef, handleCanvasMouseUp, handleCanvasMouseMove, handleCanvasMouseDown} = canvasContext;
            return (
                <canvas
                    ref={canvasRef}
                    width={window.innerWidth / 8}
                    height={window.innerHeight / 8}
                    onMouseUp={e => handleCanvasMouseUp(e)}
                    onMouseLeave={e => handleCanvasMouseUp(e)}
                    onMouseMove={e => handleCanvasMouseMove(e, fontColor)}
                    onMouseDown={e => handleCanvasMouseDown(e)}
                />)
        }}
        </ColorContext.Consumer>)}
    </CanvasContext.Consumer>
);


export default CanvasComponent;