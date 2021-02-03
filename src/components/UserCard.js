import React from 'react'
import { Link } from 'react-router-dom'

function UserCard({ user, userGameId }) {
    const {id, avatar, username, name} = user
    return (
        <div className="card">
            <Link to={`/user_games/${userGameId}`}>
                <img className="avatar" src={avatar} alt={username} />
            </Link>
            
            <p> {username}</p>
        </div>
    )
}

export default UserCard
