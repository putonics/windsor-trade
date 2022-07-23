import React from "react"
import assets from "../../assets"
import User, { ADMINDOCID } from "../../common/redux/classes/User"
import style from "../../common/style"

/**
 * @param {{user: User}} props
 */
const IncomeCard = (props) => {
  const { user } = props
  return (
    <div className={style("p-4 flex gap-x-2 items-center").card()}>
      <img src={assets.profit} className="w-24 h-24" />
      <div className="gap-y-1">
        {user.docid === ADMINDOCID ? (
          <>
            <div className="flex flex-col justify-center items-center">
              <div className="text-slate-900 font-extrabold text-2xl">
                <div className="w-28 overflow-clip text-ellipsis">
                  ${user.totalTurnover}
                </div>
              </div>
              <div className="text-slate-500">Total turnover</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-green-700 font-semibold text-xl">
                <div className="w-28 overflow-clip text-ellipsis">
                  $
                  {user.monthlyTurnover[user.monthlyTurnover.length - 1].amount}
                </div>
              </div>
              <div className="text-slate-500">Tournover last month</div>
            </div>
          </>
        ) : (
          <table>
            <tbody>
              <tr>
                <td className="text-slate-500 text-xs">
                  Referral income:&nbsp;
                </td>
                <td className="text-slate-900 font-extrabold text-left">
                  <div className="w-28 overflow-clip text-ellipsis">
                    ${user.income.totalReferralIncome}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-slate-500 text-xs">Level income:&nbsp;</td>
                <td className="text-slate-900 font-extrabold text-left">
                  <div className="w-28 overflow-clip text-ellipsis">
                    ${user.income.totalLevelIncome}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-slate-500 text-xs">
                  Leadership bonus:&nbsp;
                </td>
                <td className="text-green-700 font-extrabold text-left">
                  <div className="w-28 overflow-clip text-ellipsis">
                    ${user.income.totalLdbIncome}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-slate-500 text-xs">World club:&nbsp;</td>
                <td className="text-slate-900 font-extrabold text-left">
                  <div className="w-28 overflow-clip text-ellipsis">
                    ${user.income.totalWorldClubIncome}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default IncomeCard
