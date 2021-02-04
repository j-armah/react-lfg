import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal'
import PlaySessionForm from './PlaySessionForm'

Modal.setAppElement('#root')

function UserGameDetail({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    var subtitle;
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
                setUser(data.user)
                setIsLoaded(true)
            })
    }, [params.id])

    if (!isLoaded) return <h2>Loading...</h2>
    return (
        <div className="user-game-page">
            <div className="user-detail">
                    <img src={user.avatar} alt={user.username}/>
                    <p>{user.username}</p>
                    <div className="modal-button">
                        <button onClick={openModal}>Let's Game</button>
                    </div>
            </div>
            <div className="user-game-detail">
                <div className="user-game-img-div">
                    <img className="user-game-img" src="https://i.imgur.com/mjKFM3z.png" alt="placeholder" />
                </div>
                <div className="user-game-detail">
                    Level, Platform, Server
                    {userGame.details}
                </div>
                
                <div className="user-reviews">
                    Reviews
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
