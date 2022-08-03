import React from "react"

const About = (props) => {
  return (
    <div
      tabIndex={0}
      onFocus={props.onActive}
      onMouseOver={props.onActive}
      onPointerEnter={props.onActive}
      id="About"
      className="h-screen text-center text-2xl"
    >
      <div className="flex justify-center items-center h-full">About</div>
    </div>
  )
}

export default About
