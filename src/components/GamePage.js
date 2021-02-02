import React from 'react'
import UserCard from './UserCard'

function GamePage() {
    return (
        <div className="game-page">
            <div className="game-splash">
                Splash Art/Game Name
            </div>
            <div className="user-cards-container">
                <UserCard />
            </div>
        </div>
    )
}

export default GamePage
