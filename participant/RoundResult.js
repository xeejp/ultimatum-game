import React from 'react'
import { ReadJSON, InsertVariable } from '../util/ReadJSON';

const RoundResult = ({ id, proposer, value, accepted }) => {
  
  if (id == proposer) {
    return (
      <div>
        <p>{ReadJSON().static_text["result"]["remain_point"]}</p>
        <p>{value}</p>
        <p>{ReadJSON().static_text["result"]["pass_point"]}</p>
        <p>{InsertVariable(ReadJSON().static_text["result"]["point"], { point: 1000 - value })}</p>
        <p>{accepted ? ReadJSON().static_text["result"]["enemy_accepted"] : ReadJSON().static_text["result"]["enemy_rejected"]}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{ReadJSON().static_text["result"]["return_point"]}</p>
        <p>{InsertVariable(ReadJSON().static_text["result"]["point"], { point: 1000 - value })}</p>
        <p>{accepted ? ReadJSON().static_text["result"]["user_accepted"] : ReadJSON().static_text["result"]["user_rejected"]}</p>
      </div>
    )
  }
}

export default RoundResult
