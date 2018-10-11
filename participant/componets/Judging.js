import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index'

import {
  submitAlloTemp,
  finishAllocating,
  redoAllcating,
} from '../actions.js'

const mapStateToProps = ({ allo_temp, change_count, role, now_round, redo_count, game_redo, inf_redo }) => ({
  allo_temp, change_count, role, now_round, redo_count, game_redo, inf_redo,
})

import {
  responseOK,
  responseNG,
} from '../actions.js'

import { ReadJSON, InsertVariable } from '../../util/ReadJSON'

class Allocating extends Component {
  constructor() {
    super()
    this.handleOK = this.handleOK.bind(this)
    this.handleNG = this.handleNG.bind(this)
  }

  handleOK ()  {
    const { dispatch, allo_temp, change_count, now_round } = this.props

    const result = {
      value: allo_temp,
      change_count: change_count,
      accept: true,
      now_round: now_round,
    }
    dispatch(responseOK(result))
  }

  handleNG ()  {
    const { dispatch, change_count, now_round, redo_count, game_redo, inf_redo } = this.props
    if(inf_redo || redo_count < game_redo) {
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
    const { allo_temp, role } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? "proposer" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={InsertVariable(ReadJSON().static_text["user_role_"], { role: getRoleName(role) })}
            subtitle={role == "responder"? ReadJSON().static_text["answer"] : ReadJSON().static_text["wait_answer"]}
          />
          <CardText>
            <p>{InsertVariable(ReadJSON().static_text["allo"], {user_allo: role == "responder"? 1000 - allo_temp : allo_temp, enemy: getRoleName(enemy), enemy_allo: role == "responder"? allo_temp : 1000 - allo_temp})}</p>
            { role != "responder"?
              <p>{ReadJSON().static_text["send_wait"]}</p>
            :
              <div>
                <p>{InsertVariable(ReadJSON().static_text["suggestion"], { enemy: getRoleName(enemy) })}</p>
                <RaisedButton
                  label={ReadJSON().static_text["accept"]}
                  primary={true}
                  onClick={this.handleOK}
                  style={{marginRight: "16px"}}
                />
                <RaisedButton
                  label={ReadJSON().static_text["reject"]}
                  secondary={true}
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

