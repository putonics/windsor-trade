import React from "react"
import Lottie from "react-lottie"
import assets from "../../assets"
import animationData from "../../assets/lottie-animations/103226-crypto-phone.json"

const Welcome = (props) => {
  return (
    <div id="Welcome" className="h-screen text-center text-2xl pt-12 md:pt-0">
      <div className="grid md:grid-cols-2 w-full h-full">
        <div className="p-4 gap-4 flex flex-col justify-center items-center h-full">
          <div>
            <img src="https://windsortrad.com/logo.png" />
          </div>
          <div className="text-3xl font-extrabold">Windsor Trade</div>
          <div className="text-gray-400">
            The fastest growing network for Crypto investors. Guarantee Double
            Of Investment.
          </div>
          <div className="text-base text-gray-200">
            Invest and earn recurring revenue per month
            <div className="grid grid-cols-2">
              <ul className="text-left list-disc pl-10 text-sm">
                <li>Direct income</li>
                <li>Level income</li>
              </ul>
              <ul className="text-left list-disc pl-10 text-sm">
                <li>Lesdership bonus</li>
                <li>Rewards</li>
              </ul>
            </div>
            <ul className="text-left list-disc pl-10 text-sm">
              <li>World club income</li>
            </ul>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center items-center h-full p-10">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid meet",
              },
            }}
            height="auto"
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}

export default Welcome
