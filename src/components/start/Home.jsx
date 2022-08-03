import React from "react"
import About from "./About"
import Header from "./Header"
import Plans from "./Plans"
import Team from "./Team"
import Welcome from "./Welcome"

function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const Home = (props) => {
  const [menu, setMenu] = React.useState("Welcome")

  const handleVisibility = (e, label) => {
    if (isInViewport(e.currentTarget)) {
      setMenu(label)
    }
  }

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-slate-900 relative text-white">
      <Header />
      <div className="relative">
        <Welcome onLoad={(e) => handleVisibility(e, "Welcome")} />
        <About onLoad={(e) => handleVisibility(e, "About")} />
        <Plans onLoad={(e) => handleVisibility(e, "Plans")} />
        <Team onLoad={(e) => handleVisibility(e, "Team")} />
      </div>
    </div>
  )
}

export default Home
