import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core'
import SentComments from './dashboard/SentComments';
import ReceivedComments from './dashboard/ReceivedComments';
import List from '@material-ui/core/List';
import EditReview from './dashboard/EditReview';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';





const useStyles = makeStyles((theme) => ({
    comments: {
        marginRight: theme.spacing(4),
    }
}))


function Dashboard({ currentUser }) {
    const classes = useStyles()
    const [tab, setTab] = useState(0)
    const [review, setReview] = useState(null)
    const [sentReviews, setSentReviews] = useState([])
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    // const [requestTab, setRequestTab] = React.useState(0);
    console.log(currentUser)
    
    // useEffect(() => {
    //     const sentReviews = currentUser.reviews_as_reviewer.map(review => <SentComments key={review.id} review={review}/>)
    // }, [])
    // const handleRequestChange = (event, newValue) => {
    //   setRequestTab(newValue);
    // };

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleEdit = (review) => {
        console.log(review)
        setReview(review)
        setOpen(true)
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const updateReview = (updReview) => {
        setOpen(false)
        console.log(updReview)

        const updatedReviews = sentReviews.map(review => {
            if (review.id === updReview.id) {
                return {...review, rating: updReview.rating, contents: updReview.contents}
            } else {
                return review
            }
        })
        setSentReviews(updatedReviews)
    }

    const deleteReview = (delReview) => {
        console.log(delReview)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${delReview.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(data => {
            const updatedReviews = sentReviews.filter(review => review.id !== delReview.id)
            setSentReviews(updatedReviews)
        })
    } 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${currentUser.id}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setSentReviews(data.reviews_as_reviewer.reverse())
                setIsLoaded(true)
                
            })
    }, [])
   

    // console.log(currentUser.reviews_as_reviewee)
    if (!isLoaded) return <h1>Loading...</h1>
    return (
        <>
        <Grid container >
            <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Tabs value={tab} onChange={handleChange} >
                    <Tab label="Sent Comments"  />
                    <Tab label="Received Comments"  />
                    {/* <Tab label="Sent Request"  />
                    <Tab label="Received Request"  />
                    <Tab label="Accepted Request"  />   */}
                </Tabs>       
            </Box>
            </Grid>
            
            <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
                { tab === 0 ? <List>{sentReviews.map(review => <SentComments key={review.id} review={review} handleEdit={handleEdit} deleteReview={deleteReview}/>)}</List>  : null}
                { tab === 1 ? <List>{user.reviews_as_reviewee.map(review => <ReceivedComments key={review.id} review={review} />)}</List> : null}
                { tab === 2 ? 'display sent request' : null}
                { tab === 3 ? 'display received request' : null}
                { tab === 4 ? 'display accepted request' : null}
                </Box>
            </Grid>
        </Grid>

        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <EditReview review={review} updateReview={updateReview} />
            </div>
            </Fade>
        </Modal>
        </>
    )
}

export default Dashboard
