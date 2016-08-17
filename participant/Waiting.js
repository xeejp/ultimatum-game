import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from '../util/index.js'

const mapStateToProps = ({ gamemode, participants }) => ({
  gamemode,
  participantsLength: Object.keys(participants).length
})

const Waiting = ({ gamemode, participantsLength }) => (
  <Card>
    <CardTitle title={getGamemodeName(gamemode)} subtitle="待機画面" />
    <CardText>
      <p>参加者の登録を待っています。(現在の参加者: {participantsLength}人)</p>
      <p>この画面のまましばらくお待ち下さい。</p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
