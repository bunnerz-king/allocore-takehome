import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import ReviewsCard from './ReviewsCard';
import { getReviews } from '../api/service';
import Button from './Button';

const ReviewsModal = ({ open, onClose, drinkId }) => {
    const [page, setPage] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [total, setTotal] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        fetchReviews();
    }, [page])

    const fetchReviews = async () => {
        try {
            const res = await getReviews(drinkId, { offset: page * pageSize, length: pageSize });
            setReviews((prev) => [...prev, ...res.items]);
            setTotal(res.total);
        } catch (e) {

        }

    }

    return (
        <Modal header={`Reviews (${total})`} open={open} onClose={onClose}>
            <div className='w-[70vw] space-y-3 flex flex-col overflow-y-auto min-h-0 flex-1'>
                {reviews.map((review, i) => <ReviewsCard key={i} review={review} />)}
                {reviews.length < total && <div className="flex justify-center"><Button onClick={() => setPage((prev) => prev + 1)}>See More</Button></div>}

            </div>
        </Modal>
    )
}

export default ReviewsModal