import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        paddingBottom: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    title: {
        // flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        // height:'50%',
        display:'flex',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '12ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    login: {
        marginRight: theme.spacing(1),
    },
    form: {
        width: '100%',
    }
}));


function Nav({ currentUser, handleLogout }) {
    const [search, setSearch] = useState("")
    const [anchorEl, setAnchorEl] = useState(null)
    const history = useHistory()
    const classes = useStyles()
    const location = useLocation()
    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event) => {
        // console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleMenuCloseProfile = () => {
        history.push(`/users/${currentUser.id}`)
        setAnchorEl(null);
    };

    const handleLogoutClose = () => {
        setAnchorEl(null);
        handleLogout()
    }

    const handleMenuCloseInbox = () => {
        history.push(`/inbox`)
        setAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuCloseProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMenuCloseInbox}>Inbox</MenuItem>
            <MenuItem onClick={handleLogoutClose}>Logout</MenuItem> 
        </Menu>
    );

    const handleSearch = (event) => {
        event.preventDefault()

        console.log(search)
    }
    
    // console.log(search)
    
    if (location.pathname === "/" || location.pathname === "/signup") return null
    return (
    <div className={classes.grow}>
        
    <AppBar position="static" className={classes.appBar}>
        <Toolbar id="back-to-top-anchor">
        <div className="logo">
            <img height="50px" width="110px" src="https://i.imgur.com/NoEHEH8.png" />
        </div>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
        >
            <MenuIcon />
        </IconButton>
        <Button className={classes.title} onClick={() => history.push("/games")}>
            All Games
        </Button>
        
        
        <div className={classes.grow} />
        <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
                {/* <form className={classes.form} onSubmit={handleSearch}>
                <Autocomplete
                    freeSolo
                    fullWidth
                    autoSelect={true}
                    id="free-solo-2-demo"
                    disableClearable
                    options={users.map((user) => 
                        user.username
                        )}
                    onSubmit={() => console.log(search)}
                    inputValue={search}
                    onInputChange={(e) => setSearch(e.target.value)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Users"
                        margin="normal"
                        variant="outlined"
                        className={classes.autocomplete}
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        // classes={{
                        //     root: classes.inputRoot,
                        //     input: classes.inputInput,
                        // }}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />
                </form> */}
        </div>
        
        
        <div className={classes.sectionDesktop}>
            
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
                <MailIcon />
            </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
            </Badge>
            </IconButton> */}
            {!currentUser ? 
            <div>
                <Button onClick={() => history.push('/')}variant="outlined" color="inherit" className={classes.login}>Login</Button>
                <Button color="secondary" variant="contained">Signup</Button>
            </div>
            
            :
            <div>
            <IconButton
                edge="end"
                aria-label={"current user"}
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <Avatar src={currentUser.avatar} className={classes.large}/>
            </IconButton>
            </div>}
        </div>
        </Toolbar>
    </AppBar>
    {renderMenu}
    </div>
    );

    // const location = useLocation()
    // if (location.pathname === "/") return null
    // return (
    //     <AppBar className="nav" position="static">
    //         <Toolbar>  
    //             <Typography component={'div'} className="nav-games">
    //                 <NavLink to={"/games"}>
    //                     Games
    //                 </NavLink>
    //             </Typography>              
    //             <Typography component={'div'} className="user-nav-div">
    //                 {!currentUser ?
    //                     <div>
    //                         <NavLink exact to={"/"}>
    //                             Login
    //                         </NavLink>
    //                     </div> 
    //                     :
    //                     <div className="logged-in">
    //                         <div className='welcome-div'>
    //                             <NavLink exact to={`/users/${currentUser.id}`} className="nav-button">
    //                                <Typography>Welcome, {currentUser.username}!</Typography> 
    //                             </NavLink>
    //                             <Button color="secondary" variant="contained" className="nav-button" onClick={handleLogout}>Logout</Button>
    //                         </div>
    //                     </div>} 
    //             </Typography>
    //         </Toolbar>
    //     </AppBar>
    // )
}



export default Nav
