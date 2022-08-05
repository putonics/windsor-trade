import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import assets from "../../assets"

const Package = (props) => (
  <div className="gap-4 group flex md:flex-col justify-center items-center bg-black/25 p-4 rounded-2xl cursor-pointer drop-shadow-2xl">
    <img src={props.img} className="group-hover:animate-bounce" />
    <div className="group-hover:font-extrabold p-10 rounded-2xl drop-shadow-md group-hover:drop-shadow-2xl bg-gradient-to-br from-indigo-600 to-pink-600 text-white">
      ${props.amount}
    </div>
  </div>
)

const Plans = (props) => {
  return (
    <div id="Plans" className="h-screen text-2xl p-10">
      <div className="flex flex-col justify-center w-full items-center">
        <div className="text-base font-extrabold text-slate-400">
          WE ARE FEATURED IN
        </div>
        <div className="h-10 mt-4">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            width={100}
          >
            <img src={assets.clogo1} />
            <img src={assets.clogo2} />
            <img src={assets.clogo3} />
            <img src={assets.clogo4} />
            <img src={assets.clogo5} />
          </Carousel>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10 gap-4 mt-4">
          <Package amount={500} img={assets.kingCrown} />
          <Package amount={250} img={assets.queenCrown} />
          <Package amount={100} img={assets.moneybag64} />
          <Package amount={15} img={assets.money64} />
        </div>

        {/* <PackageItem amount={500} />
        <PackageItem amount={250} />
        <PackageItem amount={100} />
      <PackageItem amount={15} /> */}

        {/* <LeadershipBounus /> */}
        {/* <WorldClub /> */}
        {/* <Rewards /> */}
        {/* <div className="grid md:grid-cols-2 w-full h-full">
        <div className="flex justify-center items-center h-full">Plans1</div>
        </div> */}
      </div>
    </div>
  )
}

export default Plans
