import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';
import PlaySessionForm from './PlaySessionForm';
import EditUserGameDetail from './EditUserGameDetail';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

Modal.setAppElement('#root')

function UserGameDetail({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    //var subtitle;
    const params = useParams()

    // function handleClick() {
    //     console.log("clicked")
    // }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                setUserGame(data)
                //setUser(data.user)
                
                fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${data.user.id}`)
                    .then(resp => resp.json())
                    .then(userr => {
                        console.log(userr)
                        setUser(userr)
                        
                        setIsLoaded(true)
                    })
            })
    }, [params.id])

    if (!isLoaded) return <h2>Loading...</h2>
    return (
        <Grid container spacing={4} className="user-game-page" component={"div"}>
            <Grid item xs={8} container spacing={2} className="user-game-detail">
                <Grid item xs={12} >
                    <div className="user-game-img-div">
                        <img height="100%" width="100%" className="user-game-img" src={userGame.image} alt="placeholder" />
                    </div>
                </Grid>
                <Grid item xs={12} className="user-game-detail" component={"div"}>
                    <Typography paragraph variant={"h4"}> Details </Typography>
                    <Paper>
                        <Box p={2} m={1}>
                            <Typography paragraph > Level: {userGame.level} </Typography>
                            <Typography paragraph > Platform: {userGame.platform} </Typography>
                            <Typography paragraph > Server: {userGame.server} </Typography>
                            <Typography paragraph > {userGame.details} </Typography>
                        </Box>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} className="user-reviews" component={"div"}>
                    <Typography variant={"h4"}>
                        Comments
                    </Typography>
                    {user.reviews_as_reviewee.map(review => {
                        return <Paper key={review.id}>
                            <Box p={2} m={1}>
                                <Typography paragraph>{review.rating} | {review.reviewer.username}</Typography>
                                <Typography paragraph>{review.contents}</Typography>
                            </Box>
                        </Paper>
                    })}
                </Grid>
            </Grid>
            <Grid item xs={4} component={"div"} className="user-detail">
                    <img height="50%" width="100%" src={user.avatar} alt={user.username}/>
                     
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                            <Typography variant={"h3"}>{user.username}</Typography>
                        </Link>
                    
                    

                    {!currentUser ? 
                    null  
                    : currentUser.id === userGame.user.id ? 
                    <div>
                        <EditUserGameDetail userGame={userGame} setUserGame={setUserGame}/>
                    </div>
                    :
                    <div className="modal-button">
                        {/* Needs to be logged in to open this modal , or needs to open login modal if clicked on */}
                        <Button onClick={openModal}>Let's Game</Button>
                    </div>}
            </Grid>
            
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
                >

                <PlaySessionForm closeModal={closeModal} currentUser={currentUser} userGame={userGame} />
            </Modal>
        </Grid>
    )
}

export default UserGameDetail
