import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, TextField, TextareaAutosize, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    label: {
        margin: theme.spacing(2),
    }
}));

function EditUserInfo({ user, setUser }) {
    // const {username, name, avatar, bio, discord} = user
    const [username, setUsername] = useState(user.username)
    const [name, setName] = useState(user.name)
    const [avatar, setAvatar] = useState(user.avatar)
    const [bio, setBio] = useState(user.bio)
    const [discord, setDiscord] = useState(user.discord)
    const classes = useStyles()
    

    function handleSubmit(event) {
        event.preventDefault()

        const newUserInfo = {
            username: username,
            name: name,
            avatar: avatar,
            bio: bio,
            discord: discord
        }
        
        console.log(newUserInfo)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserInfo)
        })
        .then(resp => resp.json())
        .then(newUserObj => {
            console.log(newUserObj)
            setUser(newUserObj)
        })
    }

    return (
        <div className={classes.root}>
            <FormControl onSubmit={handleSubmit}>
                <Typography variant={"h4"}>Edit Profile</Typography>

                <FormLabel  htmlFor="avatar">Profile Picture Url</FormLabel>
                <img height="100px"
                    className={classes.label}
                    src={
                    avatar.length
                        ? avatar
                        : "https://lh3.googleusercontent.com/proxy/m9B-sb2utNndi98V1tIaKMFS1atLd1GnqzAklP6EhNsuzrnYnVkwkO9cDyN1qN802ZD1ayrrTezpP0b901jIuE0eHBOzk2BB1Cd67lOTpRvXCxg2dqupRiwFKHHQOz7N_afl1tu-LsM"
                    }
                    alt={username}
                />

                <TextField
                    label="URL" 
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text"
                    autoComplete="off"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                />

                <FormLabel className={classes.label} htmlFor="name">Edit Name</FormLabel>
                <TextField 
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    fullWidth
                    className={classes.textField}
                    type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <FormLabel className={classes.label} htmlFor="username">Edit Username</FormLabel>
                <TextField
                    label="Username" 
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <FormLabel className={classes.label} htmlFor="name">Edit Discord</FormLabel>
                <TextField
                    label="Discord"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField} 
                    type="text" value={discord} onChange={(e) => setDiscord(e.target.value)}/>

                <FormLabel className={classes.label} htmlFor="bio">Bio</FormLabel>
                <TextareaAutosize rowsMin={5} id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                <br/>
                <Button color="secondary" variant="contained" onClick={handleSubmit} > Update</Button>
            </FormControl>
        </div>
    )
}

export default EditUserInfo
