import React from 'react'
import assets from '../../assets'
import Package from '../../common/redux/classes/Package'
import style from '../../common/style'

/**
 * @param {{pkg: Package}} props 
 */
const PackageView = props => {
    const { pkg } = props
    const dt = new Date(pkg.date)
    return (
        <div className={style('p-4 rounded-2xl w-fit').card()}>
            <div className='flex text-2xl gap-4 items-center'>
                <img src={assets.cash64} className='w-12 h-12' />
                <div className='text-slate-900 font-extrabold'>
                    ${pkg.amount}
                    <div className='text-slate-500 text-sm font-normal'>{dt.toDateString()} GMT</div>
                </div>
            </div>
            {/* <div className='flex'>
                <div className='text-slate-700'>Amount: </div>
                <div className='text-slate-900'>${pkg.amount}</div>
            </div> */}
        </div>
    )
}

export default PackageView