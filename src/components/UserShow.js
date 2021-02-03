import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function UserShow({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [playSessions, setPlaySessions] = useState([])

    const params = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUser(data)
                setIsLoaded(true)
            })
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const filteredSessions = data.filter(session => {
                    return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                })
                setPlaySessions(filteredSessions)
                // setIsLoaded(true)
            })
    }, [])
    console.log(playSessions)

    if (!isLoaded) return <h2>Loading...</h2>
    return (
        <div className="user-show">
            <div className="user-info">
                <img className="avatar-pfp" src={user.avatar} alt={user.username}/>
                <p>
                    {user.username}<br/>
                    {user.bio}
                </p>
            </div>
            <div className="user-games-played">
                <h3>Games I play</h3>
                {user.games.map(game => <li key={game.id}>{game.name}</li>)}
            </div>
    // Request Area
            <div className="request-feed">
                <h2>Request Feed</h2>
                <div className="sent-pending">
                <h4> Sent </h4>
                    {playSessions.filter(session => {
                        return session.sender_id === currentUser.id && session.is_accepted === false
                    }).map(session => {
                        return <div key={session.id}>
                            {session.receiver.username} - {session.time} - {session.is_accepted ? "Accepted" : "Pending"}
                            </div>
                    })
                    }
                </div>
                <div className="received-pending">
                <h4> Request </h4>
                    {playSessions.filter(session => {
                        return session.receiver_id === currentUser.id && session.is_accepted === false
                    }).map(session => {
                        return <div key={session.id}>
                            {session.sender.username} - {session.time} - {session.is_accepted ? "Accepted" : "Recieved request"}
                            </div>
                    })
                    }
                </div>
                <div>
                    <h4> Accepted Request</h4>
                    <div className="accepted-sent">
                        {playSessions.filter(session => {
                            return session.sender_id === currentUser.id && session.is_accepted === true
                        }).map(session => {
                            return <div key={session.id}>
                                {session.receiver.username} - {session.time} - {session.is_accepted ? "Accepted" : "Pending"}
                                </div>
                        })
                        }
                        {playSessions.filter(session => {
                            return session.receiver_id === currentUser.id && session.is_accepted === true
                        }).map(session => {
                            return <div key={session.id}>
                                {session.sender.username} - {session.time} - {session.is_accepted ? "Accepted" : "Recieved request"}
                                </div>
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserShow
