import React from "react"
import Button from "../../common/components/Button"
import Form from "../../common/components/Form"
import TextBox from "../../common/components/TextBox"
import { sendOtp } from "../../common/redux/api/Email"
import { api } from "../../common/redux/classes/CryptoServer"
import User from "../../common/redux/classes/User"
import Withdrawal from "../../common/redux/classes/Withdrawal"
import { useBusyPage } from "../../common/router/BusyPage"
import { useConfirm } from "../../common/router/Confirm"
import { useLogin } from "../../common/router/Login"
import { useOTPConfirm } from "../../common/router/OTPConfirm"
import { useSnackbar } from "../../common/router/Snackbar"
import style from "../../common/style"

const WithdrawalForm = (props) => {
  const [amount, setAmount] = React.useState(0)
  const [balance, setBalance] = React.useState(0)

  const login = useLogin()

  React.useEffect(() => {
    if (login.info) {
      fetch("https://worldtimeapi.org/api/timezone/GMT")
        .then((res) => res.json())
        .then((dt) => {
          const user = new User(login.info)
          const today = new Date(dt.datetime)
          // const tym = today.getFullYear() * 12 + today.getMonth() //! calculating total months
          if (user && user.packages && user.packages.length) {
            let sum = 0
            user.packages.forEach((p) => {
              const pdt = new Date(p.date)
              // const pym = pdt.getFullYear() * 12 + pdt.getMonth() //! calculating total month for the package
              // const diff = tym - pym //! calculating months for the package
              const diff =
                ((today.getTime() - pdt.getTime()) / (1000 * 3600 * 24 * 30)) |
                0 //? assuming month as 30 days
              sum += p.amount * 0.04 * diff
            })
            setBalance(
              sum +
                user.income.totalReferralIncome +
                user.income.totalLevelIncome +
                user.income.totalLdbIncome +
                user.income.totalWorldClubIncome -
                user.totalWithdrawal
            )
          }
        })
        .catch((err) => {})
    }
  }, [login])

  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")
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
      <div className="p-2">
        <div className="text-orange-600 text-center animate-pulse duration-75">
          <span className="font-extrabold">Warning!</span> ${amount} will be
          deducted from your wallet.
        </div>
        <div className="text-slate-900 text-xl text-center font-extrabold">
          Are you sure?
        </div>
      </div>,
      async () => {
        // alert('ok')
        const res = await sendOtp(login.info)
        if (res) {
          otpConfirm.open(
            res.otp,
            "Please verify the OTP",
            <div className="p-2">
              <div className="text-blue-800 text-center">
                An OTP with request-id{" "}
                <span className="text-orange-600 font-extrabold">
                  {res.requestid}
                </span>{" "}
                has been sent to {res.email}.
              </div>
            </div>,
            async () => {
              const withdrawal = new Withdrawal()
              withdrawal.set(login.info)
              withdrawal.amount = amount
              console.log(withdrawal.json())
              const res2 = await api("/user/withdraw", withdrawal.json())
              if (res2 && res2.docid === withdrawal.docid) {
                // withdrawal.set(res2)
                snackbar.showSuccess("Request sent.")
                setAmount(0)
                setError(false)
                setBusy(false)
              } else {
                snackbar.showError("Request failed.")
                setBusy(false)
              }
            },
            () => {
              snackbar.showError("Request failed.")
              setBusy(false)
            }
          )
        } else {
          setError("Failed to send OTP! Please try later.")
          setBusy(false)
        }
      },
      () => {
        setBusy(false)
      }
    )
  }

  return (
    <div className={style("p-6").card()}>
      <div className="pb-1 text-slate-700 text-lg">
        Your Wallet balance is{" "}
        <span className="font-extrabold text-slate-900">${balance}</span>
      </div>
      <div className="pb-4 text-slate-700 text-xs italic">
        Minimum withdrawal must be $10
      </div>
      <Form onSubmit={onSubmit}>
        <div className={style("grid grid-cols-1 md:grid-cols-2 gap-4")}>
          <TextBox
            disabled={!balance || balance < 10}
            label="Amount"
            type="number"
            value={amount}
            max={balance}
            min={10}
            onChange={(amount) => setAmount(+amount)}
          />
          <div className="flex justify-center items-center">
            <Button
              color="blue"
              type="submit"
              disabled={
                !balance ||
                !amount ||
                amount < 10 ||
                balance < 10 ||
                balance < amount
              }
            >
              Request Withdrawal
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default WithdrawalForm
