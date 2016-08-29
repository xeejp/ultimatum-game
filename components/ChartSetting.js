import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/chip'

import { changeChartRound } from 'host/actions.js'

const mapStateToProps = ({ chart_round, ultimatum_results, dictator_results }) => ({
  chart_round,
  ultimatum_results,
  dictator_results,
  max_chart_round: getMaxRound(ultimatum_results, dictator_results)
})

const styles = {
  roundButton: {
    margin: 12,
  },
}

function getMaxRound(ultimatum_results, dictator_results) {
  const ultimatum_results_rounds = Object.keys(ultimatum_results).length
  const dictator_results_rounds = Object.keys(dictator_results).length
  return Math.max(ultimatum_results_rounds, dictator_results_rounds)
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
    const { chart_round, max_chart_round } = this.props
    return (
      <div>
          <Chip style={{margin: 4}}>表示ラウンド: {chart_round}</Chip>
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
          { chart_round < max_chart_round?
            <RaisedButton
              label="+"
              style={styles.roundButton}
              onClick={this.handleInc}
            />
            :
            <FlatButton
              label="+"
              style={styles.roundButton}
            />
          }
      </div>
    )
  }
}

export default connect(mapStateToProps)(ChartSetting)
