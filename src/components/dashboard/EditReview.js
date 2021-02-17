import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Button, FormLabel, InputLabel, Input, TextField, TextareaAutosize, Typography, Box ,Card ,Divider ,Grid, Paper } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';




// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     //   width: '25ch',
//     },
//     label: {
//         margin: theme.spacing(2),
//     },
//     cardContent: {
//         alignItems: "auto"
//     }
// }));


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
    },
    large: {
        width: theme.spacing(50),
        height: theme.spacing(50),
    },
    avatarBox: {
        margin: theme.spacing(2)
    },
    tagBox: {
        maringTop: theme.spacing(2)
        // width: "50%"
    },
    textArea: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
        // width: "80%"
    },
    submit: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        marginBottom: theme.spacing(2)
    }
}));

function EditReview({ review, updateReview }) {
    const [contents, setContents] = useState(review.contents)
    const [rating, setRating] = useState(review.rating)
    // const [tags, setTags] = useState([])
    // const [addedTags, setAddedTags] = useState([])
    // const history = useHistory()
    const classes = useStyles()
    const reviewee = review.reviewee
    // const [state, setState] = useState({
    //     2: false,
    //     3: false,
    //     4: false,
    //     5: false,
    //     6: false,
    //     7: false,
    //     8: false,
    //     9: false,
    //     10: false,
    // });

    

    // console.log(review.tags)



    // const tagBoxes = tags.map(tag => <TagBox key={tag.id} tag={tag} addedTags={addedTags} setTags/>)

    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };


    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_BASE_URL}/tags`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setTags(data)
    //         })
    // }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const reviewData = {
            contents: contents,
            rating: parseFloat(rating),
        }

        // let tagsArray = []

        // for (const [key, value] of Object.entries(state)) {
        //     if (value === true) {
        //         tagsArray = [...tagsArray, parseInt(key)]
        //     }
        // }

        // console.log(reviewData)
        // console.log(tagsArray)


        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
        .then(resp => resp.json())
        .then(newReviewObj => {
            console.log(newReviewObj)
            updateReview(newReviewObj)
            // if (newReviewObj.id === null) {
            //     alert("Can only review a user once!")
            // } else {
            //     history.push(`/users/${currentUser.id}`)
            // }
            // for (const id of tagsArray) {
            //     fetch(`${process.env.REACT_APP_API_BASE_URL}/review_tags`, {
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/json"
            //         }, 
            //         body: JSON.stringify({
            //             review_id: newReviewObj.id,
            //             tag_id: id
            //         })
            //     })
            //     .then(resp => resp.json())
            //     .then(reviewTag => {
            //         console.log(reviewTag)
            //     })
            // }
            // console.log("done")
        })
    }
    return (
    <Paper>
        <Grid item container>
            <Grid item xs={1}/>
            <Grid item xs={10}>
            
                <Box display="flex" justifyContent="center" alignItems="center" className={classes.avatarBox}>
                    <Avatar src={reviewee.avatar} className={classes.large}/>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                <FormControl onSubmit={handleSubmit}>
                    <Box display="flex" justifyContent="center"><Typography paragraph variant={"h6"}> Edit comment for {reviewee.username} on {review.game}</Typography> </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <FormLabel> Rate: </FormLabel>
                        <Rating
                            name="rating"
                            precision={0.5}
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Box>
                    {/* <Box className={classes.tagBox}>

                        <Grid container>
                        <Grid item xs={3}/>
                        <Grid item xs={6} alignContent="center" alignItems="center">
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={2} />}
                            label={"Chill"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={3} />}
                            label={"Tilt-proof"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={4} />}
                            label={"Team player"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={5} />}
                            label={"Friendly"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={6} />}
                            label={"Interactive"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={7} />}
                            label={"Strategic"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={8} />}
                            label={"Humorous"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={9} />}
                            label={"Creative"}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.id} onChange={handleChange} name={10} />}
                            label={"Carry"}
                        />
                        </Grid>
                        <Grid item xs={3}/>
                        </Grid>
                    </Box> */}
                    <TextareaAutosize placeholder={"Leave a comment (optional)"} name="content" value={contents} className={classes.textArea} onChange ={event => setContents(event.target.value)}/>
                    
                    <Button variant="contained" color="secondary" onClick={handleSubmit} className={classes.submit}>Submit Review</Button>
                </FormControl>
                </Box>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </Paper>
    )
}

export default EditReview
