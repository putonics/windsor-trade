import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../common/components/Button"
import Form from "../common/components/Form"
import TextBox from "../common/components/TextBox"
import { sendOtp } from "../common/redux/api/Email"
import { api } from "../common/redux/classes/CryptoServer"
import User from "../common/redux/classes/User"
import { useBusyPage } from "../common/router/BusyPage"
import { useConfirm } from "../common/router/Confirm"
import { useOTPConfirm } from "../common/router/OTPConfirm"
import { useSnackbar } from "../common/router/Snackbar"
import style from "../common/style"

const ForgotPassword = (props) => {
  const [state, setState] = React.useState({ userid: "", email: "" })

  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")

  const [success, setSuccess] = React.useState(false)

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
        <div className="text-red-600 font-extrabold animate-bounce py-2 text-center">
          Your present password will be changed and you will not be able to
          login with this password again!
        </div>
        <div className="text-slate-900 text-xl text-center font-extrabold">
          Are you sure?
        </div>
      </div>,
      async () => {
        // alert('ok')
        const user = new User()
        user.email = state.email
        user.docid = state.userid
        const res = await sendOtp(user)
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
              const res2 = await api("/user/reset-password", user)
              if (res2 && res2.docid === state.docid) {
                setSuccess(true)
                snackbar.showSuccess(
                  "Password reset success fully. Please check your email inbox."
                )
                setError(false)
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

  const navigate = useNavigate()
  const [counter, setCounter] = React.useState(0)
  React.useEffect(() => {
    setCounter(0)
    const x = setInterval(() => {
      setCounter(counter + 1)
      if (counter === 4) {
        clearInterval(x)
        navigate("/")
      }
    }, 1000)
  }, [success])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900">
      <div className={style("p-6").card()}>
        {success ? (
          <div className="text-2xl text-slate-900 font-extrabold animate-ping">
            {counter + 1}
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <div className={style("flex flex-col gap-4")}>
              <TextBox
                disabled={busy}
                label="User-id"
                type="text"
                value={state.userid}
                onChange={(userid) => setState({ ...state, userid })}
              />
              <TextBox
                disabled={busy}
                label="Email"
                type="email"
                value={state.email}
                onChange={(email) => setState({ ...state, email })}
              />
              <div className={style("flex justify-between items-center")}>
                <div className="flex-1 text-center tracking-wide"></div>
                <Button disabled={busy} color="red" type="submit">
                  Send OTP
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
