import React, {useState, useRef, useEffect} from 'react';

const CanvasComponent = () => {
    const [mousePosition, setMousePosition] = useState([]);
    const [lastMousePosition, setLastMousePosition] = useState({offsetX: 0, offsetY: 0});
    const [isPainting, setIsPainting] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
        mousePosition.forEach(location => draw(ctx, location.start, location.stop))
    }, [mousePosition]);

    const handleCanvasMouseDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setIsPainting(true);
        setLastMousePosition({offsetX, offsetY});
    };

    const handleCanvasMouseMove = ({nativeEvent}) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (isPainting) {
            const {offsetX, offsetY} = nativeEvent;
            const offSetData = {offsetX, offsetY};
            setMousePosition([...mousePosition, {
                start: {...lastMousePosition},
                stop: {...offSetData}
            }]);
            draw(ctx, lastMousePosition, offSetData);
        }
    };

    const handleCanvasMouseUp = () => {
        if (isPainting) {
            setIsPainting(false);
        }
    };

    const draw = (ctx, originalMousePosition, newMousePosition) => {
        const {offsetX, offsetY} = newMousePosition;
        const {offsetX: x, offsetY: y} = originalMousePosition;
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = '2';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        setLastMousePosition({offsetX, offsetY});
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseUp={e => handleCanvasMouseUp(e)}
                onMouseLeave={e => handleCanvasMouseUp(e)}
                onMouseMove={e => handleCanvasMouseMove(e)}
                onMouseDown={e => handleCanvasMouseDown(e)}
            />
        </>
    )
};

export default CanvasComponent;