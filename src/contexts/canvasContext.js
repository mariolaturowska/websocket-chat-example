import React, {useEffect, useRef, useState} from "react";
import {broadcastMessage} from "../api";
let moment = require('moment');

export const CanvasContext = React.createContext();

const CanvasContextProvider = (props) => {

    const [lastMousePosition, setLastMousePosition] = useState({offsetX: 0, offsetY: 0});
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState([]);
    const [canvasImage, setCanvasImage] = useState('');
    const [canvasDisplaying, setCanvasDisplaying] = useState(false);
    const [singleMes, setSingleMes] = useState('');
    const canvasRef = useRef(null);

    useEffect(() => {
        if(canvasRef) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, window.innerHeight / 10, window.innerWidth / 10);
        mousePosition.forEach(location => draw(ctx, location.start, location.stop, location.color));
    }, [mousePosition]);

    const clickHandler = (fontColor, canvasImage, canvasRef, clearCanvasImage) => {
        (singleMes || canvasImage) !== "" && broadcastMessage({
            author: 'mariola',
            text: singleMes,
            canvasImage: canvasImage,
            time: moment().calendar(),
            color: fontColor
        });
        setSingleMes('');
        setCanvasDisplaying(false);
        let canvas;
        let ctx;
        if (canvasRef.current !== null) {
            canvas = canvasRef.current;
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 150, 50);
            clearCanvasImage();
        }

    };

    const handleCanvasMouseDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setIsPainting(true);
        setLastMousePosition({offsetX, offsetY});
    };

    const handleCanvasMouseMove = ({nativeEvent}, fontColor) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (isPainting) {
            const {offsetX, offsetY} = nativeEvent;
            const offSetData = {offsetX, offsetY};
            setMousePosition([...mousePosition, {
                start: {...lastMousePosition},
                stop: {...offSetData},
                color: fontColor
            }]);
            draw(ctx, canvas,lastMousePosition, offSetData, fontColor);
        }
    };

    const handleCanvasMouseUp = () => {
        if (isPainting) {
            setIsPainting(false);
        }
    };

    const draw = (ctx, canvas,originalMousePosition, newMousePosition, fontColor) => {
        const {offsetX, offsetY} = newMousePosition;
        const {offsetX: x, offsetY: y} = originalMousePosition;
        ctx.strokeStyle = fontColor;
        ctx.lineJoin = 'round';
        ctx.lineWidth = '2';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setLastMousePosition({offsetX, offsetY});
        setCanvasImage(canvas.toDataURL());
    };

    const clearCanvasImage = () => setCanvasImage('');
    const handleCanvasDisplaying = (arg) => setCanvasDisplaying(arg);
    const handleSingleMes = (mes) => setSingleMes(mes);

    return (
        <CanvasContext.Provider value={{
            canvasRef,
            lastMousePosition,
            isPainting,
            canvasImage,
            canvasDisplaying,
            singleMes,
            handleCanvasMouseDown,
            handleCanvasMouseMove,
            handleCanvasMouseUp,
            clearCanvasImage,
            clickHandler,
            handleCanvasDisplaying,
            handleSingleMes
        }}>
            {props.children}
        </CanvasContext.Provider>
    );

};

export default CanvasContextProvider;