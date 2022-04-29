import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VideoListProps } from '../../utils'
import { ReactComponent as EditIcon } from '../../UI/edit.svg'

const VideoList: FC<VideoListProps> = ({ videos }) => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center'>
            <ul >
                {videos.map(({ id, title }) => {
                    return (
                        <li className='flex gap-6 mb-6' key={`video-${id}`} >
                            <Link className=' text-white text-xl hover:text-main_green' to={`watch/${id}`}>{title}</Link>
                            <button onClick={() => navigate(`edit-video/${id}`)}>
                                <EditIcon className='h-5 w-5 text-main_green' />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default VideoList