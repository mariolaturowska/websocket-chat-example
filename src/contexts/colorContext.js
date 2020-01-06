import React,{useState} from 'react';

export const ColorContext = React.createContext();

const ColorContextProvider = (props)=>{
        const colors =['#000000', '#00802b', '#ff0000', '#ffff00', '#1a75ff', '#ff3399', '#990099'];
        const [fontColor,setFontColor] = useState('black');
        const changeFontColor = (color) =>{
            setFontColor(color)
        };

        return (
            <ColorContext.Provider value={{fontColor,colors, changeFontColor: changeFontColor}}>
                {props.children}
            </ColorContext.Provider>
        );

};

export default ColorContextProvider;