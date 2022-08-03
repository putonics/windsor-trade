import React from "react"
import { MENU } from "./Home"

const Menu = (props) => (
  <a href={props.link} onClick={props?.onClick} className="block">
    <div className="hover:text-white p-2 w-fit flex gap-1">
      {props.active ? (
        <div className="border-r-white/90 rounded-full border-r-2 animate-pulse">
          &nbsp;
        </div>
      ) : (
        <div className="border-r-transparent rounded-full border-r-2">
          &nbsp;
        </div>
      )}
      {props.children}
    </div>
  </a>
)

const Header = (props) => {
  const [menu, setMenu] = React.useState(props.menu)

  React.useEffect(() => {
    if (menu !== props.menu) {
      setMenu(props.menu)
    }
  }, [props])
  React.useEffect(() => {
    if (menu !== props.menu) {
      props.onChange(menu)
    }
  }, [menu])

  return (
    <div className="z-50 py-4 text-center text-white/80 bg-black/25 hover:bg-black/40 cursor-pointer backdrop-blur-xl fixed top-0 right-0 left-0 border-b-2 border-b-white/10">
      <div className="flex justify-center gap-1 md:gap-20">
        {MENU.map((m) => (
          <Menu
            key={m}
            onClick={() => setMenu(m)}
            active={m === menu}
            link={`#${m}`}
          >
            {m}
          </Menu>
        ))}
        <Menu link="/login">Signin</Menu>
      </div>
    </div>
  )
}

export default Header
