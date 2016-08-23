import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_mode }) => ({
  game_mode,
})

const Waiting = ({ game_mode, participants_length }) => (
  <Card>
    <CardTitle title={getGamemodeName(game_mode)} subtitle="待機画面" />
    <CardText>
      <p>参加者の登録を待っています。</p>
      <p>この画面のまましばらくお待ち下さい。</p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
