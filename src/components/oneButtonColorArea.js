import React from 'react';
import {ColorContext} from '../contexts/colorContext';

const OneButtonColorArea = ({color}) =>{
    return (
        <ColorContext.Consumer>{(colorContext) => {
            const {changeFontColor} = colorContext;
            return(<button
                className='circle'
                onClick={() => changeFontColor(color)}
                style={{backgroundColor:color,display:'inline-block'}}/>)
        }}
        </ColorContext.Consumer>

    )
};

export default OneButtonColorArea;