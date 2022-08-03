import React from "react"

const Team = (props) => {
  return (
    <div
      tabIndex={0}
      onFocus={props.onActive}
      onMouseOver={props.onActive}
      onPointerEnter={props.onActive}
      id="Team"
      className="h-screen text-center text-2xl"
    >
      <div className="flex justify-center items-center h-full">Team</div>
    </div>
  )
}

export default Team
