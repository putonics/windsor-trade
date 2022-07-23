import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../common/components/Button'
import TableSkeleton from '../../common/components/TableSkeleton'
import TextBox from '../../common/components/TextBox'
import User from '../../common/redux/classes/User'
import { useUsers } from '../../common/redux/classes/Users'
import { useLogin } from '../../common/router/Login'
import MemberCard from './MemberCard'

const Members = props => {
    const login = useLogin()

    const { docid } = useParams()
    const navigate = useNavigate()
    React.useEffect(() => {
        if (docid === ':docid') navigate(`/members/${login.info.docid}`)
    }, [docid])

    const [user, setUser] = React.useState(new User())

    const users = useUsers()
    const [busy, setBusy] = React.useState(false)
    const load = async () => {
        setBusy(true)
        setUser(await users.load(docid))
        setBusy(false)
    }
    React.useEffect(() => {
        if (docid === ':docid') return
        load()
    }, [docid])

    return (
        busy
            ?
            <TableSkeleton rows={10} cols={2} />
            :
            <div>
                <div className='flex justify-center'>
                    <MemberCard user={user} />
                </div>
                <div className='grid grid-cols-2 mt-2'>
                    <div className='bg-red-100 p-2 rounded-tl-lg'>
                        <div className='text-red-400 font-extrabold'>Group-A:</div>
                        {
                            user.groupA.map(a => (
                                <MemberCard user={a} key={a.docid} />
                            ))
                        }
                    </div>
                    <div className='bg-blue-100 p-2 rounded-tr-lg'>
                        <div className='text-blue-400 font-extrabold'>Group-B:</div>
                        {
                            user.groupB.map(b => (
                                <MemberCard user={b} key={b.docid} />
                            ))
                        }
                    </div>
                </div>
                <div className='mt-4 flex flex-row justify-center items-center gap-2'>
                    <div className='flex-1'>
                        <TextBox
                            readonly
                            label={`Join people under ${user.docid} ${user.name}`}
                            value={`https://windsortrad.com/signup/${user.docid}`}
                        />
                    </div>
                    <Button icon='fa fa-share' className='h-10 md:mt-3 mt-8' color='gray'
                        onClick={() => navigate(`/signup/${user.docid}`)}
                    ></Button>
                </div>
            </div>
    )
}

export default Members