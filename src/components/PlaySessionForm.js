import React , { useState } from 'react'
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateTimePicker from 'react-datetime-picker'
import { format } from 'date-fns';
// import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Button, FormLabel, Typography, Grid, TextField, Box, Paper } from '@material-ui/core';
// import DateTimePicker from '@material-ui/lab/DateTimePicker';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

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
    },
    large: {
        height: theme.spacing(35),
        width: theme.spacing(35)
    },
    submit: {
        margin: theme.spacing(2)
    },
    date: {
        // margin: theme.spacing
    },
    // containerBox: {
    //     borderTopRightRadius: "40px"
    // }
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
        <Box className={classes.containerBox}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center"> <Typography paragraph variant={"h5"}>Request to {userGame.user.username}</Typography></Box>
                    <Box display="flex" justifyContent="center">
                        
                        <Avatar src={userGame.user.avatar} alt={userGame.user.username} className={classes.large}/>
                    </Box>
                </Grid>  
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" className={classes.date}>
                    <FormControl onSubmit={handleSubmit}>
                        
                        <FormLabel >Start Time: </FormLabel>

                            <TextField
                                id="datetime-local"
                                // label="Next appointment"
                                type="datetime-local"
                                // defaultValue={format(Date.now, 'YYYY-MM-DD[T]HH:mmZZ')}
                                style={{ width: 250 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        <Button color="secondary" variant="contained" onClick={handleSubmit} className={classes.submit}> Send Request </Button>
                    </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PlaySessionForm


{/* 
                <DateTimePicker
                    onChange={setDateTime}
                    value={dateTime}

                /> */}
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                    />
                    </LocalizationProvider> */}