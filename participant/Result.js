import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chart from '../components/Chart.js'
import RoundResult from './RoundResult.js'
import { fetchContents } from './actions'
import { ReadJSON, InsertVariable } from '../util/ReadJSON';

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
          title={ReadJSON().static_text["result"]["graph"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Chart />
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title={ReadJSON().static_text["result"]["round_result"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {results.map(({ proposer, value, accepted }, index) => {
            return (
              <div key={index}>
                <p>{InsertVariable(ReadJSON().static_text["result"]["round"], { round: index + 1 })}</p>
                <RoundResult
                  id={id}
                  proposer={proposer}
                  value={value}
                  accepted={accepted}
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
