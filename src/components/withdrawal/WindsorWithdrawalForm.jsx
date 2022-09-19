import React from "react"
import Button from "../../common/components/Button"
import Form from "../../common/components/Form"
import TextBox from "../../common/components/TextBox"
import User from "../../common/redux/classes/User"
import { useLogin } from "../../common/router/Login"
import style from "../../common/style"

const WindsorWithdrawalForm = (props) => {
  const [coins, setCoins] = React.useState(0)
  const [user, setUser] = React.useState(new User())
  const login = useLogin()

  React.useEffect(() => {
    if (login.info) {
      const user = new User(login.info)
      setUser(user)
      if (user.packages) {
        let c = 0
        user.packages.forEach((p) => {
          c += p.amount
        })
        setCoins(c * 5)
      }
    }
  }, [props])

  const onSubmit = () => {}

  return (
    <div className={style("p-6").card()}>
      <div className="pb-1 text-slate-700 text-lg">
        You have earned{" "}
        <span className="font-extrabold text-slate-900">
          Total {coins} WINDSOR
        </span>
      </div>
      {coins > 0 ? (
        user.packages.map((p) => {
          const t1 = new Date(p.date)
          t1.setFullYear(t1.getFullYear() + 1)
          const d = Math.ceil(
            (t1.getTime() - new Date().getTime()) / (24 * 3600000)
          )
          return (
            <div key={"package-" + p.index} className="py-2">
              <Form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextBox
                    disabled
                    label="WINDSOR Coins"
                    type="number"
                    value={p.amount * 5}
                  />
                  <div className="flex justify-center items-center">
                    <Button color="blue" type="submit" disabled>
                      {d > 0 ? `Make withrawal after ${d} days` : "Withdraw"}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}

export default WindsorWithdrawalForm
