import React , { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'

function PlaySessionForm({ closeModal, currentUser, userGame }) {
    // const [dateTime, setDateTime] = useState(null)
    const [dateTime, setDateTime] = useState(new Date());

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
        })

    }

    return (
        <div>
        <h2>Play with {userGame.user.username}</h2>
          <img height="200px" src={userGame.user.avatar} alt={userGame.user.username} className="request-form-img"/>
          <form onSubmit={handleSubmit}>
            <p>Start Time: </p>
            <DateTimePicker
                onChange={setDateTime}
                value={dateTime}
            />
            <button type="submit"> Send Request </button>
          </form>
          <br/>
          <button onClick={closeModal}>close</button>
        </div>
    )
}

export default PlaySessionForm
