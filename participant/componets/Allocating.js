import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index.js'
import { Slider } from 'xee-components'

import {
  submitAlloTemp,
  finishAllocating,
} from '../actions.js'

import { ReadJSON, InsertVariable } from '../../util/ReadJSON';

const mapStateToProps = ({ allo_temp, role }) => ({
  allo_temp,
  role,
})

class Allocating extends Component {
  constructor() {
    super()
    this.handleThinking = this.handleThinking.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleThinking = (event, value) => {
    const { dispatch } = this.props
    dispatch(submitAlloTemp(value))
  }

  handleConfirm = (event, value) => {
    const { dispatch, allo_temp } = this.props
    dispatch(finishAllocating(allo_temp))
  }

  render() {
    const { allo_temp, role, game_mode} = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? "proposer" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={InsertVariable(ReadJSON().static_text["user_role"], { role: getRoleName(role) })}
            subtitle={role == "responder"? InsertVariable(ReadJSON().static_text["enemy_allo"], { enemy: getRoleName(enemy) }) : ReadJSON().static_text["user_allo"]}
          />
          <CardText>
            <p>{InsertVariable(ReadJSON().static_text["allo"], { user_allo: role == "responder"? 1000 - allo_temp : allo_temp, enemy: getRoleName(enemy), enemy_allo: role == "responder"? allo_temp : 1000 - allo_temp})}</p>
            {role == "proposer" ? (
              <Slider
                min={0}
                max={1000}
                divisor={10}
                value={ allo_temp }
                onChange={this.handleThinking}
              />
            ) : null}
            <RaisedButton
              label={ReadJSON().static_text["send"]}
              primary={true}
              style={style}
              onClick={this.handleConfirm}
              disabled={role == "responder"}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Allocating)
