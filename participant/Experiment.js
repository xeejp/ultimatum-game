import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/Chip';

import Propose from './Propose.js'
import Respond from './Respond.js'

import { fetchContents } from './actions'

const mapStateToProps = ({ game_mode, game_round, role, now_round, point }) => ({
  game_mode,
  game_round,
  role,
  now_round,
  point,
})

const styles = {
  chip: {
    margin: 4,
  },
}

class Experiment extends Component {
  render() {
    const {role, now_round, game_round, point} = this.props
    switch(role) {
      case "proposer":
        return (
          <div>
            <Chip style={styles.chip}>ラウンド: {now_round} / {game_round}</Chip>
            <Chip style={styles.chip}>ポイント: {point}</Chip>
            <Propose />
          </div>
        )
      case "dictator":
        return (
          <div>
            <Chip style={styles.chip}>ラウンド: {now_round} / {game_round}</Chip>
            <Chip style={styles.chip}>ポイント: {point}</Chip>
            <Propose />
          </div>
        )
      case "responder":
        return (
          <div>
            <Chip style={styles.chip}>ラウンド: {now_round} / {game_round}</Chip>
            <Chip style={styles.chip}>ポイント: {point}</Chip>
            <Respond />
          </div>
        )
      case "visitor":
        return <p>参加できませんでした。終了をお待ち下さい。</p>
      default:
        return <span></span>
    }
  }
}

export default connect(mapStateToProps)(Experiment)
