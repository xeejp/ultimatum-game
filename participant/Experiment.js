import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Allocating from './componets/Allocating.js'
import Judging from './componets/Judging.js'
import Finished from './componets/Finished.js'

import {
  fallSnackBarFlags,
  fallSnackBarFlags2,
  fallSnackBarFlags3,
} from './actions.js'

import Notice from './Notice'

import {
  getRoleName,
} from '../util/index'
import { ReadJSON, InsertVariable } from '../util/ReadJSON';

const mapStateToProps = ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK,
  responsedNG, responseNG,
  changeRole, redo_flag,
  game_redo, redo_count,
  inf_redo,
}) => ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK, 
  responsedNG, responseNG,
  changeRole, redo_flag,
  game_redo, redo_count,
  inf_redo,
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
    clear: "both"
  }
}

class Respond extends Component {
  constructor() {
    super()
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.handleRequestClose3 = this.handleRequestClose3.bind(this)
    this.handleRequestClose4 = this.handleRequestClose4.bind(this)

    this.state = {
      allo_flag: false
    }
  }

  handleRequestClose = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags())
  }

  handleRequestClose2 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags2())
  }

  handleRequestClose3 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags3())
  }

  handleRequestClose4 = () => {
    this.setState({
      allo_flag: false
    })
  }

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

  componentWillReceiveProps(props) {
    if(props.role == "responder" && props.state == "judging" && this.props.state == "allocating") {
      this.setState({
        allo_flag: true,
      })
    }
  }

  render() {
    const {
      role, game_round,
      now_round, point,
      game_progress, allo_result,
      responsedOK, responseOK,
      responsedNG, responseNG,
      changeRole, redo_flag,
      game_redo, redo_count,
      state, inf_redo,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { state != "finished"?
            <span>
              <Chip style={styles.chip1}>{InsertVariable(ReadJSON().static_text["round_"], { now: now_round, round: game_round })}</Chip>
              <Chip style={styles.chip1}>{(game_round - now_round) == 0? ReadJSON().static_text["final_round"] : InsertVariable(ReadJSON().static_text["remain_round"], { round: game_round - now_round })}</Chip>
              { inf_redo?
                <Chip style={styles.chip1}>{ReadJSON().static_text["inf_redo"]}</Chip>
              : <span />
              }
              { (game_redo == 0)? <span />
              :
                <span>
                  <Chip style={styles.chip1}>{InsertVariable(ReadJSON().static_text["redo__"], { now: redo_count, redo: game_redo })}</Chip>
                  <Chip style={styles.chip1}>{(game_redo - redo_count) == 0? ReadJSON().static_text["final_suggestion"] : InsertVariable(ReadJSON().static_text["remain_suggestion"], { redo: game_redo - redo_count })}</Chip>
                </span>
              }
            </span>
          : <span />
        }
        { state == "finished"?
            <span><Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["progress"], { progress: Math.round(game_progress) })}</Chip></span>
          : <span />
        }
        <Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["point_"], { point: point })}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={redo_flag}
            message={role == "responder"? ReadJSON().static_text["reject_"] : ReadJSON().static_text["rejected_"]}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose3}
          />
          <Snackbar
            open={changeRole}
            message={InsertVariable(ReadJSON().static_text["role_change"], { role: getRoleName(role) })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose2}
          />
          <Snackbar
            open={responsedOK}
            message={InsertVariable(ReadJSON().static_text["accepted"], { point: allo_result })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responsedNG}
            message={ReadJSON().static_text["rejected"]}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseOK}
            message={InsertVariable(ReadJSON().static_text["accept_"], { point: 1000 - allo_result })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseNG}
            message={ReadJSON().static_text["reject__"]}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Notice
            open={this.state.allo_flag}
            message={"提案者から提案されました。回答を選択してください。"}
            onRequestClose={this.handleRequestClose4}
          />
        </div>
      :
        <p>{ReadJSON().static_text["cant_join"]}</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


