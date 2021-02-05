import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

function Login({ setCurrentUser, firstGame, handleLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        const formData = { username, password };
        //console.log(formData)
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            // then set that user in state in our App component
            console.log(data.user)
            if (data.user) {
              handleLogin(data.user)
              localStorage.setItem("token", data.token)
            } else {
              console.log(data)
              setErrors(data.error)
              // alert('Incorret username or password')
            }
          });
    }

    function login() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/`, {
            method: "POST",
            })
        .then((r) => r.json())
        .then(data => {
            setCurrentUser(data)
            history.push(`/games/${firstGame.id}`)
        });
    }

    console.log(username)

    return (
        <div className="login">
            <video autoPlay muted loop>
                <source src="/Atlias.mp4" type="video/mp4"/>
            </video>
            <div className="login-form-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Welcome to LFG</h3>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    />
                    <Button type="submit" className='submit-button'>Login</Button>
                </form>
                <Button> Login </Button>
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login
