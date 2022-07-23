import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconFontAwesome from '../../common/components/IconFontAwesome'
import style from '../../common/style'

/**
 * @param {{amount: number}} props 
 */
const PackageItem = props => {
    const { amount } = props
    const navigate = useNavigate()
    return (
        <div className={style('p-2 rounded-lg w-fit cursor-pointer hover:scale-105').card()}
            onClick={() => navigate(`/package/${amount}`)}
        >
            <div className='flex text-xs gap-2 items-center md:text-base md:gap-4'>
                <div className='text-slate-500 hidden md:block'>Click to add package</div>
                <IconFontAwesome>add</IconFontAwesome>
                <div className='text-slate-900 font-extrabold text-center'>
                    ${amount}
                </div>
            </div>
        </div>
    )
}

export default PackageItem