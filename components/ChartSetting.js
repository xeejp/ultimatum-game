import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { changeChartRound } from 'host/actions.js'

const mapStateToProps = ({ chart_round }) => ({
  chart_round,
})

const styles = {
  roundButton: {
    margin: 12,
  },
}

class ChartSetting extends Component {
  constructor() {
    super()
    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
  }

  handleInc = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round + 1))
  }

  handleDec = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round - 1))
  }

  render() {
    const { chart_round } = this.props
    return (
      <div>
          <p>表示ラウンド: {chart_round}</p>
          { chart_round != 1?
            <RaisedButton
              label="-"
              style={styles.roundButton}
              onClick={this.handleDec}
            />
            :
            <FlatButton
              label="-"
              style={styles.roundButton}
            />
          }
          <RaisedButton
            label="+"
            style={styles.roundButton}
            onClick={this.handleInc}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ChartSetting)
