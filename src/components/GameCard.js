import React from 'react'
import { Link } from 'react-router-dom'

function GameCard({ game, newUserGame }) {
    const {id, name, genre, image} =  game

    function handleClick() {
        newUserGame(game)
    }

    return (
        <div className="card">
            <Link to={`/games/${id}`}>
                <img className="poster" src={image} alt={name} />
            </Link>
            <button onClick={handleClick}> Add Game </button>
        </div>
    )
}

export default GameCard
