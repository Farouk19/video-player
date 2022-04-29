import React, { FC, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
import { useApiRequest } from '../../hooks/use-api-request';
import { Video, VideoPlayerProps } from '../../utils'

const VideoPlayer: FC<VideoPlayerProps> = () => {
    const { id } = useParams()
    const [currentVideo, setCurrentVideo] = useState<Video>()
    const apiRequest = useApiRequest()

    useEffect(() => {
        const fetchVideo = async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/videos/${id}`,
            })
            if (response) {
                const { attributes: { slug, title, url }, id } = response.data
                setCurrentVideo({ id, slug, title, url } as Video)
            }
        }
        fetchVideo()
    }, [])

    return (
        <div className='h-full flex flex-col justify-center items-center mt-20'>
            {currentVideo && <ReactPlayer url={currentVideo.url} />}
            <p className='text-white text-l mt-5'>
                {currentVideo?.slug}
            </p>
        </div>
    )
}

export default VideoPlayer