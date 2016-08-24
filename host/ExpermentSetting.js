import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


import { changeGameMode, changeGameRound } from './actions.js'
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
  constructor() {
    super()
    this.handleRoundInc = this.handleRoundInc.bind(this)
    this.handleRoundDec = this.handleRoundDec.bind(this)
    this.handleGameMode = this.handleGameMode.bind(this)
  }

  handleNothing = (event) => {
  }

  handleRoundInc = (event) => {
    const { dispatch, game_round } = this.props
    dispatch(changeGameRound(game_round + 1))
  }

  handleRoundDec = (event) => {
    const { dispatch, game_round } = this.props
    dispatch(changeGameRound(game_round - 1))
  }

  handleGameMode = (event) => {
    const { dispatch, game_mode} = this.props
    dispatch(changeGameMode(game_mode == "ultimatum"? "dictator" : "ultimatum"))
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
            { game_round != 1?
              <RaisedButton
                label="-"
                style={styles.risedButton}
                onClick={this.handleRoundDec}
              />
              :
              <FlatButton
                label="-"
                style={styles.risedButton}
              />
            }
            <RaisedButton
              label="+"
              style={styles.risedButton}
              onClick={this.handleRoundInc}
            />
            <p>ゲームモード: {getGamemodeName(game_mode)}</p>
            <RaisedButton
              label="最後通牒ゲーム"
              style={styles.risedButton}
              onClick={game_mode == "dictator"? this.handleGameMode : this.handleNothing}
              primary={game_mode == "ultimatum"}
            />
            <RaisedButton
              label="独裁者ゲーム"
              style={styles.risedButton}
              onClick={game_mode == "ultimatum"? this.handleGameMode : this.handleNothing}
              primary={game_mode == "dictator"}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ExperimentSetting)
