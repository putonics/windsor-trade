import React from 'react'
import assets from '../../assets'
const WorldClub = (props) => {
    return (
        <div className='py-6'>
            <table className=' border '>
                <thead className='border  bg-violet-300 text-stone-700 text-sm font-serif '>
                    <th className=''>Level</th>
                    <th className=''>What should be the package of the member?</th>
                    <th className=''>How many direct members should have a minimum of $100 package? </th>
                    <th className=''>Achievement  </th>
                </thead>
                <tbody className=''>
                    <tr className='text-thin border bg-stone-300 text-slate-500 font-serif '>
                        <td className='text-sm font-thin'>
                            <img className='w-8 justify-center align-middle' src={assets.gold} />Gold</td>
                        <td className=''>$100</td>
                        <td className=''>5</td>
                        <td className=''>0.5% of 2% company</td>
                    </tr>
                    <tr className='text-thin border bg-stone-300 text-slate-500 font-serif'>
                        <td className='text-sm  font-thin'>
                            <img className='w-8' src={assets.ruby} />Ruby</td>

                        <td className=''>$100</td>
                        <td className=''>10</td>
                        <td className=''>0.5% of 2% company</td>
                    </tr>
                    <tr className='text-thin border bg-stone-300 text-slate-500 font-serif'>
                        <td className='text-sm  font-thin'>
                            <img className='w-8' src={assets.pearl} />Pearl</td>
                        <td className=''>$100</td>
                        <td className=''>20</td>
                        <td className=''>0.5% of 2% company</td>
                    </tr>
                    <tr className='text-thin border bg-stone-300 text-slate-500 font-serif'>
                        <td className='text-sm  font-thin'>
                            <img className='w-8' src={assets.diamond} alt="" />Diamond</td>
                        <td className=''>$100</td>
                        <td className=''>50</td>
                        <td className=''>0.5% of 2% company</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default WorldClub