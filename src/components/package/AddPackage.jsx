import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../common/components/Button'
import Form from '../../common/components/Form'
import TextBox from '../../common/components/TextBox'
import { sendOtp } from '../../common/redux/api/Email'
import { api } from '../../common/redux/classes/CryptoServer'
import User from '../../common/redux/classes/User'
import { useBusyPage } from '../../common/router/BusyPage'
import { useConfirm } from '../../common/router/Confirm'
import { useLogin } from '../../common/router/Login'
import { useOTPConfirm } from '../../common/router/OTPConfirm'
import { useSnackbar } from '../../common/router/Snackbar'
import style from '../../common/style'

const pkgs = [15, 100, 250, 500]
const AddPackage = props => {
    const { amount } = useParams()

    const login = useLogin()
    const [busy, setBusy] = React.useState(false)
    const [error, setError] = React.useState('')

    const [state, setState] = React.useState({
        appname: login.info.appname || '',
        subscriberdocid: login.info.subscriberdocid || '',
        docid: login.info.docid || '',
        todocid: login.info.docid || '',
        amount: amount || 15,
    })

    const [balance, setBalance] = React.useState(0)

    React.useEffect(() => {
        if (amount && (+amount) !== NaN) {
            const v = (+amount)
            setState({ ...state, amount: pkgs.includes(v) ? v : 15 })
        }
    }, [amount])

    React.useEffect(() => {
        fetch('https://worldtimeapi.org/api/timezone/GMT').then(res => res.json()).then(dt => {
            const today = new Date(dt.datetime)
            const user = new User(login.info)
            const tym = today.getFullYear() * 12 + today.getMonth()
            if (user && user.packages && user.packages.length) {
                let roi = 0
                user.packages.forEach(p => {
                    const pdt = new Date(p.date)
                    const pym = pdt.getFullYear() * 12 + pdt.getMonth()
                    const diff = tym - pym
                    roi += (p.amount * 0.02 * diff)
                })
                const balance = roi
                    + user.income.totalReferralIncome
                    + user.income.totalLevelIncome
                    + user.income.totalLdbIncome
                    + user.income.totalWorldClubIncome
                    - user.totalWithdrawal
                setBalance(balance)
            }
        }).catch(err => { })
    }, [state])


    const confirm = useConfirm()
    const otpConfirm = useOTPConfirm()
    const busyPage = useBusyPage()
    const snackbar = useSnackbar()
    React.useEffect(() => {
        busyPage.set(busy)
    }, [busy])

    const onSubmit = async () => {
        setBusy(true)
        confirm.open(
            <div className='p-2' >
                {
                    state.docid !== state.todocid
                        ?
                        <div className='text-red-600 font-extrabold animate-bounce py-2 text-center'>
                            You are adding package to another account!
                        </div>
                        : <></>
                }
                {
                    balance >= state.amount
                        ?
                        <div className='text-orange-600 text-center animate-pulse duration-75'>
                            <span className='font-extrabold'>Warning!</span> ${state.amount} will be deducted from your wallet.
                        </div>
                        :
                        <div className='text-orange-600 text-center animate-pulse duration-75'>
                            <span className='font-extrabold'>Warning!</span> You have to pay ${state.amount} manualy.
                        </div>
                }
                <div className='text-slate-900 text-xl text-center font-extrabold'>Are you sure?</div>
            </div >
            ,
            async () => {
                // alert('ok')
                const res = await sendOtp(login.info)
                if (res) {
                    otpConfirm.open(
                        res.otp,
                        'Please verify the OTP',
                        <div className='p-2'>
                            <div className='text-blue-800 text-center'>
                                An OTP with request-id <span className='text-orange-600 font-extrabold'>{res.requestid}</span> has been sent to {res.email}.
                            </div>
                        </div>,
                        async () => {
                            const res2 = await api('/user/package', state)
                            if (res2 && res2.docid === state.docid) {
                                snackbar.showSuccess('Request sent.')
                                setError(false)
                                setBusy(false)

                            }
                        }, () => {
                            snackbar.showError('Request failed.')
                            setBusy(false)
                        }
                    )
                } else {
                    setError('Failed to send OTP! Please try later.')
                    setBusy(false)
                }
            },
            () => {
                setBusy(false)
            },
        )
    }

    return (
        <Form onSubmit={onSubmit}>
            <div className={style('p-6').card()}>
                <div className={style('text-xl font-extrabold text-slate-900')}>
                    Adding new package
                </div>
                <div className={style('md:gap-6 gap-0 grid md:grid-cols-2 grid-cols-1')}>
                    <div className='pt-6'>
                        <TextBox
                            required
                            disabled={true}
                            label='Package amount ($)'
                            type='number'
                            value={state.amount}
                            onChange={amount => setState({ ...state, amount: (+amount) })}
                        />
                    </div>
                    <div className='pt-6'>
                        <TextBox
                            required
                            disabled={busy}
                            label='To the account'
                            type='text'
                            value={state.todocid}
                            onChange={todocid => setState({ ...state, todocid })}
                        />
                    </div>
                </div>
                <div className={style('text-xs font-extrabold text-slate-900 animate-pulse')}>
                    N.B.: {
                        balance >= state.amount
                            ? `Since you have $${balance} in your wallet, then the amount $${state.amount} for this package will be deducted from your wallet automatically.`
                            : `Since you don't have sufficient balance in your wallet, the the amount $${state.amount} should be manualy paid to admin. This request will be served by admin.`
                    }
                </div>
                <div className='text-red-600 text-center pt-6'>
                    {error}
                </div>
                <div className='flex justify-center pt-6'>
                    <Button disabled={busy} color={balance >= state.amount ? 'green' : 'orange'} type='submit'>{
                        balance >= state.amount ? 'Add this package' : 'Send request'
                    }</Button>
                </div>
            </div>
        </Form>
    )
}

export default AddPackage