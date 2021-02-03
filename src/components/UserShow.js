import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function UserShow() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)

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

    if (!isLoaded) return <h2>Loading...</h2>
    return (
        <div className="user-show">
            <img className="avatar-pfp" src={user.avatar} alt={user.username}/>
            <p>
                {user.username}<br/>
                {user.bio}
            </p>
        </div>
    )
}

export default UserShow
