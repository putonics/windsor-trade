import React from 'react'
import assets from '../../assets'
import IconFontAwesome from '../../common/components/IconFontAwesome'
import IconMaterial from '../../common/components/IconMaterial'
import User, { ADMINDOCID } from '../../common/redux/classes/User'
import style from '../../common/style'

/**
 * @param {{user: User}} props 
 */
const UserCard = props => {
    const { user } = props
    return (
        <div className={style('p-4 flex gap-x-2 items-center').card()}>
            <img src={assets.user} className='w-24 h-24 opacity-25 hover:opacity-30 ease-in-out cursor-pointer' />
            <div className='gap-y-1'>
                <div className='text-slate-900 font-semibold'>{user.name}</div>
                <div className='flex gap-2'>
                    <img src={assets.medal} className={`w-8`} />
                    <img src={assets.gold} className={`w-8 ${user.docid === ADMINDOCID || user.income.worldClubRank > 0 ? '' : 'grayscale'}`} />
                    <img src={assets.ruby} className={`w-8 ${user.docid === ADMINDOCID || user.income.worldClubRank > 1 ? '' : 'grayscale'}`} />
                    <img src={assets.pearl} className={`w-8 ${user.docid === ADMINDOCID || user.income.worldClubRank > 2 ? '' : 'grayscale'}`} />
                    <img src={assets.diamond} className={`w-8 ${user.docid === ADMINDOCID || user.income.worldClubRank > 3 ? '' : 'grayscale'}`} />

                </div>
                <div className='flex w-full'>
                    <div className='text-slate-900 font-extrabold'>{user.docid}</div>
                    {
                        user.active
                            ?
                            <IconMaterial className='text-green-600'>verified solid</IconMaterial>
                            :
                            <IconMaterial className='text-orange-600'>error</IconMaterial>
                    }
                </div>
                <div className='flex w-full'>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 0 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 1 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 2 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 3 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 4 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 5 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 6 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 7 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 8 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                    <IconFontAwesome className={`${user.docid === ADMINDOCID || user.income.ldbStar > 9 ? 'text-yellow-500' : 'text-slate-400'} hover:scale-105 ease-in-out`}>star</IconFontAwesome>
                </div>
                <div className='text-slate-900 text-xs'>{user.email}</div>
                <div className='text-slate-900'>+{user.countrycode}-{user.mobile}</div>
            </div>
        </div>
    )
}

export default UserCard