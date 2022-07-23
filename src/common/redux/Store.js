import { createStore } from "redux"
import Login from '../router/Login'
import Users from "./classes/Users"

const initstate = {
    login: new Login(),
    users: new Users(),
}

export const Store = createStore((state = initstate, action) => {
    switch (action.type) {
        case 'dispatchLogin':
            return { ...state, login: action.payload }
        case 'dispatchUsers':
            return { ...state, users: action.payload }
        default:
            return state
    }
})