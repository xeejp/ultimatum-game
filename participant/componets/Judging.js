import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from 'util/index'

import {
  submitAlloTemp,
  finishAllocating,
  redoAllcating,
} from '../actions.js'

const mapStateToProps = ({ allo_temp, change_count, role, game_mode, now_round, redo_count, game_redo }) => ({
  allo_temp, change_count, role, game_mode, now_round, redo_count, game_redo
})

import {
  responseOK,
  responseNG,
} from '../actions.js'

class Allocating extends Component {
  constructor() {
    super()
    this.handleOK = this.handleOK.bind(this)
    this.handleNG = this.handleNG.bind(this)
  }

  handleOK = () => {
    const { dispatch, allo_temp, change_count, now_round } = this.props

    const result = {
      value: allo_temp,
      change_count: change_count,
      accept: true,
      now_round: now_round,
    }
    dispatch(responseOK(result))
  }

  handleNG = () => {
    const { dispatch, change_count, now_round, redo_count, game_redo } = this.props
    if( redo_count < game_redo) {
      dispatch(redoAllcating())
    } else {
      const result = {
        value: 0,
        change_count: change_count,
        accept: false,
        now_round: now_round,
      }
      dispatch(responseNG(result))
    }
  }

  render() {
    const { allo_temp, role, game_mode} = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? ((game_mode == "ultimatum")? "proposer": "dictator") : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={getRoleName(role) + "側"}
            subtitle={role == "responder"? "回答してください。" :"回答待ちです。しばらくお待ちください。"}
          />
          <CardText>
            <p>あなたへの配分: {role == "responder"? 1000 - allo_temp : allo_temp}  {getRoleName(enemy)}への配分: {role == "responder"? allo_temp : 1000 - allo_temp}</p>
            { role != "responder"?
              <p>送信しました。受け手の回答をお待ち下さい。</p>
            :
              <div>
                <p>{getRoleName(enemy) + "が上記のように提案してきました。回答してください"}</p>
                <RaisedButton
                  label="承認"
                  primary={true}
                  onClick={this.handleOK}
                  style={{marginRight: "16px"}}
                />
                <RaisedButton
                  label="拒否"
                  secondary={true}
                  disabled={game_mode=="dictator"}
                  onClick={this.handleNG}
                />
              </div>
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Allocating)

