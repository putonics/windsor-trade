import React from 'react'
import User from '../../common/redux/classes/User'
import PackageItem from './PackageItem'
import PackageView from './PackageView'

/**
 * @param {{user: User}} props 
 */
const Packages = props => {
    const { user } = props
    return (
        user && user.packages && user.packages.length > 0
            ?
            <div className='my-4'>
                <div className='text-slate-600 text-base font-semibold mb-2'>Investments</div>
                <div className='flex flex-wrap md:justify-start justify-center gap-4'>
                    {
                        user.packages.map((p, i) => (
                            <PackageView pkg={p} key={'pkg-' + i} />
                        ))
                    }
                </div>
                <div className='flex justify-evenly gap-4 mt-4'>
                    <PackageItem amount={500} />
                    <PackageItem amount={250} />
                    <PackageItem amount={100} />
                    <PackageItem amount={15} />
                </div>
            </div>
            :
            <></>
    )
}

export default Packages