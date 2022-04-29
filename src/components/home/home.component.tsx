import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../hooks/use-api-request'
import { Video, VideoTO } from '../../utils'
import VideoList from '../video-list/video-list.component'

const Home: FC = () => {
    const [videos, setVideos] = useState<Video[]>([])
    const apiRequest = useApiRequest()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await apiRequest({
                method: 'GET',
                url: '/videos',
            })
            if (response) {
                const filteredVideos = response.data.map(({ attributes: { slug, title, url }, id }: VideoTO) => ({ id, slug, title, url }))
                setVideos(filteredVideos)
            }
        }
        fetchVideos()
    }, [setVideos, apiRequest])

    return (
        <div className='flex flex-col'>
            <span className='flex justify-center my-20'>
                <h1 className='text-main_green text-4xl'> Our video gallery</h1>
            </span>
            {videos && <VideoList videos={videos} />}
            <div className='flex justify-center items-center mt-5'>
                <button className='bg-main_green hover:bg-main_blue text-white text-center px-5 py-2.5 rounded' onClick={() => navigate('create-video')}>
                    Add a video
                </button>
            </div>

        </div>
    )
}

export default Home