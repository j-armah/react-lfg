import { Typography } from '@material-ui/core'
import React from 'react'
import InboxComponent from './InboxComponent'

function Inbox({ user, otherUser}) {

    console.log(user, otherUser)
    return (
        <div className="inbox-container">
            {/* <Typography paragraph> Inbox </Typography> */}
            <InboxComponent user={user} otherUser={otherUser}/>
        </div>
    )
}

export default Inbox
