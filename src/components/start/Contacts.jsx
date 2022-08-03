import React from "react"

const Contacts = (props) => {
  return (
    <div
      tabIndex={0}
      onLoad={props.onLoad}
      id="Contacts"
      className="h-screen text-center text-2xl"
    >
      <div className="flex justify-center items-center h-full">Contacts</div>
    </div>
  )
}

export default Contacts
