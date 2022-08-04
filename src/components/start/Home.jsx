import React from "react"
import About from "./About"
import Header from "./Header"
import Plans from "./Plans"
import Team from "./Team"
import Welcome from "./Welcome"

export const MENU = ["Welcome", "About", "Plans", "Team"]

const Home = (props) => {
  const [menu, setMenu] = React.useState("")

  return (
    <div
      tabIndex={0}
      onScroll={(e) =>
        setMenu(
          MENU[Math.round(e.currentTarget.scrollTop / window.screen.height)]
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
        <Team />
      </div>
    </div>
  )
}

export default Home
