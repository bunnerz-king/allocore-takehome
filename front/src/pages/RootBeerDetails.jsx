import React, { useContext, useEffect, useState } from 'react'
import { DrinkContext } from '../context/DrinkProvider'
import { API_SERVER, API_URL, createReview, getImages, getReviews, uploadImage } from '../api/service';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Plus } from 'lucide-react';
import Modal from '../components/Modal';
import ImageUploader from '../components/ImageUploader';
import { toast } from 'react-toastify';
import TextInput from '../components/TextInput';
import { StarRating } from '../components/StarRating';
import { StarRatingDisplay } from '../components/StarRatingDisplay';
import ReviewsModal from '../components/ReviewsModal';
import ReviewsCard from '../components/ReviewsCard';
import moment from 'moment';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
const RootBeerDetails = () => {
    const { drink } = useContext(DrinkContext);
    const [mainPhoto, setMainPhoto] = useState(null)
    const [images, setImages] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [showCreateImage, setShowCreateImage] = useState(false);
    const [showCreateReview, setShowCreateReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    if (!drink) { return }

    useEffect(() => {
        fetchImages(drink.id);
        fetchReviews(drink.id);
    }, [])

    const fetchImages = async () => {
        try {
            const res = await getImages(drink.id);
            setImages(res);
            if (res.length && !mainPhoto) {
                setMainPhoto(res?.[0])
            }

        } catch (e) {
            console.error(e);
        }

    }

    const fetchReviews = async () => {
        try {
            const res = await getReviews(drink.id, { offset: 0, length: 10 });
            setReviews(res.items);
            setTotalReviews(res.total);
        } catch (e) {
            console.error(e);
        }


    }

    const handleUploadImage = async () => {
        try {
            const res = await uploadImage(drink.id, file);
            await fetchImages();
            setShowCreateImage(false);
            setFile(null);
            toast.success("Image Added")
        } catch (e) {
            console.error(e);
        }
    }

    const handlePostReview = async () => {
        try {
            const res = await createReview(drink.id, {
                rating, description, 'user_name': username
            });

            await fetchReviews();

            closeReviewModal();

            toast.success("Review Added")
        } catch (e) {
            console.error(e);
        }

    }

    const closeReviewModal = () => {
        setShowCreateReview(false);
        setUsername('');
        setRating(0);
        setDescription('');
    }

    const navigate = useNavigate();
    return (
        <>
            {showAllReviews && <ReviewsModal open={showAllReviews}
                onClose={() => setShowAllReviews(false)}
                drinkId={drink.id} />}
            <Modal header="Add Image" open={showCreateImage} onClose={() => { 
                setFile(null);
                setShowCreateImage(false)

            }}>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="flex-1 w-full flex"><ImageUploader file={file} setFile={setFile} />
                        </div>
                        <Button
                            disabled={!file}
                            onClick={() => handleUploadImage()}>Upload</Button>
                    </div>

                </div>
            </Modal>
            <Modal header="Add Review" open={showCreateReview} onClose={() => setShowCreateReview(false)}>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="flex-1 w-100 h-200 pb-4 flex flex-col space-y-3">
                            <StarRating value={rating} onChange={setRating} />
                            <TextInput label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextInput
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                        </div>
                        <Button
                            disabled={!rating || !username || !description}
                            onClick={() => handlePostReview()}>Post Review</Button>
                    </div>

                </div>
            </Modal>
            <div className="p-5 flex flex-col">
                <div className="mb-4 cursor-pointer self-start"
                    onClick={() => navigate(-1)}
                >{'< Back to Dashboard'}</div>
                {/* product */}

                <div className="flex flex-row space-x-3 items-start  ">
                    <div className="max-h-120 sticky top-0 flex flex-1 flex-row space-x-2">
                        <div className=" flex flex-col w-20 border border-slate-300 items-center">
                            {images.length ? <div className="flex flex-col flex-1 space-y-1 p-1 overflow-y-auto hide-scrollbar">
                                {images?.map((image, i) => <img key={i}
                                    onClick={() => setMainPhoto(image)}
                                    className={`rounded 
                    aspect-square
                    cursor-pointer border border-slate-300 object-contain
                    ${image.path == mainPhoto.path ? 'outline-2 outline-blue-400' : ''}
                    `}
                                    src={`${API_SERVER}${image.path}`} />)}
                            </div> : <div className='flex flex-col flex-1 p-2 text-center text-gray-500'>No images</div>}
                            <div className="p-1">
                                <Tippy content="Upload Image">
                                    <span>
                                    <Button
                                        onClick={() => setShowCreateImage(true)}
                                    ><Plus /></Button></span>
                                    </Tippy></div>
                        </div>
                        {/* Display */}
                        <div className="flex-1 min-w-0 flex aspect-square border border-slate-300">
                            {mainPhoto ?
                                <img
                                    className='object-contain w-full max-w-full max-h-full'
                                    src={`${API_SERVER}${mainPhoto.path}`} /> : <div className='w-full h-full flex items-center justify-center text-gray-500'> No image</div>}
                        </div>
                    </div>
                    {/* Details */}
                    <div className='flex flex-col flex-1'>
                        <h1 className="text-3xl mb-2 font-semibold capitalize">{drink.name}</h1>
                        <StarRatingDisplay value={drink.reviewAverageRating}
                            count={drink.reviewCount}
                        />
                        <hr className='border-b border-slate-300 w-full' />
                        <p className="mt-2 text-gray-500">{moment(drink.createdAt).format('lll')} </p>
                        <p className="font-semibold mt-3">Details: </p>
                        <p className="min-h-30">{drink.description}</p>

                        <div className="mt-7">
                            <div className="flex justify-between mb-3">  <h1 className="text-2xl">
                                Reviews {`(${totalReviews})`}</h1> <Button
                                    onClick={() => setShowCreateReview(true)}
                                >Add Review <Plus size="20" /></Button></div>
                            <div className="flex flex-col space-y-3">
                                {reviews?.map((review, i) => <ReviewsCard key={i} review={review} />)}
                            </div>
                            {totalReviews > 10 && <div className="flex justify-center py-3"><Button onClick={() => setShowAllReviews(true)}>See All Reviews</Button></div>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RootBeerDetails