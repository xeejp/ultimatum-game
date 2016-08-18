import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

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
  }

  handleOK = () => {
    const { dispatch } = this.props
  }

  handleNG = () => {
    const { dispatch } = this.props
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
                <p>あなたへの配分: {1000-allo_temp}  受け手への配分: {allo_temp}</p>
                <Slider
                  min={0}
                  max={1000}
                  step={100}
                  value={1000-allo_temp}
                  disabled={true}
                />
                <RaisedButton
                  label="送信"
                  primary={true}
                  style={style}
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
                />
                <RaisedButton
                  label="拒否"
                  secondary={true}
                  disabled={game_mode=="dictator"}
                />
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

export default connect(mapStateToProps)(Respond)
