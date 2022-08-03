import React from "react"

const Plans = (props) => {
  return (
    <div
      tabIndex={0}
      onFocus={props.onActive}
      onMouseOver={props.onActive}
      onPointerEnter={props.onActive}
      id="Plans"
      className="h-screen text-center text-2xl"
    >
      <div className="flex justify-center items-center h-full">Plans</div>
    </div>
  )
}

export default Plans
