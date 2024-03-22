import React, { useState } from 'react'
import { signInPage } from '../service';


const values = { email: '', password: "" };

const SignIn = () => {

    const [initialValues, setInitialValues] = useState(values);

    const onhandleChange = ({ target: { name, value } }) => {
        setInitialValues({ ...initialValues, [name]: value });
    };
    const onSignInPage = async () => {
        await signInPage(initialValues)
    }
    return (
        <div style={{ marginTop: "300px" }}>
            <input placeholder='email' name='email' onChange={onhandleChange}></input>
            <input placeholder='password' name="password" onChange={onhandleChange}></input>
            <button onClick={onSignInPage}>Sign In</button>
        </div>
    )
}

export default SignIn