import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import {RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';


import { incGameRound, decGameRound, submitGameMode } from './actions.js'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_mode, game_round}) => ({
  game_mode,
  game_round
})

const styles = {
  block: {
    margin: '20px 20px'
  },
  radioButton: {
    marginBottom: 8,
  },
  risedButton: {
    margin: 12,
  },
};
class ExperimentSetting extends Component {

  handleRoundInc = (event) => {
    const { dispatch } = this.props
    dispatch(incGameRound())
  }

  handleRoundDec = (event) => {
    const { dispatch } = this.props
    dispatch(decGameRound())
  }

  handleRadioButton = (event, value) => {
    const { dispatch } = this.props
    dispatch(submitGameMode(value))
  }
  render() {
    const { game_round, game_mode } = this.props
    return (
      <div style={styles.block}>
        <Card>
          <CardHeader
            title="実験の設定"
          />
          <CardText>
            <p>ゲームのラウンド数: {game_round}回 (役割交換回数: {game_round-1}回)</p>
            <RaisedButton
              label="-"
              secondary={true}
              style={styles.risedButton}
              onClick={this.handleRoundDec.bind(this)}
            />
            <RaisedButton
              label="+"
              primary={true}
              style={styles.risedButton}
              onClick={this.handleRoundInc.bind(this)}
            />
            <p>ゲームモード: {getGamemodeName(game_mode)}</p>
            <RadioButtonGroup name="game_modes" valueSelected={game_mode} onChange={this.handleRadioButton.bind(this)}>
              <RadioButton
                value="ultimatum"
                label="最後通牒ゲーム"
                style={styles.radioButton}
              />
              <RadioButton
                value="dictator"
                label="独裁者ゲーム"
                style={styles.radioButton}
              />
            </RadioButtonGroup>
          </CardText>
        </Card>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ExperimentSetting)
