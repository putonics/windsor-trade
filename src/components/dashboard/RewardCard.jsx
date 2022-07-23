import React from 'react'

/**
 * @param {{imgUrl: string, title: string, amount: string, achieved: boolean}} props 
 */
const RewardCard = props => {
    return (
        <div className={`${props.achieved ? '' : 'opacity-50'} bg-white p-2 px-4 shadow-lg rounded-md text-sm md:text-base`} >
            <div className='flex items-center md:gap-6 gap-2 justify-between'>
                <div className='flex items-center gap-4'>
                    <img className='w-16' src={props.imgUrl} />
                    <div className='text-slate-800'>
                        {props.title}
                        {props.achieved ?
                            <div className='text-green-600 font-bold'>Achieved</div>
                            :
                            <div className='text-orange-600 font-bold text-sm'>Not achieved yet</div>
                        }
                    </div>
                </div>
                <div className='flex items-center'>
                    <div>
                        <span className='text-slate-600 hidden md:block'>
                            This rewards requires matching
                        </span>
                        <span className='text-slate-600 block md:hidden'>
                            Matching
                        </span>
                        <span className='teaxt-slate-900 font-extrabold'>${props.amount}</span>
                        <span className='text-slate-600 hidden md:block'>
                            both group.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RewardCard