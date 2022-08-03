import React from "react"

const Welcome = (props) => {
  return (
    <div
      tabIndex={0}
      onLoad={props.onLoad}
      id="Welcome"
      className="h-screen text-center text-2xl"
    >
      <div className="flex justify-center items-center h-full">Welcome</div>
    </div>
  )
}

export default Welcome
