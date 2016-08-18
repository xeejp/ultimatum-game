import React, { Component } from 'react'
import { connect } from 'react-redux'

import Propose from './Propose.js'
import Respond from './Respond.js'

import { fetchContents } from './actions'

const mapStateToProps = ({ game_mode, role}) => ({
  game_mode,
  role,
})
const Experiment = ({ game_mode, role }) => (() => {
  switch(role) {
    case "proposer":
      return <Propose />
    case "responder":
      return <Respond />
    case "dictator":
      return <Propose />
    case "visitor":
      return <p>参加できませんでした。終了をお待ち下さい。</p>
    default:
      return <span></span>
  }
})()

export default connect(mapStateToProps)(Experiment)
