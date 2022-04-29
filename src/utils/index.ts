import axios from "axios"

export type Video = {
    id?: string
    slug: string
    title: string
    url: string
    isPublic: boolean
}

export type VideoTO = {
    id: string
    attributes: Video
}

export type VideoListProps = {
    videos: Video[]
}

export type VideoPlayerProps = {
    video?: Video
}

export type CustomButtonProps = {
    text: string
    color: string
    hoverColor?: string
    type?: 'button' | 'submit' | 'reset'
    handleClick?: () => void
}

export type EditOrCreateVideoFormProps = {
    mode: 'edit' | 'add'
    video?: Video
}


export const axiosClient = axios.create({
    baseURL: `http://localhost:1337/api`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})