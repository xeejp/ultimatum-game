import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/Chip'

import Allocating from './componets/Allocating.js'
import Judging from './componets/Judging.js'
import Finished from './componets/Finished.js'

const mapStateToProps = ({ state, role, game_round, now_round, point }) => ({
  state,
  role,
  game_round,
  now_round,
  point,
})

const styles = {
  chip: {
    margin: 4,
  },
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
    const { role, game_round, now_round, point } = this.props
    return (
      role != "visitor"?
        <div>
          <Chip style={styles.chip}>ラウンド: {now_round} / {game_round}</Chip>
          <Chip style={styles.chip}>ポイント: {point}</Chip>
          {this.renderContents()}
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


