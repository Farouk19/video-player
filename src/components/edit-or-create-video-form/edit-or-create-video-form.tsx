import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApiRequest } from '../../hooks/use-api-request'
import { EditOrCreateVideoFormProps, Video } from '../../utils'

const EditOrCreateVideoForm: FC<EditOrCreateVideoFormProps> = ({ mode }) => {

    const { id } = useParams()
    const [videoToEditOrCreate, setVideoToEditOrCreate] = useState<Video>({ slug: '', title: '', url: '', isPublic: true } as Video)

    const apiRequest = useApiRequest()
    const navigate = useNavigate()

    const { slug, title, url } = videoToEditOrCreate

    const FormTitle = mode === 'edit' ? 'Edit a video' : 'Create a new video'

    const handleVideoInputChanges = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setVideoToEditOrCreate((videoToEditOrCreate) => ({ ...videoToEditOrCreate, [event.target.name]: (event.target.value) ?? (event.target.checked) }))
    }, [setVideoToEditOrCreate])

    const handleEditVideo = useCallback(
        async () => {
            const videoToEditId = videoToEditOrCreate.id
            await apiRequest({
                method: 'PUT',
                url: `/videos/${videoToEditId}`,
                data: videoToEditOrCreate,
            })
            navigate('/')
        },
        [apiRequest, videoToEditOrCreate, navigate]
    )
    const handleCreateVideo = useCallback(
        async () => {
            await apiRequest({
                method: 'POST',
                url: '/videos',
                data: videoToEditOrCreate,
            })
            navigate('/')
        },
        [apiRequest, videoToEditOrCreate, navigate]
    )

    useEffect(() => {
        if (id) {
            const fetchVideo = async () => {
                const response = await apiRequest({
                    method: 'GET',
                    url: `/videos/${id}`,
                })
                if (response) {
                    const { attributes: { slug, title, url, isPublic }, id } = response.data
                    setVideoToEditOrCreate({ id, slug, title, url, isPublic } as Video)
                }
            }
            fetchVideo()
        }
    }, [])

    return (
        <div className='flex justify-center mt-20'>
            <form className="w-full max-w-lg bg-white rounded p-6">
                <h1 className="text-center mb-6">{FormTitle}</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                            Slug
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={slug} id="slug" name="slug" type="text" placeholder="Video slug" onChange={handleVideoInputChanges} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={title} id="title" name="title" type="text" placeholder="Video title" onChange={handleVideoInputChanges} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="url">
                            Url
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={url} id="url" name="url" type="text" placeholder="Video Url" onChange={handleVideoInputChanges} />
                    </div>
                </div>
                <div className="flex justify-end items-center gap-2 mt-5">
                    <div>
                        <button className='bg-main_green hover:bg-main_blue text-white text-center px-5 py-2.5 rounded' onClick={() => navigate('/')}>
                            Cancel
                        </button>
                    </div>
                    {mode === 'edit' ?
                        <button className='bg-main_blue hover:bg-blue-400 text-white text-center px-5 py-2.5 rounded' onClick={handleEditVideo}>
                            Save
                        </button>
                        :
                        <button className='bg-main_blue hover:bg-blue-400 text-white text-center px-5 py-2.5 rounded' onClick={handleCreateVideo}>
                            Create
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default EditOrCreateVideoForm