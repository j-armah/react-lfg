import React, { useEffect } from 'react'
import Talk from "talkjs";


const InboxComponent = ({ user, otherUser }) => {
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
            if (otherUser) {
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
    
                
                const inbox = session.createInbox({selected: conversation}); //{selected: conversation}
                inbox.mount(talkjsContainer.current);
            } else {
                const inbox = session.createInbox(); //{selected: conversation}
                inbox.mount(talkjsContainer.current);
            }
            // console.log(other)
        })
    },[])

    console.log(talkjsContainer.current)
    // if (talkjsContainer.current === null) return <h1>Loading...</h1>
    return (
        <div ref={talkjsContainer} className="chatbox-container"></div>
        // <div></div>
    )
}

// class InboxComponent extends React.Component {
    
//     constructor(props) {
//       super(props)
//       this.talkjsContainer = React.createRef();
//     }
    
//     componentDidMount() {    
//       Talk.ready.then(() => {
//         var me = new Talk.User({
//           id: this.props.user.id,
//           name: this.props.user.username,
//         //   email: "demo@talkjs.com",
//           photoUrl: this.props.user.avatar,
//         //   welcomeMessage: "Hey there! How are you? :-)",
//           role: "user"
//         });
        
//         window.talkSession = new Talk.Session({
//           appId: "tZAIJPQN",
//           me: me
//         });
        
//         var other = new Talk.User({
//           id: this.props.otherUser.id,
//           name: this.props.otherUser.username,
//         //   email: "demo@talkjs.com",
//           photoUrl: this.props.otherUser.avatar,
//         //   welcomeMessage: "Hey, how can I help?",
//           role: "user"
//         });
  
//         var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
//         conversation.setParticipant(me);
//         conversation.setParticipant(other);
        
//         var inbox = window.talkSession.createInbox({selected: conversation});
//         inbox.mount(this.talkjsContainer.current);
//       });
//     }
  
//     render() {
//       return (
//         <div ref={this.talkjsContainer} className="chatbox-container"></div>
//       )
//     }
//   }



// class InboxComponent extends Component {

//     constructor(props) {
//         super(props);

//         this.inbox = undefined;
//         let currentUser;
//         const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
//         if (currentTalkjsUser) {
//             currentUser = JSON.parse(currentTalkjsUser)
//         }

//         this.state = {
//             currentUser
//         }
//     }


//     componentDidMount() {
//         Talk.ready
//             .then(() => {
//                 const me = new Talk.User(this.state.currentUser);
                
//                 if (!window.talkSession) {
//                     window.talkSession = new Talk.Session({
//                         appId: "tZAIJPQN",
//                         me: me
//                     });
//                 }
            
//                 this.inbox = window.talkSession.createInbox();
//                 this.inbox.mount(this.container);

//             })
//             .catch(e => console.error(e));
//     }

//     render() {
//         return (
//             <Fragment>
//                 <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
//             </Fragment>
//         );
//     }
//   }
  
export default InboxComponent
