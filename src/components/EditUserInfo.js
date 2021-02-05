import React, { useState } from 'react'

function EditUserInfo({ user, setUser }) {
    // const {username, name, avatar, bio, discord} = user
    const [username, setUsername] = useState(user.username)
    const [name, setName] = useState(user.name)
    const [avatar, setAvatar] = useState(user.avatar)
    const [bio, setBio] = useState(user.bio)
    const [discord, setDiscord] = useState(user.discord)

    function handleSubmit(event) {
        event.preventDefault()

        const newUserInfo = {
            username: username,
            name: name,
            avatar: avatar,
            bio: bio,
            discord: discord
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserInfo)
        })
        .then(resp => resp.json())
        .then(newUserObj => {
            console.log(newUserObj)
            setUser(newUserObj)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>

                <label htmlFor="avatar">Profile Picture</label>
                <input
                    type="text"
                    id="avatar"
                    autoComplete="off"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                />
                <img height="100px"
                    src={
                    avatar.length
                        ? avatar
                        : "https://lh3.googleusercontent.com/proxy/m9B-sb2utNndi98V1tIaKMFS1atLd1GnqzAklP6EhNsuzrnYnVkwkO9cDyN1qN802ZD1ayrrTezpP0b901jIuE0eHBOzk2BB1Cd67lOTpRvXCxg2dqupRiwFKHHQOz7N_afl1tu-LsM"
                    }
                    alt={username}
                />

                <label htmlFor="name">Edit Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="username">Edit Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="name">Edit Discord</label>
                <input type="text" value={discord} onChange={(e) => setDiscord(e.target.value)}/>

                <label htmlFor="bio">Bio</label>
                <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />

                <input type="submit" value="Update" />
            </form>
        </div>
    )
}

export default EditUserInfo
