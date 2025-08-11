import React from 'react'
import { StarRating } from './StarRating'
import moment from 'moment/moment'

const ReviewsCard = ({ review }) => {
    return (
        <div className="border border-slate-300 p-2 rounded-lg">
            <p className="font-semibold">{review.user_name}
                <span className="font-normal text-gray-500 text-sm ml-2">{moment(review.createdAt).format('lll')}</span>
            </p>
            <StarRating disabled value={review.rating} />
            <p>{review.description}</p>
        </div>
    )
}

export default ReviewsCard