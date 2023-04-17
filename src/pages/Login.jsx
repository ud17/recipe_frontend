import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Login({isLoggedIn}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate password and set passwordInvalid state accordingly
        if (password.length < 8) {
            //setError("Password is too short.")
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }

        let body = {
          username: email,
          password: password
        }
        axios.post("http://localhost:8080/authenticate", body, {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then((response) => {
            if(response.data.code === 200) {
              localStorage.setItem("userId", response.data.data.id);
              localStorage.setItem("role", response.data.data.role);
              isLoggedIn(true);
              localStorage.setItem("isLoggedIn", true);
              navigate("/");
            }
            else if(response.data.code === 400) {
              setError(response.data.message);
            }
            else {
              setError("Something went wrong.");
            }
        }).catch((error) => {
            if(error.response.data.code === 400) {
              setError(error.response.data.message);
            }
            else{
              setError("Something went wrong.");
            }
        });
    }

    const emailEntered = (e) => {
        setEmail(e.target.value);
        setError("");
    }

    const passwordEntered = (e) => {
        setPassword(e.target.value);
        setError("");
    }

    const buttonEnabled = (email, password) => {
        if(email.length > 0 && password.length > 0) {
            setEnabled(true);
        } else {
            setEnabled(false);
        }
    }

    return (
        <Form>
            <H2>Login</H2>
            <Label>Username:</Label>
            {error !== "" && error}
            <Input type="text" value={email} onChange={e => emailEntered(e)}/>
            <Label invalid={passwordInvalid}>Password:</Label>
            <Input type="password" value={password} onChange={(e) => passwordEntered(e)} />
            {passwordInvalid && <Alert>Password is invalid.</Alert>}
            <Button type="button" onClick={handleSubmit} disabled={!email || !password}>Login</Button>
            {/* <H4>Don't have an account? <A href="/signup">Sign Up</A></H4> */}
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

export default Login;