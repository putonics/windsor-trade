import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import assets from "../../assets"
import LeadershipBounus from "../privacy-policies/LeadershipBounus"
import Rewards from "../privacy-policies/Rewards"
import WorldClub from "../privacy-policies/WorldClub"

const Package = (props) => (
  <div className="text-center bg-gray-200 p-4 rounded-2xl cursor-pointer drop-shadow-2xl text-slate-900 grid md:grid-cols-1 grid-cols-2">
    <img src={props.img} className="mb-4" />
    <div className="bg-gray-200 p-10  rounded-2xl drop-shadow-2xl text-slate-900">
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

        <div className="">
          <div>Packages</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Package amount={500} img={assets.moneybag64} />
          </div>
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
