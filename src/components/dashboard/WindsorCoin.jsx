import React from "react"
import { useNavigate } from "react-router-dom"
import User, { ADMINDOCID } from "../../common/redux/classes/User"

/**
 * @param {{user: User}} props
 */
const WindsorCoin = (props) => {
  const { user } = props

  const [coins, setCoins] = React.useState(0)

  React.useEffect(() => {
    if (user && user.packages) {
      let c = 0
      user.packages.forEach((p) => {
        c += p.amount
      })
      setCoins(c * 5)
    }
  }, [props])

  const navigate = useNavigate()

  return user.docid === ADMINDOCID ? (
    <></>
  ) : (
    <div
      className="flex justify-center items-center p-4 gap-2 md:text-xl text-sm cursor-pointer"
      onClick={() => navigate("/windsor-withdrawal")}
    >
      <div className="text-yellow-600 text-center">You won! </div>
      <img
        src="https://windsorcryptocoin.com/img/bg-img/bg-2.png"
        className="w-14 h-14 animate-bounce"
      />
      <div className="text-yellow-600 text-center">
        &times; {coins} WINDSOR coins
      </div>
    </div>
  )
}

export default WindsorCoin
