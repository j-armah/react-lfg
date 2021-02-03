import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserGameDetail() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const params = useParams()

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
        <div className="user-game-detail">
            <div className="user-detail">
                <img src={user.avatar} alt={user.username}/>
                <p>{user.username}</p>
                <p></p>
            </div>
            <div>
                game related img detail
            </div>
            <div className="user-game-detail">
                {userGame.details}
            </div>
            <button>Let's Game</button>
        </div>
    )
}

export default UserGameDetail
