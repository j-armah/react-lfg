import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login({ setCurrentUser, firstGame }) {
    const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    const history = useHistory()

    // function handleSubmit(event) {
    //     event.preventDefault()
    // }
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
                {/* <form className="login-form" onSubmit={handleSubmit}>
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
                    <button type="submit" className='submit-button'>Login</button>
                </form> */}
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login
