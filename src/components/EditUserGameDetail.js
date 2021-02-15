import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, Typography, TextField, Box } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: "80vh",
      width: "500px",
      justifyContent: "center",
      alignItems: "center",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    //   width: '25ch',
      margin: theme.spacing(2)
    },
    label: {
        margin: theme.spacing(2),
    },
    textArea: {
        margin: theme.spacing(1),
        width: "100%",
        minRows: 3,
    }
}));

function EditUserGameDetail({ userGame, setUserGame, handleCloseEdit }) {
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
            handleCloseEdit()
        })
    }

    return (
        <Box className={classes.root}>
            <FormControl onSubmit={handleSubmit}>
                <Typography variant={"h4"}>Edit Game Info</Typography>
                <img height="200px"
                    src={
                    image
                        ? image
                        : "Set an Image"
                    }
                    alt=""
                />

                {/* <FormLabel htmlFor="image">Game Image</FormLabel> */}
                <TextField
                    label="Game Image URL"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    maxWidth
                    className={classes.textField}
                    type="text"
                    id="image"
                    autoComplete="off"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                {/* <FormLabel htmlFor="platform">Platform</FormLabel> */}
                <TextField
                    label="Platform"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text" value={platform} onChange={(e) => setPlatform(e.target.value)}/>

                {/* <FormLabel htmlFor="level">Level</FormLabel> */}
                <TextField
                    label="Level"
                    variant="outlined"
                    color="secondary"
                    lavel="dense" 
                    className={classes.textField}
                    type="text" value={level} onChange={(e) => setLevel(e.target.value)}/>

                {/* <FormLabel htmlFor="server">Server</FormLabel> */}
                <TextField
                    label="Server"
                    variant="outlined"
                    color="secondary"
                    lavel="dense"
                    className={classes.textField}
                    type="text" value={server} onChange={(e) => setServer(e.target.value)}/>

                <FormLabel htmlFor="details" className={classes.textField}>Intro</FormLabel>
                <TextareaAutosize id="details" value={details} className={classes.textArea} minRows={3} onChange={(e) => setDetails(e.target.value)} />

                <Button color="secondary" variant="contained" onClick={handleSubmit} > Update</Button>
            </FormControl>
        </Box>
    )
}

export default EditUserGameDetail
