import { FC } from 'react'
import { CustomButtonProps } from '../utils'


const CustomButton: FC<CustomButtonProps> = ({ text, color, hoverColor, handleClick, type }) =>
    <button className={`bg-${color} hover:bg-${hoverColor} text-white text-center px-5 py-2.5 rounded`} type={type} onClick={handleClick}>
        {text}
    </button>

export default CustomButton