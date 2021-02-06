import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}))

function Nav({ currentUser, handleLogout}) {

    const location = useLocation()
    if (location.pathname === "/") return null
    return (
        <AppBar className="nav" position="static">
            <Toolbar>  
                <Typography component={'div'} className="nav-games">
                    <NavLink to={"/games"}>
                        Games
                    </NavLink>
                </Typography>              
                <Typography component={'div'} className="user-nav-div">
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
                                <Button color="secondary" variant="contained" className="nav-button" onClick={handleLogout}>Logout</Button>
                            </div>
                        </div>} 
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
