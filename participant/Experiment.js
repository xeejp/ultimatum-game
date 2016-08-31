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

import {
  getRoleName,
} from 'util/index'

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
              <Chip style={styles.chip1}>ラウンド: {now_round} / {game_round}</Chip>
              <Chip style={styles.chip1}>{(game_round - now_round) == 0? "最後のラウンド": "残り役割交代: " + (game_round - now_round) + "回"}</Chip>
              { inf_redo?
                <Chip style={styles.chip1}>再提案回数: ∞</Chip>
              : <span />
              }
              { (game_redo == 0)? <span />
              :
                <span>
                  <Chip style={styles.chip1}>再提案回数: {redo_count} / {game_redo}</Chip>
                  <Chip style={styles.chip1}>{(game_redo - redo_count) == 0? "最後の提案": "残り再提案可能回数: " + (game_redo - redo_count) + "回"}</Chip>
                </span>
              }
            </span>
          : <span />
        }
        { state == "finished"?
            <span><Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip></span>
          : <span />
        }
        <Chip style={styles.chip2}>ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={redo_flag}
            message={role == "responder"? "拒否しました。相手が再提案しています。": "拒否されました。再提案してください。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose3}
          />
          <Snackbar
            open={changeRole}
            message={"役割交換によりあなたは" + getRoleName(role) + "になりました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose2}
          />
          <Snackbar
            open={responsedOK}
            message={"さきほどの提案は承認されました。" + allo_result + "ポイント獲得しました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responsedNG}
            message="さきほどの提案は拒否されました。ポイントは獲得できませんでした。"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseOK}
            message={"提案を承認しました。" + (1000 - allo_result) + "ポイント獲得しました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseNG}
            message="提案を拒否しました。ポイントは獲得できませんでした。"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


