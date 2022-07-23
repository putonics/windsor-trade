import React from 'react'
import LeadershipBounus from './LeadershipBounus'
import Rewords from './Rewords'
import TermsPage1 from './TermsPage1'
import WorldClub from './WorldClub'

const TermsAndConditions = () => {
    return (
        <div className='p-4'>
            <TermsPage1 />
            <div className='p-4'>
                <LeadershipBounus />
                <Rewords />
                <WorldClub />
            </div>
        </div>
    )
}

export default TermsAndConditions