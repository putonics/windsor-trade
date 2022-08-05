import React from "react"
import About from "./About"
import Header from "./Header"
import Plans from "./Plans"
import Contacts from "./Contacts"
import Welcome from "./Welcome"

export const MENU = ["Welcome", "About", "Plans", "Contacts"]

const Home = (props) => {
  const [menu, setMenu] = React.useState("")

  return (
    <div
      tabIndex={0}
      onScroll={(e) =>
        setMenu(
          MENU[
            Math.round(e.currentTarget.scrollTop / window.screen.height + 0.1)
          ]
        )
      }
      onLoad={(e) => setMenu("Welcome")}
      className="h-screen overflow-y-auto bg-gradient-to-r from-indigo-900 to-slate-900 relative text-white"
    >
      <Header menu={menu} onChange={setMenu} />
      <div className="relative">
        <Welcome />
        <About />
        <Plans />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
