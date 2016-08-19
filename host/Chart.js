import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'

const mapStateToProps = ({ultimatum_results, dictator_results}) => ({
  ultimatum_results,
  dictator_results
})

class Chart extends Component {
  render() {
    const { ultimatum_results, dictator_results } = this.props
    const categories = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    var ultimatum = [categories.length], dictator = [categories.length]
    /* TODO 動くようにする
    for(let i = 0; i < categories.length; i ++){
      ultimatum[i] = ultimatum_results.filter((x) => {x == categories[i]}).length
      dictator[i] = dictator_results.filter((x) => {x == categories[i]}).length
    }
   */
    const config = {
      "chart": {
         "type": "column"
      },
      "title": {
        "text": "提案者から受け手への分配金額" // グラフのタイトル
      },
      "xAxis": {
        "categories": {categories},
        "crosshair": true, // 選択箇所の縦横を強調するか
        "labels": {
          "step": 1 // x軸のメモリ表示間隔。指定しないと自動判定される。
        }
      },
      "yAxis": { // 2つ以上の縦軸を用意する場合は複数の要素を定義する
        "allowDecimals": false,
        "min": 0,
        "title": {
          "text": "回数" // 縦軸の名前
        },
        "labels": {
          "step": 1,
        },
      },
      "tooltip": {
        "formatter": function () {
          return '<b>' + this.x + 'ポイント</b><br/>' +
            this.series.name + ': ' + this.y
        }
      },
      "plotOptions": {
        "column": {
          "stacking": 'normal'
        }
      },
      "series": [
        {
          "name": "最後通牒ゲーム", // 連続値の名前
          "data": {ultimatum}, // データの配列
          "stack": 'graph'
        },
        {
          "name": "独裁者ゲーム",
          "data": {dictator},
          "stack": 'graph',
        }
      ]
    }

    return (
    <div>
      <Card>
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
