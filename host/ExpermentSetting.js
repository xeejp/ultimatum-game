import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { submitGameRound, submitGameMode } from './actions.js'
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
  }
};
class ExperimentSetting extends Component {

  handleSlider = (event, value) => {
    const { dispatch } = this.props
    dispatch(submitGameRound(value))
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
            <Slider
              min={1}
              max={10}
              step={1}
              defaultValue={1}
              value={game_round}
              onChange={this.handleSlider.bind(this)}
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
