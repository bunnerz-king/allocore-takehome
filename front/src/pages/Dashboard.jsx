import React, { useContext, useEffect, useState, useRef } from 'react'
import { API_SERVER, createRootbeer, getRootbeer } from '../api/service'
import Pagination from '../components/Pagination'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { DrinkContext } from '../context/DrinkProvider'
import { Plus } from 'lucide-react'
import Modal from '../components/Modal'
import { toast } from 'react-toastify'
import { StarRatingDisplay } from '../components/StarRatingDisplay'
import moment from 'moment'
import LoadingSpinner from '../components/LoadingSpinner'
import Select from 'react-select'

const Dashboard = () => {
    const [rootBeers, setRootBeers] = useState([])
    const [total, setTotal] = useState(0);

    const [showCreate, setShowCreate] = useState(false);
    const [nameValue, setNameValue] = useState('');
    const [descValue, setDescValue] = useState('');
    const scrollRef = useRef();

    const { setDrink } = useContext(DrinkContext);
    const pageSize = 10;
    const pages = Math.ceil(total / pageSize);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const page = Number(searchParams.get("page")) || 0;
    const [loading, setLoading] = useState(false);
    const sortOptions = [
        { value: true, label: 'Newest First' },
        { value: false, label: 'Oldest First' },
    ]
    const [selectedSortDesc, setSelectedSortDesc] = useState(() => {
        const sortVal = searchParams.get("sortDesc");
        if (sortVal != null) {
            const bool = sortVal == "true";
            const res = sortOptions.find((x) => x.value == bool);
            return res;
        }
        return sortOptions[0];
    })

    useEffect(() => {
        fetchRootBeer();
    }, [])

    const fetchRootBeer = async () => {
        setLoading(true);
        try {
            const res = await getRootbeer({
                offset: page * pageSize,
                length: pageSize,
                sort: 'createdAt',
                desc: searchParams.get('sortDesc') ? searchParams.get('sortDesc') == 'true' : true,
                name: search,
            });
            setRootBeers(res.items);
            setTotal(res.total);
            setLoading(false);
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0 });
            }
        } catch (e) {
            console.error(e)
        }
    }

    const setParam = (key, value) => {
        const params = new URLSearchParams(searchParams);

        if (key === "page") {
            params.set("page", value);
        } else {
            // if updating filer, reset page
            params.set(key, value);
            params.set("page", "0");
        }

        setSearchParams(params);
    };

    useEffect(() => {
        fetchRootBeer();
    }, [searchParams])

    const navigate = useNavigate();

    const handleClick = (rootbeer) => {
        setDrink(rootbeer);
        navigate('/' + rootbeer.id);
    }

    const handlePageChange = async (newPage) => {
        setParam("page", newPage - 1)
    }
    const handleCreate = async () => {
        await createRootbeer({ name: nameValue, description: descValue })
        await fetchRootBeer()
        toast.success("Rootbeer Created")
        closeCreate();
    }

    const closeCreate = () => {
        setShowCreate(false);
        setDescValue('');
        setNameValue('');
    }

    const handleSearch = async () => {
        setParam("search", search)
    }

    const handleKeydown = async (e) => {
        if (e.key === "Enter") {
            await handleSearch();
        }
    }
    return (
        <>
            <Modal header="Add New Rootbeer" open={showCreate}
                onClose={() => closeCreate()}
            >
                <div className="flex-1 min-w-100 flex flex-col space-y-5 pb-5">
                    <TextInput value={nameValue} onChange={(e) => setNameValue(e.target.value)} label="Name" />

                    <TextInput value={descValue} onChange={(e) => setDescValue(e.target.value)} label="Description" />
                </div>
                <div className='flex justify-center'><Button
                    disabled={!nameValue || !descValue}
                    onClick={() => handleCreate()}
                >Create</Button></div>
            </Modal>
            <div className="flex-1 flex flex-col min-h-0  bg-white">
                <div ref={scrollRef} className="flex flex-1 min-h-0 flex-col space-y-2 overflow-y-auto">
                    <div className="p-5 pb-1 sticky z-10 top-[0px] bg-white top-0">
                        <div className="flex justify-between">
                            <div className="flex">
                                <TextInput
                                    onKeyDown={handleKeydown}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="min-w-100 h-[38px]"
                                    placeholder={'Search Rootbeers'}
                                />  <Button
                                    onClick={handleSearch}
                                    type="secondary">Search</Button>
                            </div>
                            <div>
                                <Select value={selectedSortDesc} onChange={(e) => {
                                    setSelectedSortDesc(e);
                                    setParam('sortDesc', e.value)

                                }} placeholder="Sort" options={sortOptions} />

                            </div>
                            <Button onClick={() => setShowCreate(true)}>New <Plus /></Button>
                        </div>
                        <div className="text-sm font-semibold py-2 ">{`Showing ${total < 1 ? 0 : page * pageSize + 1} - ${(Math.min((page + 1) * pageSize, total))} of ${total}`}</div>

                    </div>
                    {!loading ? <div className="p-5 pt-0 flex-1 flex flex-col space-y-3 pb-4">
                        {rootBeers.map((rootbeer, i) =>
                            <div
                                key={i}
                                onClick={() => handleClick(rootbeer)}
                                className=" flex bg-white border border-slate-300 cursor-pointer space-x-3 hover:shadow-md transition p-3 py-5 rounded-md">
                                <div className="border border-slate-300 rounded-md aspect-square overflow-hidden min-w-40 w-40 h-40 aspect-square">
                                    {rootbeer.Pictures?.[0]?.path ? <img className='w-full aspect-square object-contain' src={`${API_SERVER}${rootbeer.Pictures?.[0]?.path}`} /> : <div className="flex items-center justify-center w-full h-full aspect-sqaure text-gray-500">No Image</div>}</div>
                                <div>
                                    <div className='truncate-2-lines text-xl font-semibold'>{rootbeer.name}</div>
                                    <StarRatingDisplay value={rootbeer.reviewAverageRating} count={rootbeer.reviewCount} />
                                    <div className="text-gray-500">{moment(rootbeer.createdAt).format('lll')}</div>
                                    <div className='truncate-2-lines'>{rootbeer.description}</div>
                                </div>
                            </div>)}
                    </div> : <div className='flex-1 flex justify-center items-center'>
                        <LoadingSpinner />
                    </div>}
                </div>
                <div className='py-3'>
                    <Pagination totalPages={pages} currentPage={page + 1} onPageChange={handlePageChange} /></div>
            </div>
        </>
    )
}

export default Dashboard