import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/chip'
import Toggle from 'material-ui/Toggle';

import { changeGameRound, changeGameRedo, changeInfRedo } from './actions.js'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_round, page, game_redo, inf_redo}) => ({
  game_round,
  game_redo,
  page,
  inf_redo,
})

const styles = {
  block: {
    margin: '20px 20px'
  },
  game_roundButton: {
    margin: 12,
  },
  game_modeButton: {
    margin: 0,
  },
};

class ExperimentSetting extends Component {
  constructor() {
    super()
    this.handleRoundInc = this.handleRoundInc.bind(this)
    this.handleRoundDec = this.handleRoundDec.bind(this)
    this.handleRedoInc = this.handleRedoInc.bind(this)
    this.handleRedoDec = this.handleRedoDec.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      open: false,
      game_round_temp: 0,
      game_redo_temp: 0,
      inf_redo_temp: false,
    }
  }

  componentWillReceiveProps(props) {
    const { game_round, game_rate, inf_redo } = props
    const open = this.state.game_round_temp !== game_round
      || this.state.game_rate_temp !== game_rate
      || this.state.inf_redo_temp !== inf_redo
    this.setState({
      open,
      game_round_temp: game_round,
      game_rate_temp: game_rate,
      inf_redo_temp: inf_redo,
    })
  }

  handleToggle = () => {
    const { inf_redo_temp } = this.state
    this.setState({inf_redo_temp: !inf_redo_temp})
  }

  handleOpen = () => {
    this.setState({open: true})
    const { game_round, game_redo, inf_redo } = this.props
    this.setState({
      game_round_temp: game_round,
      game_redo_temp: game_redo,
      inf_redo_temp: inf_redo,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    const { dispatch } = this.props
    const { game_round_temp, game_redo_temp, inf_redo_temp } = this.state
    dispatch(changeGameRound(game_round_temp))
    dispatch(changeGameRedo(game_redo_temp))
    dispatch(changeInfRedo(inf_redo_temp))
    this.setState({open: false});
  }

  handleNothing = (event) => {}

  handleRoundInc = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp + 1})
  }

  handleRoundDec = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp - 1})
  }

  handleRedoInc = (event) => {
    const { game_redo_temp } = this.state
    this.setState({game_redo_temp: game_redo_temp + 1})
  }

  handleRedoDec = (event) => {
    const { game_redo_temp } = this.state
    this.setState({game_redo_temp: game_redo_temp - 1})
  }

  render() {
    const { page, inf_redo, game_round, game_redo } = this.props
    const { game_round_temp, game_redo_temp, inf_redo_temp } = this.state
    const actions = [
      <RaisedButton
        label="適用"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
      <RaisedButton
        label="キャンセル"
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <span>
        <FloatingActionButton
          onTouchTap={this.handleOpen}
          style={{marginRight: "2%"}}
          disabled={page != "waiting"}
        ><ActionSettings /></FloatingActionButton>
        <Dialog
          title="実験設定"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Chip style={styles.chip}>ラウンド: {game_round}</Chip>
          <Chip style={styles.chip}>再提案可能回数: {inf_redo? "∞" :game_redo}</Chip>
          <p>ゲームのラウンド数: {game_round_temp}回 (役割交換回数: {game_round_temp-1}回)</p>
          { game_round_temp != 1?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handleRoundDec}
            />
            :
            <FlatButton
              label="-"
              style={styles.game_roundButton}
            />
          }
          <RaisedButton
            label="+"
            style={styles.game_roundButton}
            onClick={this.handleRoundInc}
          />
          <p>再提案回数: {inf_redo_temp? "∞" : game_redo_temp}回</p>
          <Toggle
            label="無制限"
            toggled={inf_redo_temp}
            style={{margin: 4, maxWidth: 200}}
            onToggle={this.handleToggle}
          />
          { game_redo_temp != 0?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handleRedoDec}
              disabled={inf_redo_temp}
            />
            :
            <FlatButton
              label="-"
              style={styles.game_roundButton}
              disabled={inf_redo_temp}
            />
          }
          <RaisedButton
            label="+"
            style={styles.game_roundButton}
            disabled={inf_redo_temp}
            onClick={this.handleRedoInc}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect(mapStateToProps)(ExperimentSetting)
