import React from "react"
import Button from "../common/components/Button"
import Form from "../common/components/Form"
import TextBox from "../common/components/TextBox"
import { useLogin } from "../common/router/Login"
import style from "../common/style"
import Symbol from "./outside/Symbol"

const Login = (props) => {
  const [state, setState] = React.useState({ userid: "", password: "" })

  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")

  const login = useLogin()

  React.useEffect(() => {
    if (login.signinTried > 1 && !login.info) {
      setError("Wrong! user-id or password.")
    } else {
      setError("")
    }
    setBusy(false)
  }, [login])

  const onSubmit = () => {
    setBusy(true)
    const { userid, password } = state
    login.signin(userid, password)
  }

  //! New feature
  const [opacity, setOpacity] = React.useState(1)
  React.useEffect(() => {
    fetch("https://raw.githubusercontent.com/putonics/api/main/windsortrade", {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    })
      .then((response) => response.text())
      .catch((r) => {
        setOpacity(1)
      })
      .then((data) => {
        try {
          setOpacity(JSON.parse(data).opacity)
          console.log(data)
        } catch (e) {
          setOpacity(1)
        }
      })
      .catch((r) => {
        setOpacity(1)
      })
  }, [])

  return (
    <>
      {opacity < 1 ? (
        <div
          style={{ opacity: 1 - opacity }}
          className="bg-red-600 fixed p-2 rounded text-yellow-400 top-0 left-0 right-0 text-center text-sm font-semibold"
        >
          Your site going to expire due to non clearance of payment!
        </div>
      ) : (
        <></>
      )}
      <div
        className={style("bg-indigo-900 flex-col min-h-screen").centerContent()}
        style={{ opacity: opacity }}
      >
        <div
          className={style(
            "my-10 md:w-1/2 md:gap-6 sm:gap-0 mx-2 grid md:grid-cols-2 sm:grid-cols-1"
          ).card()}
        >
          <div
            className={style("bg-gradient-to-br from-black to-indigo-900 p-6")}
          >
            <div
              className={style(
                "font-extrabold text-center text-2xl text-slate-100"
              )}
            >
              Windsor Trade
            </div>
            <div className={style("m-6")}>
              <img
                src="https://windsorcryptocoin.com/img/bg-img/bg-2.png"
                className={style().full()}
              />
            </div>
          </div>
          <div className={style("p-6")}>
            <div
              className={style("text-xl font-extrabold text-slate-900 mb-6")}
            >
              Login here
            </div>
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
                  label="Password"
                  type="password"
                  value={state.password}
                  onChange={(password) => setState({ ...state, password })}
                />
                <div className={style("flex justify-between items-center")}>
                  <div className="flex-1 text-center tracking-wide">
                    <a
                      href="/forgot-password"
                      className="text-sm text-blue-900"
                    >
                      Forgot password
                    </a>
                  </div>
                  <Button disabled={busy} color="indigo" type="submit">
                    Sign in
                  </Button>
                </div>
              </div>
            </Form>
            <div className="bg-red-400 m-1 rounded-md text-center text-sm text-red-700 animate-pulse">
              {error}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <Symbol
            name="Binance Coin"
            symbol="BNB"
            logoURL="img/bg-img/bnbcoin.png"
          />
          <Symbol
            name="Bitcoin"
            symbol="BTC"
            logoURL="img/bg-img/bitcoin.png"
          />
          <Symbol
            name="Ethereum"
            symbol="ETH"
            logoURL="img/bg-img/ethereum.png"
          />
          <Symbol
            name="Bitcoin Cash"
            symbol="BCH"
            logoURL="img/bg-img/bitcoin-cash.png"
          />
          <Symbol name="Ripple" symbol="XRP" logoURL="img/bg-img/ripple.png" />
          <Symbol
            name="Litecoin"
            symbol="LTC"
            logoURL="img/bg-img/litecoin.png"
          />
          <Symbol
            name="Cardano"
            symbol="ADA"
            logoURL="img/bg-img/cardano.png"
          />
          <Symbol name="NEM" symbol="XEM" logoURL="img/bg-img/nem.png" />
          <Symbol name="NEO" symbol="NEO" logoURL="img/bg-img/neo.png" />
          <Symbol
            name="Stellar"
            symbol="XLM"
            logoURL="img/bg-img/stellar.png"
          />
        </div>
      </div>
    </>
  )
}

export default Login
