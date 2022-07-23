import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../common/components/Button'
import TextBox from '../../common/components/TextBox'
import { useLogin } from '../../common/router/Login'
import IncomeCard from './IncomeCard'
import Packages from './Packages'
import Rewards from './Rewards'
import SocialShare from './SocialShare'
// import ReportChart from './ReportChart'
import UserCard from './UserCard'
import WalletCard from './WalletCard'
import WindsorCoin from './WindsorCoin'

const Dash = props => {
    const login = useLogin()
    const navigate = useNavigate()
    return (
        <div>
            <WindsorCoin user={login.info} />
            <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-2'>
                <UserCard user={login.info} />
                <WalletCard user={login.info} />
                <IncomeCard user={login.info} />
            </div>
            <Packages user={login.info} />
            <Rewards user={login.info} />
            <div className='mt-4 flex flex-row justify-center items-center gap-2'>
                <div className='flex-1'>
                    <TextBox
                        readonly
                        label='Invite people via this link'
                        value={`https://windsortrad.com/signup/${login.info.docid}`}
                    />
                </div>
                <Button icon='fa fa-share' className='h-10 mt-3' color='gray'
                    onClick={() => navigate(`/signup/${login.info.docid}`)}
                ></Button>
            </div>
            <SocialShare url={`https://windsortrad.com/signup/${login.info.docid}`} />
            {/* <ReportChart /> */}
        </div>
    )
}

export default Dash