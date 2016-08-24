import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'

const mapStateToProps = ({ultimatum_results, dictator_results}) => ({
  ultimatum_results,
  dictator_results
})

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  render() {
    const { ultimatum_results, dictator_results } = this.props
    const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    const config = {
      chart: {
         type: "column"
      },
      title: {
        text: "提案者側に分配されたポイント"
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
          name: "最後通牒ゲーム",
          data: Array.from(categories).map(x => ultimatum_results.filter(y => x == y).length),
          stack: 'graph'
        },
        {
          name: "独裁者ゲーム",
          data: Array.from(categories).map(x => dictator_results.filter(y => x == y).length),
          stack: 'graph',
        }
      ]
    }

    return (
    <div>
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
          <Highcharts config={config} ref="chart"></Highcharts>
        </CardText>
      </Card>
    </div>
    );
  }
}

export default connect(mapStateToProps)(Chart)
