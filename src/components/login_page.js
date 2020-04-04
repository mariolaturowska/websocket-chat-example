import React from 'react';
import {useHistory} from 'react-router-dom';
import {LoginContext} from "../contexts/loginContext";

const LoginPage = () => {
    const history = useHistory();
    return (
        <LoginContext.Consumer>{(loginContext)=>{
            const {name, surname, changeName, changeSurname} = loginContext;
            return (<form className='login-page-wrapper' onSubmit={() => history.push('messages')}>
                <h4>Welcome</h4>
                <div className='login-input'>
                    <input type='text' name='name' placeholder='name' value={name} onChange={changeName}/>
                </div>
                <div className='login-input'>
                    <input type='text' name='surname ' placeholder='surname' value={surname}
                           onChange={changeSurname}/>
                </div>
                <div className='submit-input'>
                    <input type='submit' value='Add'/>
                </div>
            </form>)}}
        </LoginContext.Consumer>
    )
};

export default LoginPage;
