import React from 'react'
import assets from '../../assets'
import User, { ADMINDOCID } from '../../common/redux/classes/User'
import RewardCard from './RewardCard'

/**
 * @param {{user: User}} props 
 */
const Rewards = props => {
    const { user } = props
    return (
        <div className='my-6'>
            <div className='text-slate-600 text-base font-semibold mb-2'>Rewards</div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                {
                    assets.rewards.map((r, i) => (
                        <RewardCard imgUrl={r.url} amount={r.matching} title={r.title} key={i + 'rewards'}
                            achieved={user && (user.docid === ADMINDOCID || (user.income && user.income.rewardsAchieved > i))}
                        />
                    ))
                }
            </div >
        </div >
    )
}

export default Rewards