import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../util/index.js'

import {
  submitAlloTemp,
  finishAllocating,
} from './actions.js'


const mapStateToProps = ({ point, role, allo_temp, state }) => ({
  point,
  role,
  allo_temp,
  state,
})


class Propose extends Component {
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
    const { point, role, allo_temp, state } = this.props
    const style = {
      margin: 12,
    }
    switch(state) {
      case "allocating":
        return (
          <div>
            <Card>
              <CardHeader
                title={getRoleName(role) + "側"}
                subtitle="配分中"
              />
              <CardText>
                <p>あなたへの配分: {allo_temp}  受け手への配分: {1000 - allo_temp}</p>
                <Slider
                  min={0}
                  max={1000}
                  step={100}
                  value={allo_temp}
                  onChange={this.handleThinking}
                  disabled={state != "allocating"}
                />
                <RaisedButton
                  label="送信"
                  primary={true}
                  style={style}
                  onClick={this.handleConfirm}
                />
              </CardText>
            </Card>
          </div>
        )
      case "judging":
        return (
          <div>
            <Card>
              <CardHeader
                title={getRoleName(role) + "側"}
                subtitle="回答待ち"
              />
              <CardText>
                <p>あなたへの配分: {allo_temp}  受け手への配分: {1000 - allo_temp}</p>
                <Slider
                  min={0}
                  max={1000}
                  step={100}
                  value={allo_temp}
                  onChange={this.handleThinking}
                  disabled={state != "allocating"}
                />
                <p>送信しました。受け手の回答をお待ち下さい。</p>
              </CardText>
            </Card>
          </div>
        )
      case "finished":
        return (
          <div>
            <Card>
              <CardHeader
                title={getRoleName(role) + "側"}
                subtitle="終了待ち"
              />
              <CardText>
                <p>このペアの実験は終了しました。他のペアが終了するまでお待ち下さい。</p>
              </CardText>
            </Card>
          </div>
        )
      default:
        return (
          <div></div>
        )
    }
  }
}

export default connect(mapStateToProps)(Propose)
