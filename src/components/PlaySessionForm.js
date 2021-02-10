import React , { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, Typography, Grid } from '@material-ui/core';

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

function PlaySessionForm({ currentUser, userGame, setOpen}) {
    // const [dateTime, setDateTime] = useState(null)
    const [dateTime, setDateTime] = useState(new Date());
    const classes = useStyles()

    // console.log("currentUser in form", currentUser)
    // console.log("usergame on form", userGame)


    function handleSubmit(event) {
        event.preventDefault()

        const playRequest = {
            sender_id: currentUser.id,
            receiver_id: parseInt(userGame.user.id, 10),
            game_id: parseInt(userGame.game_id, 10),
            is_accepted: false,
            rejected: false,
            time: dateTime
        }

        console.log(playRequest)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playRequest)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setOpen(false)
        })

    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={6}>
                <div>
                    <Typography paragraph>Request to {userGame.user.username}</Typography>
                    <img height="250px" src={userGame.user.avatar} alt={userGame.user.username} className="request-form-img"/>
                </div>
            </Grid>  
            <Grid item xs={6}>
            <FormControl onSubmit={handleSubmit}>
                
                <FormLabel >Start Time: </FormLabel>

                <DateTimePicker
                    onChange={setDateTime}
                    value={dateTime}

                />
                <Button color="secondary" variant="contained" onClick={handleSubmit} > Send Request </Button>
            </FormControl>
            </Grid>
        </Grid>
    )
}

export default PlaySessionForm
