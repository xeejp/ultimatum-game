import React from 'react'

const RoundResult = ({ id, proposer, value, accepted }) => {
  const acceptText = accepted ? '承認しました。' : '拒否しました。'
  if (id == proposer) {
    return (
      <div>
        <p>手もとに残るポイント</p>
        <p>{value}</p>
        <p>相手に渡すポイント</p>
        <p>{1000 - value}ポイント</p>
        <p>相手は{acceptText}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>相手から受け取るポイント</p>
        <p>{1000 - value}ポイント</p>
        <p>あなたは{acceptText}</p>
      </div>
    )
  }
}

export default RoundResult
