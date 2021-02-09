import React, { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, InputLabel, Input, TextField, TextareaAutosize, Typography, Box ,Card ,Divider ,Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

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
    cardContent: {
        alignItems: "auto"
    }
}));

function ReviewForm({ currentUser, sessionId, reviewee }) {
    const [contents, setContents] = useState("")
    const [rating, setRating] = useState(1)
    const classes = useStyles()

    console.log(rating)
    console.log(reviewee)

    function handleSubmit(event) {
        event.preventDefault()

        const reviewData = {
            reviewer_id: parseInt(currentUser.id),
            reviewee_id: parseInt(reviewee.id),
            contents: contents,
            rating: parseInt(rating),
            play_session_id: parseInt(sessionId)
        }

        console.log(reviewData)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
        .then(resp => resp.json())
        .then(newReviewObj => {
            console.log(newReviewObj)
            if (newReviewObj.id === null) {
                alert("Can only review a user once!")
            }
        })
    }
    return (
        <Grid container>
            <Grid item xs={4}/>
            <Card alignContent="center">
                <CardHeader 
                    title="Review"
                >
                    {"hEY"}
                </CardHeader>
                <CardMedia>
                    <img height="400px"src={reviewee.avatar} alt={reviewee.username} />
                </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <FormControl onSubmit={handleSubmit}>
                            <label>
                                Review {reviewee.username}<br/>
                                <textarea name="content" value={contents} onChange ={event => setContents(event.target.value)}/>
                                <br/>
                                {/* Rate: <select name="rating" id="rating" form="review" value={rating} onChange={event => setRating(event.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>              
                                </select> */}
                                <>
                                <FormLabel> Rate: </FormLabel>
                                <Rating
                                    name="rating"
                                    precision={0.5}
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                </>
                            </label>
                            <Button variant="contained" color="secondary" onClick={handleSubmit} className="submit-button">Submit Review</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            <Grid item xs={4}/>
        </Grid>
    )
}



export default ReviewForm
