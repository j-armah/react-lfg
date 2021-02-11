import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Talk from "talkjs";


const NewChat = ({ user, otherUser }) => {
    const location = useLocation()
    const talkjsContainer = React.createRef();

    console.log(user)

    useEffect(() => {
        
        const currentUser = user;

        Talk.ready.then(() => {
            let me = new Talk.User({
                id: currentUser.id,
                name: currentUser.username,
                photoUrl: currentUser.avatar,
                welcomeMessage: "Hey there! How are you? :-)"
            });

            const session = new Talk.Session({
                appId: "tZAIJPQN",
                me: me
            });

            // console.log(session)
        
            let other = new Talk.User({
                id: otherUser.id,
                name: otherUser.username,
                // email: "Sebastian@example.com",
                photoUrl: otherUser.avatar,
                // welcomeMessage: "Hey, how can I help?"
            });
        
            const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other))
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            // console.log(other)
            const inbox = session.createInbox({selected: conversation});
            inbox.mount(talkjsContainer.current);
        })
    },[])

    console.log(talkjsContainer.current)
    // if (talkjsContainer.current === null) return <h1>Loading...</h1>
    return (
        <div ref={talkjsContainer} className="chatbox-container"></div>
        // <div></div>
    )
}

export default NewChat
