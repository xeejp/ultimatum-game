import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import Finished from './componets/Finished.js'
import {
  getRoleName,
} from '../util/index.js'

import {
  responseOK,
  responseNG,
} from './actions.js'

const mapStateToProps = ({ point, allo_temp, game_mode, role, state }) => ({
  allo_temp,
  point,
  game_mode,
  role, state
})


class Respond extends Component {

  constructor() {
    super()
    this.handleOK = this.handleOK.bind(this)
    this.handleNG = this.handleNG.bind(this)
  }

  handleOK = () => {
    const { dispatch, allo_temp } = this.props
    dispatch(responseOK(allo_temp))
  }

  handleNG = () => {
    const { dispatch } = this.props
    dispatch(responseNG())
  }

  render() {
    const { point, role, allo_temp, game_mode, state } = this.props
    const style = {
      margin: 12,
    }
    const proposer = (game_mode == "ultimatum"? "提案者": "独裁者")
    switch(state) {
      case "allocating":
        return (
          <div>
            <Card>
              <CardHeader
                title={getRoleName(role) + "側"}
                subtitle={proposer + "が配分中。しばらくお待ちください。"}
              />
              <CardText>
                <p>あなたへの配分: {1000-allo_temp}  {proposer}への配分: {allo_temp}</p>
                <Slider
                  min={0}
                  max={1000}
                  step={100}
                  value={1000-allo_temp}
                  disabled={true}
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
                subtitle="回答してください"
              />
              <CardText>
                <p>あなたへの配分: {1000-allo_temp}  受け手への配分: {allo_temp}</p>
                <p>{proposer + "が上記のように提案してきました。回答してください"}</p>
                <RaisedButton
                  label="承認"
                  primary={true}
                  onClick={this.handleOK}
                />
                <RaisedButton
                  label="拒否"
                  secondary={true}
                  disabled={game_mode=="dictator"}
                  onClick={this.handleNG}
                />
              </CardText>
            </Card>
          </div>
        )
      case "finished":
        return (
          <div>
            <Finished />
          </div>
        )
      default:
        return (
          <div></div>
        )
    }
  }
}

export default connect(mapStateToProps)(Respond)
