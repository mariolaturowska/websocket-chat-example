import React, {useEffect, useRef, useState} from "react";

export const CanvasContext = React.createContext();

const CanvasContextProvider = (props) => {

    const [lastMousePosition, setLastMousePosition] = useState({offsetX: 0, offsetY: 0});
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState([]);
    const [canvasImage, setCanvasImage] = useState('');
    const canvasRef = useRef(null);

    useEffect(() => {
        if(canvasRef) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, window.innerHeight / 10, window.innerWidth / 10);
        mousePosition.forEach(location => draw(ctx, location.start, location.stop, location.color));
    }, [mousePosition]);


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

    return (
        <CanvasContext.Provider value={{
            canvasRef,
            lastMousePosition,
            isPainting,
            canvasImage,
            handleCanvasMouseDown,
            handleCanvasMouseMove,
            handleCanvasMouseUp,
            clearCanvasImage,
        }}>
            {props.children}
        </CanvasContext.Provider>
    );

};

export default CanvasContextProvider;