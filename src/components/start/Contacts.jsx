import React from "react"
import { MENU } from "./Home"

const Contacts = (props) => {
  return (
    <div
      id="Contacts"
      className="h-screen text-center text-2xl bg-[url(https://windsorcryptocoin.com/img/bg-img/bg-1.jpg)]"
    >
      <div className="w-full h-full bg-gradient-to-b from-black/70 to-black text-gray-300">
        <div className="grid md:grid-cols-2 w-full h-full items-center">
          <div className="flex justify-center items-center w-full h-full p-4">
            <div className="text-base space-y-4 md:text-left text-center p-4">
              <img
                src="https://windsorcryptocoin.com/img/core-img/logo2.png"
                alt="windsor logo 2"
              />
              <h6>Token Address: </h6>
              <div className="text-sm">
                0x02D57f6c8a307CF8750D9eDA4a45b2F66c78655f
              </div>
              <p>
                27 JALAN PAHLAWAN 1/3 BANDAR MAKOTA CHERAS 43200 SELANGOR D.E,
                MALAYSIA
                <br />
                CONTACT: +60 11-1658-2663
                <br />
                Email Id: team@windsorcryptocoin.com
                <br />
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-full p-4">
            <div className="flex flex-col text-base space-y-4 text-left">
              <h4>Quick Links</h4>
              {MENU.map((m) => (
                <a
                  key={m}
                  className="pl-4 cursor-pointer hover:text-white"
                  href={`#${m}`}
                >
                  {m}
                </a>
              ))}
              <a href="/login">
                <div className="px-4 py-2 rounded bg-gradient-to-br from-blue-600 to-indigo-500 text-slate-900 text-center hover:text-white">
                  Login
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-0 text-cnter text-sm p-2">
          Copyright &copy; WINDSOR All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default Contacts
