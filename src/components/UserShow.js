import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewForm from './ReviewForm'


function UserShow({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [playSessions, setPlaySessions] = useState([])

    const params = useParams()

    console.log(currentUser)

    function handleAccept(id) {
        console.log(id)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_accepted: true
            })
        })
        .then(resp => resp.json())
        .then(updObj => {
            const updatedPSessions = playSessions.map(session => {
                if (session.id === updObj.id) {
                    return {...session, is_accepted: updObj.is_accepted}
                } else {
                    return session
                }
            })
            setPlaySessions(updatedPSessions)
        })
    }

    function handleReject(id) {
        console.log("rejected")
        console.log(id)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rejected: true
            })
        })
        .then(resp => resp.json())
        .then(updObj => {
            console.log(updObj)
            const updatedPSessions = playSessions.map(session => {
                if (session.id === updObj.id) {
                    return {...session, rejected: updObj.rejected}
                } else {
                    return session
                }
            })
            setPlaySessions(updatedPSessions)
        })
    }

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
    }, [currentUser.id])

    // console.log(user)

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
    {/* Request Area */}

            {currentUser.id !== parseInt(params.id) ? null : 
            <div className="request-feed">
                <h2>Request Feed</h2>
                <div className="sent-pending">
                <h4> Sent </h4>
                    {playSessions.filter(session => {
                        return session.sender_id === currentUser.id && session.is_accepted === false && session.rejected === false
                    }).map(session => {
                        return <div key={session.id}>
                            {session.receiver.username} - {session.time} - {session.is_accepted ? "Accepted" : "Pending"}
                            </div>
                    })
                    }
                </div>
                <div className="received-pending">
                <h4> Recieved </h4>
                    {playSessions.filter(session => {
                        return session.receiver_id === currentUser.id && session.is_accepted === false && session.rejected === false
                    }).map(session => {
                        return <div key={session.id}>
                            {session.sender.username} requested to play {session.game.name} - {session.time} - {session.is_accepted ? "Accepted" : "Recieved request"}
                            <button onClick={() => handleAccept(session.id)}> Accept Request </button>
                            <button onClick={() => handleReject(session.id)}> Reject Request </button>
                            </div>
                    })
                    }
                </div>
                <div className="actioned-request-div">
                    <h4> Accepted Request</h4>
                    <div className="accepted-sent">
                        {playSessions.filter(session => {
                            return session.sender_id === currentUser.id && session.is_accepted === true
                        }).map(session => {
                            return <div key={session.id}>
                                {session.receiver.username} accepted {session.game.name} - {session.time} - {session.is_accepted ?  <div className="reviewer-div">
                <ReviewForm currentUser={currentUser} user={user}/>
            </div> : "Pending"}
                                </div>
                        })
                        }
                        {playSessions.filter(session => {
                            return session.receiver_id === currentUser.id && session.is_accepted === true
                        }).map(session => {
                            return <div key={session.id}>
                                {session.sender.username} requested to play {session.game.name} - {session.time} - {session.is_accepted ?  <div className="reviewer-div">
                <ReviewForm currentUser={currentUser} user={user}/>
            </div> : "Recieved request"}
                                </div>
                        })
                        }
                    </div>
                    <h4> Rejected Request </h4>
                    <div className="rejected-req">
                        {playSessions.filter(session => {
                            return session.sender_id === currentUser.id && session.rejected === true
                        }).map(session => {
                            return <div key={session.id}>
                                {session.receiver.username} rejected your request sad face {session.game.name} - {session.time}
                                </div>
                        })
                        }
                    </div>
                </div>
            </div>}
            
           
            <div className="user-show-reviews">
                Reviews
                {user.reviews_as_reviewee.map(review => {
                    return <div key={review.id}> 
                        {review.reviewer.username} | {review.rating} | {review.contents}
                    </div>
                })}
            </div>

        </div>
    )
}

export default UserShow
