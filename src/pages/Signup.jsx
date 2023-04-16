import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Signup() {

    const [fName, setfName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate password and set passwordInvalid state accordingly
        if (password.length < 8) {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }
    }

    const fNameEntered = (e) => {
        setfName(e.target.value);
    }

    const emailEntered = (e) => {
        setEmail(e.target.value);
    }

    const passwordEntered = (e) => {
        setPassword(e.target.value);
    }

    const buttonEnabled = (email, password) => {
        if(email.length > 0 && password.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <H2>Sign Up</H2>
            <Label>Full Name:</Label>
            <Input type="text" value={fName} onChange={e => fNameEntered(e)}/>
            <Label>Email:</Label>
            <Input type="email" value={email} onChange={e => emailEntered(e)}/>
            <Label invalid={passwordInvalid}>Password:</Label>
            <Input type="password" value={password} onChange={(e) => passwordEntered(e)} />
            {passwordInvalid && <Alert>Password is invalid.</Alert>}
            <Button type="submit" disabled={!fName || !email || !password}>Sign Up</Button>
            <H4>Already have an account? <A href="/login">Login</A></H4>
        </Form>
    )
}

const Form = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
`

const H2 = styled.h2`
  text-align:center;
  padding-bottom:20px;
`;

const H4 = styled.h4`
  text-align:center;
  padding-top:20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${props => props.invalid ? 'red' : 'black'};
`

const A = styled.a`
  color: blue;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
`

const Alert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;

export default Signup;