import React from "react"
import { MENU } from "./Home"
import "./animation.css"

const Menu = (props) => {
  const { previous, next, right } = props?.menu

  const [hidden, setHidden] = React.useState(false)

  const [style, setStyle] = React.useState({})

  React.useEffect(() => {
    if (previous === props.children) {
      setHidden(false)
      setStyle({
        animation: right
          ? "closeToRight 600ms linear"
          : "closeToLeft 600ms linear",
      })
      return
    }
    if (next === props.children) {
      setHidden(false)
      setStyle({
        animation: right
          ? "openFromRight 600ms linear"
          : "openFromLeft 600ms linear",
      })
      return
    }
    setHidden(true)
    setStyle({})
  }, [props])

  return (
    <a href={props.link} onClick={props?.onClick} className="block">
      <div
        className="hover:text-white p-2 w-fit flex gap-1 text-sm md:text-base"
        style={
          next === props.children
            ? { animation: "textGlow 600ms ease-in-out" }
            : {}
        }
      >
        {hidden ? (
          <div className="border-r-transparent rounded-full border-r-2">
            &nbsp;
          </div>
        ) : (
          <div
            onAnimationEnd={(e) => setHidden(previous === props.children)}
            className="border-r-white/90 rounded-full border-r-2"
            style={style}
          >
            &nbsp;
          </div>
        )}
        {props.children}
      </div>
    </a>
  )
}

const Header = (props) => {
  const [menu, setMenu] = React.useState({
    previous: props.menu,
    next: props.menu,
    right: true,
  })

  const setMenuEffect = (m) => {
    if (menu.next !== m) {
      setMenu({
        previous: menu.next,
        next: m,
        right:
          MENU.findIndex((x) => m === x) >=
          MENU.findIndex((x) => menu.next === x),
      })
    }
  }

  React.useEffect(() => setMenuEffect(props.menu), [props])
  React.useEffect(() => {
    // console.log(JSON.stringify(menu))
    if (menu.next !== props.menu) {
      props.onChange(menu.next)
    }
  }, [menu])

  return (
    <div className="z-50 md:py-4 py-2 text-center text-white/80 bg-black/25 hover:bg-black/40 cursor-pointer backdrop-blur-xl fixed top-0 right-0 left-0 border-b-2 border-b-white/10">
      <div className="flex justify-center gap-1 md:gap-20">
        {MENU.map((m) => (
          <Menu
            key={m}
            onClick={() => setMenuEffect(m)}
            menu={menu}
            link={`#${m}`}
          >
            {m}
          </Menu>
        ))}

        <div className="text-blue-500">
          <Menu link="/login" menu={menu}>
            Login
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
