import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { getRoleName, getStateName } from '../util/index.js'

const User = ({ id, role, point, pair_id}) => (
  <tr><td>{id}</td><td>{getRoleName(role)}</td><td>{point}</td><td>{pair_id}</td></tr>
)

const UsersList = ({participants}) => (
  <table>
    <thead><tr><th>ID</th><th>役割</th><td>ポイント</td><td>所属ペアID</td></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            role={participants[id].role}
            point={participants[id].point}
            pair_id={participants[id].pair_id}
          />
        ))
      }
    </tbody>
  </table>
)

const Pair = ({ id, now_round, state, members }) => (
  <tr><td>{id}</td><td>{now_round}</td><td>{getStateName(state)}</td></tr>
)

const Pairs = ({ pairs, participants }) => (
  <table>
    <thead><tr><th>ID</th><th>ラウンド</th><th>状況</th></tr></thead>
    <tbody>
      {
        Object.keys(pairs).map(id => (
          <Pair
            key={id}
            id={id}
            now_round={pairs[id].now_round}
            state={pairs[id].state}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ pairs, participants }) => ({
  pairs, participants
})

const Users = ({ pairs, participants }) => (
  <div>
    <Card>
      <CardHeader
        title={"Users (" + Object.keys(participants).length + "人)"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
        />
      </CardText>
    </Card>
    <Card>
      <CardHeader
        title={"ペア数 (" + Object.keys(pairs).length + ")"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Pairs
          pairs={pairs}
          participants={participants}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps)(Users)
