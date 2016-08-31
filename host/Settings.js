import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentSetting from './ExpermentSetting.js'
import MatchingButton from './MatchingButton.js'
import ResetButton from './ResetButton.js'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_round, game_redo, inf_redo }) => ({
  game_round, game_redo, inf_redo,
})

const styles = {
  chip: {margin: 4, float: "left"},
  button: {margin: 12, clear: "both"}
}

class Settings extends Component {
  render() {
    const { game_round, game_redo, inf_redo} = this.props
    return (
      <div>
        <Card style={{margin: '16px 16px'}}>
          <CardHeader
            title={"設定"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Chip style={styles.chip}>ラウンド: {game_round}</Chip>
            <Chip style={styles.chip}>再提案可能回数: {inf_redo? "∞" :game_redo}</Chip>
            <div style={styles.button}>
              <ExperimentSetting />
              <MatchingButton />
              <ResetButton />
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}


export default connect(mapStateToProps)(Settings)
