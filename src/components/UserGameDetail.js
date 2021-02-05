import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Modal from 'react-modal'
import PlaySessionForm from './PlaySessionForm'
import EditUserGameDetail from './EditUserGameDetail'

Modal.setAppElement('#root')

function UserGameDetail({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    //var subtitle;
    const params = useParams()

    function handleClick() {
        console.log("clicked")
    }

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
        <div className="user-game-page">
            <div className="user-detail">
                    <img src={user.avatar} alt={user.username}/>
                    <Link to={`/users/${user.id}`}>
                        <p>{user.username}</p>
                    </Link>

                    {currentUser.id === userGame.user.id ? 
                    <div>
                        <EditUserGameDetail userGame={userGame} setUserGame={setUserGame}/>
                    </div>
                    :
                    <div className="modal-button">
                        <button onClick={openModal}>Let's Game</button>
                    </div>}
            </div>
            <div className="user-game-detail">
                <div className="user-game-img-div">
                    <img className="user-game-img" src={userGame.image} alt="placeholder" />
                </div>
                <div className="user-game-detail">
                    
                    {userGame.level}<br/>
                    {userGame.platform}<br/>
                    {userGame.server}<br/>
                    {userGame.details}
                </div>
                
                <div className="user-reviews">
                    Reviews
                    {user.reviews_as_reviewee.map(review => {
                        return <div key={review.id}>
                            {review.rating} | {review.reviewer.username}
                            <p>{review.contents}</p>
                        </div>
                    })}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
                >

                <PlaySessionForm closeModal={closeModal} currentUser={currentUser} userGame={userGame} />
            </Modal>
        </div>
    )
}

export default UserGameDetail
