import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'
import ChartSetting from './ChartSetting.js'

import { fallChartButton } from '../host/actions.js'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

function compDataAccept(categories, results, round) {
  const values = results[round]? Object.keys(results[round]).filter(id =>
    results[round][id]? results[round][id].accept : false).map(id =>
      results[round][id].value) : []
  return Array.from(categories).map(x => values.filter(y => x == y).length)
}

function compDataRefuse(categories, results, round) {
  const values = results[round]? Object.keys(results[round]).filter(id =>
    results[round][id]? !results[round][id].accept : false).map(id =>
      results[round][id].value) : []
  return Array.from(categories).map(x => values.filter(y => x == y).length)
}

const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const mapStateToProps = ({ultimatum_results, chart_round, chart_button, role}) => ({
  ultimatum_results,
  role,
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
        text: ReadJSON().static_text["chart"]["allo_point"]
      },
      xAxis: {
        categories: categories,
        crosshair: true,
        title: {
          text: ReadJSON().static_text["point"]
        },
        labels: {
          step: 1
        }
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ReadJSON().static_text["chart"]["count"]
        },
        labels: {
          step: 1,
        },
      },
      tooltip: {
        formatter: function () {
          return '<b>' + InsertVariable(ReadJSON().static_text["result"]["point"], { point: this.x }) + '</b><br/>' +
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
          name: ReadJSON().static_text["accept"],
          data: compDataAccept(categories, ultimatum_results, chart_round),
          stack: 'ultimatum'
        },
        {
          name: ReadJSON().static_text["reject"],
          data: compDataRefuse(categories, ultimatum_results, chart_round),
          stack: 'ultimatum'
        },
      ]
    }
})

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: Boolean(role),
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
    const { config } = this.props
    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={ReadJSON().static_text["result"]["graph"]}
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

export default connect(mapStateToProps)(throttle(Chart, 200))
