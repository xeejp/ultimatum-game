import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chart from '../components/Chart.js'
import RoundResult from './RoundResult.js'
import { fetchContents } from './actions'

const mapStateToProps = ({ id, pair_results }) => {
  return {
    id,
    results: pair_results.concat().reverse()
  }
}

const Result = ({ id, results }) => {
  return (
    <div>
      <Card initiallyExpanded={true}>
        <CardHeader
          title='グラフ'
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Chart />
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title='各ラウンドの結果'
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {results.map(({ proposer, value }, index) => {
            return (
              <div key={index}>
                <p>{index + 1}ラウンド目</p>
                <RoundResult
                  id={id}
                  proposer={proposer}
                  value={value}
                />
              </div>
            )
          })}
        </CardText>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps)(Result)
