import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../util/index.js'

const mapStateToProps = ({ money, role}) => ({
  money,
  role
})


class Propose extends Component {

  handleThinking = () => {
    const { dispatch } = this.props
    // TODO make confirm action
  }

  handleConfirm = () => {
    const { dispatch } = this.props
    // TODO make confirm action
  }

  render() {
    const { money, role } = this.props
    const style = {
      margin: 12,
    }
    return (
      <div>
        <Card>
          <CardHeader
            title={getRoleName(role) + "側"}
          />
          <CardText>
            <p>配分を決定してください</p>
            <Slider
              min={0}
              max={1000}
              step={100}
              defaultValue={500}
              onChange={this.handleThinking()}
            />
            <RaisedButton
              label="送信"
              primary={true}
              style={style}
              onClick={this.handleConfirm()}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Propose)
