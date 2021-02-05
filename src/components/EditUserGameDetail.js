import React, { useState } from 'react'

function EditUserGameDetail({ userGame, setUserGame }) {
    const [details, setDetails] = useState(userGame.details)
    const [platform, setPlatform] = useState(userGame.platform)
    const [level, setLevel] = useState(userGame.level)
    const [server, setServer] = useState(userGame.server)
    const [image, setImage] = useState(userGame.image)

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
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Edit Game Info</h1>

                <label htmlFor="image">Game Image</label>
                <input
                    type="text"
                    id="image"
                    autoComplete="off"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <img height="100px"
                    src={
                    image
                        ? image
                        : "Set an Image"
                    }
                    alt="Set a game image"
                />

                <label htmlFor="platform">Platform</label>
                <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)}/>

                <label htmlFor="level">Level</label>
                <input type="text" value={level} onChange={(e) => setLevel(e.target.value)}/>

                <label htmlFor="server">Server</label>
                <input type="text" value={server} onChange={(e) => setServer(e.target.value)}/>

                <label htmlFor="details">Intro</label>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} />

                <input type="submit" value="Update" />
            </form>
        </div>
    )
}

export default EditUserGameDetail
