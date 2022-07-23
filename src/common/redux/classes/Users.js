import { useSelector, useDispatch } from 'react-redux'
import { api } from './CryptoServer'
import User from './User'
/////////////////////////////////////////////////////////
export const APPNAME = 'windsortrade'
export const SUBSCRIBERDOCID = 'WINDSOR-TRADE-MLM'
////////////////////////////////////////////////////////
export default class Users {

    /**
     * @type {Array<User>}
     */
    list

    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    dispatchUsers = () =>
        this.dispatch({ type: 'dispatchUsers', payload: new Users(this) })

    constructor(users = null) {
        this.list = users && users.list ? users.list.map(u => new User(u)) : []
        this.dispatch = users && users.dispatch ? users.dispatch : null
    }

    json = () => this.list.map(u => u.json())

    /**
     * @param {string} docid 
     */
    load = async (docid) => {
        const user = this.list.find(u => u.docid === docid)
        if (user) return user
        const user2 = await api('/user/load', new User({ docid }).json())
        if (user2) {
            const newUser = new User(user2)
            this.list.push(newUser)
            this.dispatchUsers()
            return newUser
        }
        return new User()
    }
}

/**
 * @returns {Users}
 */
export const useUsers = () => {
    let users = useSelector((state) => state.users)
    if (!users) users = new Users()
    users.bindRedux(useDispatch())
    return users
}