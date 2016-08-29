import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'
import ChartSetting from './ChartSetting.js'

import { fallChartButton } from 'host/actions.js'

function compDataAccept(categories, results, round) {
  const values = results[round]? Object.keys(results[round]).filter(id =>
    results[round][id].accept).map(id =>
      results[round][id].value) : []
  return Array.from(categories).map(x => values.filter(y => x == y).length)
}

function compDataRefuse(categories, results, round) {
  const values = results[round]? Object.keys(results[round]).filter(id =>
    !results[round][id].accept).map(id =>
      results[round][id].value) : []
  return Array.from(categories).map(x => values.filter(y => x == y).length)
}

const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const mapStateToProps = ({ultimatum_results, dictator_results, chart_round, chart_button }) => ({
  ultimatum_results,
  dictator_results,
  chart_round,
  chart_button,
  config: {
      chart: {
         type: "column"
      },
      credits: {
        text: 'xee.jp',
        href: 'https://xee.jp/'
      },
      title: {
        text: "提案者に分配されたポイント"
      },
      xAxis: {
        categories: categories,
        crosshair: true,
        title: {
          text: "ポイント"
        },
        labels: {
          step: 1
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: "回数"
        },
        labels: {
          step: 1,
        },
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + 'ポイント</b><br/>' +
            this.series.name + ': ' + this.y
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: [
        {
          name: "最後通牒・承認",
          data: compDataAccept(categories, ultimatum_results, chart_round),
          stack: 'ultimatum'
        },
        {
          name: "最後通牒・拒否",
          data: compDataRefuse(categories, ultimatum_results, chart_round),
          stack: 'ultimatum'
        },
        {
          name: "独裁者・承認",
          data: compDataAccept(categories, dictator_results, chart_round),
          stack: 'dictator',
        },
      ]
    }
})

class Chart extends Component {
  constructor(props) {
    super(props)
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: true,
      round: 1,
    }
  }

  handleCallback = () => {
    const { dispatch, chart_button } = this.props
    if(chart_button){
      window.setTimeout(() => {
        location.href="#chart"
      }, 1 )
    }
    dispatch(fallChartButton())
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  render() {
    const { ultimatum_results, dictator_results, config } = this.props
    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title="グラフ"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Highcharts config={config} callback={this.handleCallback}></Highcharts>
          <ChartSetting />
        </CardText>
      </Card>
    </div>
    );
  }
}

export default connect(mapStateToProps)(Chart)
