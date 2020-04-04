import React,{useState} from 'react';

export const LoginContext = React.createContext();

const LoginContextProvider = (props)=>{
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const changeName = (event) =>setName(event.target.value);

    const changeSurname = (event) => setSurname(event.target.value);

    return (
        <LoginContext.Provider value={{name, surname,changeName,changeSurname}}>
            {props.children}
        </LoginContext.Provider>
    );

};

export default LoginContextProvider;