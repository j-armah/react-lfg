import React, { useState } from 'react'

function ReviewForm({ currentUser, user }) {
    const [contents, setContents] = useState("")
    const [rating, setRating] = useState(1)

    function handleSubmit(event) {
        event.preventDefault()

        const reviewData = {
            reviewer_id: parseInt(currentUser.id),
            reviewee_id: parseInt(user.id),
            contents: contents,
            rating: parseInt(rating)
        }

        console.log(reviewData)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        })
        .then(resp => resp.json())
        .then(newReviewObj => {
            console.log(newReviewObj)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Write a review:<br/>
                    <textarea name="content" value={contents} onChange ={event => setContents(event.target.value)}/>
                    <br/>
                    Rate: <select name="rating" id="rating" form="review" value={rating} onChange={event => setRating(event.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>              
                    </select>
                </label>
                <button type="submit" className="submit-button">Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewForm
