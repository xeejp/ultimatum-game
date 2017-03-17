import React from 'react'

const RoundResult = ({ id, proposer, value }) => {
  if (id == proposer) {
    return (
      <div>
        <p>手もとに残るポイント</p>
        <p>{value}</p>
        <p>相手に渡すポイント</p>
        <p>{1000 - value}ポイント</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>相手から受け取ったポイント</p>
        <p>{1000 - value}ポイント</p>
      </div>
    )
  }
}

export default RoundResult
