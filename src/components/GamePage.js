import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserCard from './UserCard'
import { Grid } from '@material-ui/core'

function GamePage() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [game, setGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const params = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                //console.log(data)
                setGame(data)
                setIsLoaded(true)
            })
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const filteredUserGames = data.filter(ug => ug.game_id === parseInt(params.id))
                setUserGames(filteredUserGames)
                
            })
    }, [params.id])

    console.log(userGames)

    if (!isLoaded) return <h2>Loading...</h2>
    
    return (
        <Grid className="game-page" >
            <Grid item className="game-splash">
                {game.name}
                <img src={game.splash} alt={game.name} />
            </Grid>
            <Grid container spacing={3} className="users-library">
                {userGames.map(userGame => 
                    <UserCard key={userGame.id} user={userGame.user} userGameId={userGame.id}/>    
                )}
            </Grid>
        </Grid>
    )
}

export default GamePage
