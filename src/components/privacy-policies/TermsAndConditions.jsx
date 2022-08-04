import React from "react"
import LeadershipBounus from "./LeadershipBounus"
import Rewards from "./Rewards"
import TermsPage1 from "./TermsPage1"
import WorldClub from "./WorldClub"

const TermsAndConditions = () => {
  return (
    <div className="p-4">
      <TermsPage1 />
      <div className="p-4">
        <LeadershipBounus />
        <Rewards />
        <WorldClub />
      </div>
    </div>
  )
}

export default TermsAndConditions
