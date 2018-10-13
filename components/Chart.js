import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'
import ChartSetting from './ChartSetting.js'

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

const mapStateToProps = ({ultimatum_results}) => ({
  ultimatum_results,
})

const otherConfig = {
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
 }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.state = {
      expanded: Boolean(role),
      chart_round: 1,
      round: 1,
    }
  }

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  handleInc() {
    const { ultimatum_results } = this.props
    const { chart_round } = this.state
    console.log(this)
    if(chart_round < Object.keys(ultimatum_results).length) this.setState({
      chart_round: chart_round+1
    })
  }
  
  handleDec() {
    const { chart_round } = this.state
    console.log(this)
    if(chart_round > 1) this.setState({
      chart_round: chart_round-1
    })
  }

  render() {
    const { ultimatum_results } = this.props
    const { chart_round } = this.state
    const config = Object.assign({}, otherConfig, {
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
        }
      ]
    })

    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange.bind(this)}
      >
        <CardHeader
          title={ReadJSON().static_text["result"]["graph"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Highcharts config={config}></Highcharts>
          <ChartSetting
            chart_round={chart_round}
            max_chart_round={Object.keys(ultimatum_results).length}
            handleInc={this.handleInc.bind(this)}
            handleDec={this.handleDec.bind(this)}  
          />
        </CardText>
      </Card>
    </div>
    );
  }
}

export default connect(mapStateToProps)(throttle(Chart, 200))
