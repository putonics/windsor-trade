import React from "react"
import { useNavigate } from "react-router-dom"
import assets from "../../assets"
import User, { ADMINDOCID } from "../../common/redux/classes/User"
import style from "../../common/style"

/**
 * @param {{user: User}} props
 */
const WalletCard = (props) => {
  const { user } = props

  const [roi, setRoi] = React.useState(0)

  React.useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/GMT")
      .then((res) => res.json())
      .then((dt) => {
        const today = new Date(dt.datetime)
        // const tym = today.getFullYear() * 12 + today.getMonth() //! calculating total months
        if (user && user.packages && user.packages.length) {
          let sum = 0
          user.packages.forEach((p) => {
            const pdt = new Date(p.date)
            // const pym = pdt.getFullYear() * 12 + pdt.getMonth() //! calculating total month for the package
            // const diff = tym - pym //! calculating months for the package
            const diff =
              ((today.getTime() - pdt.getTime()) / (1000 * 3600 * 24 * 30)) | 0 //? assuming month as 30 days
            sum += p.amount * 0.04 * diff
          })
          setRoi(sum)
        }
      })
      .catch((err) => {})
  }, [props])

  const navigate = useNavigate()

  return user.docid === ADMINDOCID ? (
    <></>
  ) : (
    <div
      className={style("p-4 flex gap-x-2 items-center cursor-pointer").card()}
      onClick={() => navigate("/withdrawal")}
    >
      <img src={assets.wallet} className="w-24 h-24" />
      <div className="gap-y-1">
        <table>
          <tbody>
            <tr>
              <td className="text-slate-500 text-xs">Wallet balance:&nbsp;</td>
              <td className="text-slate-900 font-extrabold text-left text-ellipsis">
                <div className="w-28 overflow-clip text-ellipsis">
                  $
                  {roi +
                    user.income.totalReferralIncome +
                    user.income.totalLevelIncome +
                    user.income.totalLdbIncome +
                    user.income.totalWorldClubIncome -
                    user.totalWithdrawal}
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500 text-xs">R.O.I:&nbsp;</td>
              <td className="text-slate-900 font-extrabold text-left">
                <div className="w-28 overflow-clip text-ellipsis">${roi}</div>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500 text-xs">Total income:&nbsp;</td>
              <td className="text-green-700 font-semibold  text-left">
                <div className="w-28 overflow-clip text-ellipsis">
                  $
                  {user.income.totalReferralIncome +
                    user.income.totalLevelIncome +
                    user.income.totalLdbIncome +
                    user.income.totalWorldClubIncome}
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-slate-500 text-xs">
                Total withdrawal:&nbsp;
              </td>
              <td className="text-red-800 text-left">
                <div className="w-28 overflow-clip text-ellipsis">
                  ${user.totalWithdrawal}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WalletCard
