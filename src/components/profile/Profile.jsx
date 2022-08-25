import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../common/components/Button"
import Form from "../../common/components/Form"
import Select from "../../common/components/Select"
import TextBox from "../../common/components/TextBox"
import CountryCodes from "../../common/constants/CountryCodes"
import { sendOtp } from "../../common/redux/api/Email"
import { api } from "../../common/redux/classes/CryptoServer"
import User from "../../common/redux/classes/User"
import { useBusyPage } from "../../common/router/BusyPage"
import { useConfirm } from "../../common/router/Confirm"
import { useLogin } from "../../common/router/Login"
import { useOTPConfirm } from "../../common/router/OTPConfirm"
import style from "../../common/style"
import QRCode from "react-qr-code"
import { useSnackbar } from "../../common/router/Snackbar"

const Profile = (props) => {
  const login = useLogin()

  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")

  const [state, setState] = React.useState({
    appname: login.info.appname || "",
    subscriberdocid: login.info.subscriberdocid || "",
    refdocid: login.info.refdocid || "",
    docid: login.info.docid || "",
    password: login.info.password || "",
    name: login.info.name || "",
    email: login.info.email || "",
    countrycode: login.info.countrycode || "1",
    mobile: login.info.mobile || "",
    idproof: login.info.idproof || {
      name: "",
      number: "",
      issuingAuthority: "",
    },
    cryptoWalletAddress: login.info.cryptoWalletAddress || "",
    bankAccount: login.info.bankAccount || {
      acName: "",
      acNo: "",
      ifsc: "",
      bank: "",
      branch: "",
    },
  })

  React.useEffect(() => setError(""), [state])

  const navigate = useNavigate()

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
          <span className="font-extrabold">Warning!</span> This will change your
          personal data.
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
              const res2 = await api("/user/modify", new User(state))
              if (res2 && res2.docid === state.docid) {
                snackbar.showSuccess("Successfully updated.")
                setError(false)
                setBusy(false)
              }
            },
            () => {
              snackbar.showError("Failed to update.")
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
    <>
      <Form onSubmit={onSubmit}>
        <div className={style().card()}>
          <div
            className={style(
              "md:gap-6 gap-0 mx-2 grid md:grid-cols-2 grid-cols-1"
            )}
          >
            <div className="p-6">
              <div
                className={style("text-xl font-extrabold text-slate-900 mb-6")}
              >
                Profile
              </div>
              <TextBox
                required
                disabled={true}
                label="Referer id"
                type="text"
                value={state.refdocid}
              />
              <TextBox
                required
                disabled={true}
                label="User id"
                type="text"
                value={state.docid}
              />
              <TextBox
                required
                disabled={busy}
                label="Password"
                type="password"
                value={state.password}
                onChange={(password) => setState({ ...state, password })}
              />
              <TextBox
                required
                disabled={busy}
                label="Name"
                type="text"
                value={state.name}
                onChange={(name) => setState({ ...state, name })}
              />
              <TextBox
                required
                disabled={busy}
                label="Email"
                type="email"
                value={state.email}
                onChange={(email) => setState({ ...state, email })}
              />
              <TextBox
                required
                disabled={busy}
                label="Crypto wallet address"
                type="text"
                value={state.cryptoWalletAddress}
                onChange={(cryptoWalletAddress) =>
                  setState({ ...state, cryptoWalletAddress })
                }
              />
            </div>
            <div className="p-6">
              <Select
                required
                disabled={busy}
                label="Live in"
                type="text"
                value={state.countrycode}
                options={CountryCodes.map((c) => ({
                  label: c.name,
                  value: c.code,
                }))}
                onChange={(countrycode) => setState({ ...state, countrycode })}
              />
              <div className="p-1 flex flex-row justify-center items-center">
                <img
                  className="w-10 h-10 border border-solid border-slate-200"
                  src={`https://countryflagsapi.com/svg/${
                    CountryCodes.find((c) => c.code === state.countrycode).name
                  }`}
                />
                <div className="p-1 flex flex-row justify-center items-center">
                  <div className="font-semibold text-slate-500">ISD: </div>
                  <div className="font-semibold text-slate-800">
                    +{state.countrycode}
                  </div>
                </div>
              </div>
              <TextBox
                required
                disabled={busy}
                label="Mobile no."
                type="text"
                value={state.mobile}
                onChange={(mobile) => setState({ ...state, mobile })}
              />
              <TextBox
                required
                disabled={busy || login?.info?.idproof?.name}
                label="Id proof name"
                type="text"
                value={state.idproof.name}
                onChange={(name) =>
                  setState({ ...state, idproof: { ...state.idproof, name } })
                }
              />
              <TextBox
                required
                disabled={busy || login?.info?.idproof?.number}
                label="Id proof number"
                type="text"
                value={state.idproof.number}
                onChange={(number) =>
                  setState({ ...state, idproof: { ...state.idproof, number } })
                }
              />
              <TextBox
                required
                disabled={busy || login?.info?.idproof?.issuingAuthority}
                label="Id proof issuing AUTHORITY"
                type="text"
                value={state.idproof.issuingAuthority}
                onChange={(issuingAuthority) =>
                  setState({
                    ...state,
                    idproof: { ...state.idproof, issuingAuthority },
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className={style("mt-2").card()}>
          <div
            className={style(
              "md:gap-6 gap-0 mx-2 grid md:grid-cols-2 grid-cols-1"
            )}
          >
            <div className="p-6">
              <div
                className={style("text-xl font-extrabold text-slate-900 mb-6")}
              >
                Bank A/C information
              </div>
              <TextBox
                required
                disabled={busy}
                label="Account Name"
                type="text"
                value={state.bankAccount.acName || state.name}
                onChange={(acName) =>
                  setState({
                    ...state,
                    bankAccount: { ...state.bankAccount, acName },
                  })
                }
              />
              <TextBox
                required
                disabled={busy}
                label="Account no"
                type="text"
                value={state.bankAccount.acNo}
                onChange={(acNo) =>
                  setState({
                    ...state,
                    bankAccount: { ...state.bankAccount, acNo },
                  })
                }
              />
              <TextBox
                required
                disabled={busy}
                label="IFSC"
                type="text"
                value={state.bankAccount.ifsc}
                onChange={(ifsc) =>
                  setState({
                    ...state,
                    bankAccount: { ...state.bankAccount, ifsc },
                  })
                }
              />
            </div>
            <div className="p-6">
              <TextBox
                required
                disabled={busy}
                label="Bank name"
                type="text"
                value={state.bankAccount.bank}
                onChange={(bank) =>
                  setState({
                    ...state,
                    bankAccount: { ...state.bankAccount, bank },
                  })
                }
              />
              <TextBox
                required
                disabled={busy}
                label="Branch name"
                type="text"
                value={state.bankAccount.branch}
                onChange={(branch) =>
                  setState({
                    ...state,
                    bankAccount: { ...state.bankAccount, branch },
                  })
                }
              />
              <div className="text-red-600 text-center py-4 my-4">{error}</div>
              <div className="flex justify-center">
                <Button
                  disabled={busy}
                  color="indigo"
                  type="submit"
                  icon="fa fa-save"
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <div className="flex flex-col justify-center items-center">
        <div className={style("mt-6 p-2 w-fit").card()}>
          <QRCode
            value={
              login?.info?.cryptoWalletAddress ||
              "NO-CRYPTO-WALLET-ADDRESS-GIVEN"
            }
          />
        </div>
        <div className="mt-2 mb-6 text-xs">
          {login?.info?.cryptoWalletAddress || "NO-CRYPTO-WALLET-ADDRESS-GIVEN"}
        </div>
      </div>
    </>
  )
}

export default Profile
