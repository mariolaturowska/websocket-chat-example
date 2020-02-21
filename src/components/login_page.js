import React from 'react';
import {useHistory} from 'react-router-dom';

const LoginPage = () => {
    const history = useHistory();

    return (<div>
        <h4>Give your name</h4>
        <input type='text'></input>
        <button onClick={() => history.push('messages')}>Click</button>
    </div>)
};

export default LoginPage;