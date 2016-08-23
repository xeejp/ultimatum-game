import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/Chip'

import Allocating from './componets/Allocating.js'
import Judging from './componets/Judging.js'
import Finished from './componets/Finished.js'

const mapStateToProps = ({ state, role, game_round, now_round, point, game_progress }) => ({
  state,
  role,
  game_round,
  now_round,
  point,
  game_progress,
})

const styles = {
  chip1: {
    margin: 4,
    float: "left"
  },
  chip2: {
    margin: 4,
    float: "right"
  },
  contents: {
    margin: 16,
    clear: "both"
  }
}

class Respond extends Component {
  renderContents () {
    const { state } = this.props
    switch(state) {
      case "allocating":
        return <Allocating />
      case "judging":
        return <Judging />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const { role, game_round, now_round, point, game_progress } = this.props
    return (
      role != "visitor"?
        <div>
          <Chip style={styles.chip1}>ラウンド: {now_round} / {game_round}</Chip>
          <Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip>
          <Chip style={styles.chip2}>ポイント: {point}</Chip>
          <div style={styles.contents}>{this.renderContents()}</div>
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


