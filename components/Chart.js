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
        text: "提案者側に分配された金額" // グラフのタイトル
      },
      xAxis: {
        categories: categories,
        crosshair: true, // 選択箇所の縦横を強調するか
        title: {
          text: "ポイント"
        },
        labels: {
          step: 1 // x軸のメモリ表示間隔。指定しないと自動判定される。
        }
      },
      yAxis: { // 2つ以上の縦軸を用意する場合は複数の要素を定義する
        allowDecimals: false,
        min: 0,
        title: {
          text: "回数" // 縦軸の名前
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
          name: "最後通牒ゲーム", // 連続値の名前
          data: Array.from(categories).map(x => ultimatum_results.filter(y => x == y).length), // データの配列
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
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
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
