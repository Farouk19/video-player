import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../UI/home.svg'

const Header: FC = () => {
    const navigate = useNavigate()

    return (
        <header className='flex justify-start items-center gap-3 bg-white h-20'>
            <h1 className='text-main_blue text-4xl font-bold ml-4'>tl;dv</h1>
            <button onClick={() => navigate('/')}>
                <HomeIcon className='h-9 w-9 text-main_blue' />
            </button>
        </header>
    )
}

export default Header