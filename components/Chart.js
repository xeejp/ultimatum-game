import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'

function compData(categories, results) {
  const values = Object.keys(results).map(id => results[id].value)
  return Array.from(categories).map(x => values.filter(y => x == y).length)
}

const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const mapStateToProps = ({ultimatum_results, dictator_results}) => ({
  ultimatum_results,
  dictator_results,
  config: {
      chart: {
         type: "column"
      },
      title: {
        text: "分配されたポイント"
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
          name: "最後通牒ゲームの提案者",
          data: compData(categories, ultimatum_results),
          stack: 'ultimatum'
        },
        {
          name: "独裁者ゲームの独裁者",
          data: compData(categories, dictator_results),
          stack: 'dictator',
        },
      ]
    }
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
    const { ultimatum_results, dictator_results, config } = this.props
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
