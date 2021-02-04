import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'

function Nav({ currentUser, handleLogout}) {
    return (
        <div className="nav">
            <div className="user-nav-div">
                {!currentUser ?
                    <div>
                        <NavLink exact to={"/"}>
                            Login
                        </NavLink>
                    </div> 
                    :
                    <div className="logged-in">
                        <div className='welcome-div'>
                            <NavLink exact to={`/users/${currentUser.id}`} className="nav-button">
                                Welcome, {currentUser.username}!
                            </NavLink>
                            <button className="nav-button" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>} 
            </div>
            <div>
                <NavLink to={"/games"}>
                    Games
                </NavLink>
            </div>
        </div>
    )
}

export default Nav
