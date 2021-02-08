import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, Typography, TextField } from '@material-ui/core';

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

function EditUserGameDetail({ userGame, setUserGame }) {
    const [details, setDetails] = useState(userGame.details)
    const [platform, setPlatform] = useState(userGame.platform)
    const [level, setLevel] = useState(userGame.level)
    const [server, setServer] = useState(userGame.server)
    const [image, setImage] = useState(userGame.image)
    const classes = useStyles()


    function handleSubmit(event) {
        event.preventDefault()
    
        const newGameInfo = {
            details: details,
            platform: platform,
            level: level,
            server: server,
            image: image
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/${userGame.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGameInfo)
        })
        .then(resp => resp.json())
        .then(newUserGameObj => {
            console.log(newUserGameObj)
            setUserGame(newUserGameObj)
        })
    }

    return (
        <div className={classes.root}>
            <FormControl onSubmit={handleSubmit}>
                <Typography variant={"h4"}>Edit Game Info</Typography>
                <img height="100px"
                    src={
                    image
                        ? image
                        : "Set an Image"
                    }
                    alt=""
                />

                <FormLabel htmlFor="image">Game Image</FormLabel>
                <TextField
                    label="URL"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text"
                    id="image"
                    autoComplete="off"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <FormLabel htmlFor="platform">Platform</FormLabel>
                <TextField
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text" value={platform} onChange={(e) => setPlatform(e.target.value)}/>

                <FormLabel htmlFor="level">Level</FormLabel>
                <TextField
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    lavel="dense" 
                    className={classes.textField}
                    type="text" value={level} onChange={(e) => setLevel(e.target.value)}/>

                <FormLabel htmlFor="server">Server</FormLabel>
                <TextField
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text" value={server} onChange={(e) => setServer(e.target.value)}/>

                <FormLabel htmlFor="details">Intro</FormLabel>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} />

                <Button color="secondary" variant="contained" onClick={handleSubmit} > Update</Button>
            </FormControl>
        </div>
    )
}

export default EditUserGameDetail
