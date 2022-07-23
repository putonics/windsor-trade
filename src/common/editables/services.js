import { api } from "../redux/classes/CryptoServer"
import User from "../redux/classes/User"
export const SECRET = 'n4F1~Z!09<tb/}u=8M\'D"txL)w(-r#7$|pA+V{HC@q*5K^eo6Sv%3Jb\\G,5.y+'//set you SECRET here
/**
 * @param {string} userid 
 * @param {string} password 
 * @returns {Object}
 */
export const tryLogin = async (docid, password) => {
    //WRITE YOUR LOGIN CODE HERE. it must returns user info after login completed successfully
    const user = new User({ docid, password })
    // console.log(docid, password)
    try {
        return await api('/user/signin', user.json())
    } catch (e) {
        console.log('Exception: ' + e)
        return null
    }
}