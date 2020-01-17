import React,{useState} from 'react';

export const ColorContext = React.createContext();

const ColorContextProvider = (props)=>{
        const colors =['#001f3f', '#2ECC40', '#FF4136', '#FF851B', '#0074D9', '#F012BE', '#B10DC9'];
        const [fontColor,setFontColor] = useState('#001f3f');
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