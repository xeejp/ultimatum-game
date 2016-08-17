import React, { Component } from 'react'
import { connect } from 'react-redux'

import Propose from './Propose.js'
import Respond from './Respond.js'

import { fetchContents } from './actions'

const mapStateToProps = ({ gamemode, role, money}) => ({
  gamemode,
  role,
  money
})
const Experiment = ({ gamemode, role, money }) => (() => {
  switch(role) {
    case "proposer":
      return <Propose />
    case "responder":
      return <Respond />
    default:
      return <Propose />
  }
})()

export default connect(mapStateToProps)(Experiment)
