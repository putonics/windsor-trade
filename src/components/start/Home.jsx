import React from "react"
import About from "./About"
import Header from "./Header"
import Plans from "./Plans"
import Team from "./Team"
import Welcome from "./Welcome"

const Home = (props) => {
  const [menu, setMenu] = React.useState("Welcome")

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-slate-900 relative text-white">
      <Header menu={menu} onChange={setMenu} />
      <div className="relative">
        <Welcome onActive={(e) => setMenu("Welcome")} />
        <About onActive={(e) => setMenu("About")} />
        <Plans onActive={(e) => setMenu("Plans")} />
        <Team onActive={(e) => setMenu("Team")} />
      </div>
    </div>
  )
}

export default Home
