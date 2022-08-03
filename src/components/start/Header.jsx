import React from "react"

const Menu = (props) => (
  <div onClick={props?.onClick} className="block">
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
  </div>
)

const MENU = ["Home", "About", "Plans", "Team", "Signin"]

const Header = (props) => {
  const [menu, setMenu] = React.useState()

  return (
    <div className="text-center text-white/80 bg-black/25 hover:bg-black/40 cursor-pointer backdrop-blur-xl fixed top-0 right-0 left-0 border-b-2 border-b-white/10">
      <div className="flex justify-center gap-1 md:gap-10">
        {MENU.map((m) => (
          <Menu key={m} onClick={() => setMenu(m)} active={m === menu}>
            {m}
          </Menu>
        ))}
      </div>
    </div>
  )
}

export default Header
