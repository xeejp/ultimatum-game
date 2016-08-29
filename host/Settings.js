import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentSetting from './ExpermentSetting.js'
import MatchingButton from './MatchingButton.js'
import ResetButton from './ResetButton.js'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_mode, game_round, game_redo }) => ({
  game_mode, game_round, game_redo,
})

class Settings extends Component {
  render() {
    const { game_mode, game_round, game_redo } = this.props
    return (
      <div>
        <Card style={{margin: '16px 16px'}}>
          <CardHeader
            title={"設定"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Chip style={{margin: 4}}>ゲームモード: {getGamemodeName(game_mode)}</Chip>
            <Chip style={{margin: 4}}>ラウンド: {game_round}</Chip>
            <Chip style={{margin: 4}}>再提案可能回数: {game_redo}</Chip>
            <ExperimentSetting />
            <MatchingButton />
            <ResetButton />
          </CardText>
        </Card>
      </div>
    )
  }
}


export default connect(mapStateToProps)(Settings)
