import React from "react"
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
    active: login.info.active || false,
  })

  React.useEffect(() => setError(""), [state])

  const confirm = useConfirm()
  const otpConfirm = useOTPConfirm()
  const busyPage = useBusyPage()
  const snackbar = useSnackbar()
  React.useEffect(() => {
    busyPage.set(busy)
  }, [busy])

  const onSubmitByUser = async () => {
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
  const onSubmitByAdmin = async () => {
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
  }

  const setActive = async (active) => {
    setBusy(true)
    confirm.open(
      <div className="p-2">
        <div className="text-orange-600 text-center animate-pulse duration-75">
          <span className="font-extrabold">Warning!</span> This will
          {active ? "unblock" : "block"} the user.
        </div>
        <div className="text-slate-900 text-xl text-center font-extrabold">
          Are you sure?
        </div>
      </div>,
      async () => {
        const res2 = await api(
          active ? "/user/unblock" : "/user/block",
          new User(state)
        )
        if (res2 && res2.docid === state.docid) {
          setState({ ...state, active })
          login.setInfo(new User(res2))
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
  }

  return (
    <>
      <Form
        onSubmit={
          login.info.loginBy === "ADMIN" ? onSubmitByAdmin : onSubmitByUser
        }
        className={state.active ? "" : "opacity-30"}
      >
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
                disabled={busy || !state.active}
                label="Password"
                type="password"
                value={state.password}
                onChange={(password) => setState({ ...state, password })}
              />
              <TextBox
                required
                disabled={
                  busy || !state.active || login.info.loginBy !== "ADMIN"
                }
                label="Name"
                type="text"
                value={state.name}
                onChange={(name) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({ ...state, name })
                  }
                }}
              />
              <TextBox
                required
                disabled={
                  busy || !state.active || login.info.loginBy !== "ADMIN"
                }
                label="Email"
                type="email"
                value={state.email}
                onChange={(email) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({ ...state, email })
                  }
                }}
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
                disabled={
                  busy || !state.active || login.info.loginBy !== "ADMIN"
                }
                label="Live in"
                type="text"
                value={state.countrycode}
                options={CountryCodes.map((c) => ({
                  label: c.name,
                  value: c.code,
                }))}
                onChange={(countrycode) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({ ...state, countrycode })
                  }
                }}
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
                disabled={
                  busy || !state.active || login.info.loginBy !== "ADMIN"
                }
                label="Mobile no."
                type="text"
                value={state.mobile}
                onChange={(mobile) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({ ...state, mobile })
                  }
                }}
              />
              <TextBox
                required
                disabled={
                  busy ||
                  !state.active ||
                  (Boolean(login?.info?.idproof?.name) &&
                    login.info.loginBy !== "ADMIN")
                }
                label="Id proof name"
                type="text"
                value={state.idproof.name}
                onChange={(name) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({ ...state, idproof: { ...state.idproof, name } })
                  }
                }}
              />
              <TextBox
                required
                disabled={
                  busy ||
                  !state.active ||
                  (Boolean(login?.info?.idproof?.number) &&
                    login.info.loginBy !== "ADMIN")
                }
                label="Id proof number"
                type="text"
                value={state.idproof.number}
                onChange={(number) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({
                      ...state,
                      idproof: { ...state.idproof, number },
                    })
                  }
                }}
              />
              <TextBox
                required
                disabled={
                  busy ||
                  !state.active ||
                  (Boolean(login?.info?.idproof?.issuingAuthority) &&
                    login.info.loginBy !== "ADMIN")
                }
                label="Id proof issuing AUTHORITY"
                type="text"
                value={state.idproof.issuingAuthority}
                onChange={(issuingAuthority) => {
                  if (!busy && login.info.loginBy === "ADMIN") {
                    setState({
                      ...state,
                      idproof: { ...state.idproof, issuingAuthority },
                    })
                  }
                }}
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
                disabled={busy || !state.active}
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
                disabled={busy || !state.active}
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
                disabled={busy || !state.active}
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
                disabled={busy || !state.active}
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
                disabled={busy || !state.active}
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
              <div className="flex justify-center gap-4">
                <Button
                  disabled={busy || !state.active}
                  color="indigo"
                  type="submit"
                  icon="fa fa-save"
                >
                  Save changes
                </Button>
                {login.info.loginBy == "ADMIN" ? (
                  state.active ? (
                    <Button
                      disabled={busy}
                      color="red"
                      type="button"
                      icon="fa fa-lock"
                      onClick={() => setActive(false)}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      disabled={busy}
                      color="blue"
                      type="button"
                      icon="fa fa-unlock"
                      onClick={() => setActive(true)}
                    >
                      Unblock
                    </Button>
                  )
                ) : (
                  <></>
                )}
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
