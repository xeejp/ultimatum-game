import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import MatchingButton from './MatchingButton.js'
import { getRoleName } from '../util/index.js'

const User = ({ id, role, money }) => (
  <tr><td>{id}</td><td>{role}</td><td>{money}</td></tr>
)

const UsersList = ({participants}) => (
  <table>
    <thead><tr><th>id</th><th>役割</th><td>ポイント</td></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            role={getRoleName(participants[id].role)}
            money={participants[id].money}
          />
        ))
      }
    </tbody>
  </table>
)

const Pair = ({ pair, participants }) => (
  <UsersList
    participants={pair.members.reduce((res, id) => Object.assign(res, {[id]: participants[id]}), {})}
  />
)

const Pairs = ({ pairs, participants }) => (
  <div>
    {
      Object.keys(pairs).map(id => (
        <Pair
          key={id}
          pair={pairs[id]}
          participants={participants}
        />
      ))
    }
  </div>
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
      <CardActions>
        <MatchingButton />
      </CardActions>
    </Card>
  </div>
)

export default connect(mapStateToProps)(Users)
