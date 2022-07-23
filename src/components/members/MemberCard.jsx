import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../assets'
import Subordinate from '../../common/redux/classes/Subordinate'
import User, { ADMINDOCID } from '../../common/redux/classes/User'
import style from '../../common/style'

/**
 * @param {{user: User|Subordinate}} props 
 */
const MemberCard = props => {
    const { user } = props
    const navigate = useNavigate()

    const [amount, setAmount] = React.useState(0)
    React.useEffect(() => {
        // console.log(user)
        if (user.docid === ADMINDOCID) {
            setAmount(user.totalTurnover)
            return
        }
        if (user.mobile) {
            let sum = 0
            user.packages.forEach(p => {
                sum += p.amount
            })
            setAmount(sum)
        }
    }, [props])

    return (
        <div className={style('p-2 hover:bg-yellow-100 cursor-pointer my-2').card()}
            onClick={() => {
                if (!user.mobile) {
                    navigate(`/members/${user.docid}`)
                }
            }}
        >
            <div className={'flex items-center gap-2 flex-wrap md:flex-nowrap justify-center md:justify-start md:text-left' + (!user.mobile ? ' text-center' : '')}>
                <div className='rounded-full p-2 overflow-clip bg-slate-400'>
                    <img src={assets.user} className={(user.mobile ? 'w-16 h-16 ' : 'w-10 h-10 ') + 'opacity-25 hover:opacity-30 ease-in-out cursor-pointer'} />
                </div>
                <div>
                    <div className='text-sm'>{user.name}</div>
                    <div className='text-sm font-bold'>{user.docid}</div>
                    {
                        user.mobile
                            ?
                            <>
                                <div className='text-xs'>+{user.countrycode}-{user.mobile}</div>
                                <div className='text-xs'>{user.email}</div>
                                <div className='flex text-xs gap-1'>
                                    <div className='text-slate-600'>{user.docid === ADMINDOCID ? 'Turnover' : 'Package'}:</div>
                                    <div className='text-red-600 font-extrabold'>${amount}</div>
                                </div>
                            </>
                            :
                            <div className='md:flex md:gap-2 flex-none gap-0'>
                                <div className='flex text-xs gap-1'>
                                    <div className='text-slate-600'>Package:</div>
                                    <div className='text-red-600 font-extrabold'>${user.dp}</div>
                                </div>
                                <div className='flex text-xs gap-1'>
                                    <div className='text-slate-600'>Total turnover:</div>
                                    <div className='text-slate-900 font-extrabold'>${user.tp}</div>
                                </div>
                                <div className='flex text-xs gap-1'>
                                    <div className='text-slate-600'>Last Month:</div>
                                    <div className='text-green-600 font-extrabold'>${user.mp}</div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MemberCard