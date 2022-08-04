import React from "react"
import assets from "../../assets"

const About = (props) => {
  return (
    <div
      id="About"
      className="h-screen text-center text-2xl bg-gradient-to-b from-gray-400 to-slate-300 text-slate-900"
    >
      <div className="flex flex-col gap-4 md:p-10 p-4 justify-center items-center h-full">
        <div className="text-3xl font-extrabold">About</div>
        <div className="text-base text-slate-700 text-justify">
          WINDSOR (
          <a
            className="italic text-sm text-indigo-900"
            href="https://www.google.com/search?q=windsorcryptocoin"
          >
            windsorcryptocoin.com
          </a>
          ) is a token based on BEP20 Smart Contracts which is open source and
          immutable and is executing on Binance Smart Chain. It is an
          experimental digital currency that enables instant payments to anyone,
          anywhere in the world. WINDSOR is completely decentralized. It uses
          peer-to-peer technology to operate with no central authority: managing
          transactions and issuing money are carried out collectively by the
          network. WINDSOR provides a well-secured token that holds the value of
          a specific asset which can be traded, exchanged, sold etc. Enable any
          business with more secure and transparent process flow. The
          transparency and immutability of the crypto tokens help a business to
          quickly gain trust in the market. Powered by Binance Smart Chain, the
          WINDSOR token has been launched exclusively also for the network
          marketers. It uses a decentralized system to reward holders for
          staking their tokens and referring WINDSOR token to non-holders.
        </div>
        <div className="w-full md:block hidden">
          <div className="w-full flex justify-around py-10">
            <div className="h-48 flex flex-col justify-center items-center gap-1 cursor-pointer hover:scale-110 transform-gpu ease-in-out">
              <img src="https://windsorcryptocoin.com/img/bg-img/token.png" />
              <div className="text-xl font-extrabold">500 Millions</div>
              <div className="text-base text-slate-500">Token Supply</div>
            </div>
            <div className="h-48 flex flex-col justify-center items-center gap-1 cursor-pointer hover:scale-110 transform-gpu ease-in-out">
              <img src="https://windsorcryptocoin.com/img/bg-img/binance.png" />
              <div className="text-xl font-extrabold">Binance Smart Chain</div>
              <div className="text-base text-slate-500">Token Network</div>
            </div>
            <div className="h-48 flex flex-col justify-center items-center gap-1 cursor-pointer hover:scale-110 transform-gpu ease-in-out">
              <img src="https://windsortrad.com/logo.png" />
              <div className="text-xl font-extrabold">WINDSOR</div>
              <div className="text-base text-slate-500">Token Name</div>
            </div>
            <div className="h-48 flex flex-col justify-center items-center gap-1 cursor-pointer hover:scale-110 transform-gpu ease-in-out">
              <img src="https://windsortrad.com/logo.png" />
              <div className="text-xl font-extrabold">WINDSOR</div>
              <div className="text-base text-slate-500">Token Symbol</div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <a href="https://pancakeswap.finance/swap?outputCurrency=0x02D57f6c8a307CF8750D9eDA4a45b2F66c78655f">
            <div className="flex items-center md:text-lg text-base font-extrabold gap-1">
              <div className="text-slate-400">Buy </div>
              WINDS
              <img
                className="animate-spin w-auto md:h-8 h-4"
                src="https://windsortrad.com/logo.png"
              />
              R<div className="text-slate-500">from</div>
              <img className="w-auto md:h-8 h-4" src={assets.pancakeSwap} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
