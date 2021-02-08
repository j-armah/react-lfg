import React from 'react'
import ReviewForm from './ReviewForm'

function Review({ reviewee, currentUser}) {
    
    return (
        <div>
            
            <ReviewForm reviewee={reviewee} currentUser={currentUser}/>
        </div>
    )
}

export default Review
