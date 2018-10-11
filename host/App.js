import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions.js'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import ExperimentSetting from './ExperimentSetting.js'
import EditQuestion from './EditQuestion.js'
import DownloadButton from './DownloadButton.js'

import { changePage } from './actions'

import throttle from 'react-throttle-render'

const mapStateToProps = ({ dispatch, page, pairs, ultimatum_results, participants }) => ({
  dispatch, page, pairs, ultimatum_results, participants
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  componentWillReceiveProps({ pairs, page }) {
    if(page == "experiment") {
      for(var key in pairs) {
        if(pairs[key].state != "finished") return
      }
      const { dispatch } = this.props
      dispatch(changePage("result"))
    }
  }

  render() {
    const { page, ultimatum_results, pairs, participants } = this.props
    var result_tmp = {}
    for(var i in ultimatum_results) {
      for(var j in ultimatum_results[i]) {
        if(!result_tmp[j]) result_tmp[j] = {}
        result_tmp[j][i] = ultimatum_results[i][j]
      }
    }
    if (!participants) return (
      <Card style={{padding: '20px'}}>
        <CardTitle title={ReadJSON().static_text["loading"][0]} style={{padding: '0px', marginTop: '7px', marginBottom: '14px'}}/>
        <CardText style={{padding: '0px', margin: '0px'}}>
          <div style={{textAlign: 'center'}}>
            <CircularProgress style={{margin: '0px', padding: '0px' }} />
          </div>
          <p style={{margin: '0px', padding: '0px'}}>{LineBreak(ReadJSON().static_text["loading"][1])}</p>
        </CardText>
      </Card>
    )
    return (
      <div>
        <PageSteps />
        <Users />
        <Chart />
        <ExperimentSetting />
        <EditQuestion style={{marginRight: "2%"}} disabled={page != "waiting"} />
        <DownloadButton
          fileName={"ultimatum_game.csv"}
          list={[
            [ReadJSON().static_text["title"]],
            [ReadJSON().static_text["file"][0], new Date()],
            [ReadJSON().static_text["file"][1], Object.keys(participants).length],
            [ReadJSON().static_text["file"][2], Object.keys(pairs).length],
          ].concat(
            [[ReadJSON().static_text["file"][3], ReadJSON().static_text["file"][4], ReadJSON().static_text["file"][5]]]
          ).concat(
            Object.keys(participants).map(id => [id, participants[id].point, participants[id].pair_id])
          ).concat(
            [[ReadJSON().static_text["file"][5], ReadJSON().static_text["file"][6], ReadJSON().static_text["file"][7], ReadJSON().static_text["file"][8], ReadJSON().static_text["file"][9]]]
          ).concat(
            Object.keys(result_tmp).map(i =>
              Object.keys(result_tmp[i]).map(j =>
                [i, result_tmp[i][j].value, 1000 - result_tmp[i][j].value, result_tmp[i][j].accept? ReadJSON().static_text["accept"] : ReadJSON().static_text["reject"], result_tmp[i][j].change_count]
              )
            ).reduce((a, c) => a.concat(c), [])
          ).concat(
            [[ReadJSON().static_text["file"][4]].concat(Object.keys(ultimatum_results).map(key => InsertVariable(ReadJSON().static_text["round_num"], { round: key })))]
          ).concat(
            [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(n => [n].concat(
              Object.keys(ultimatum_results).map(key => Object.keys(ultimatum_results[key]).map(i => ultimatum_results[key][i].value).reduce((a, c) => a + (c == n), 0))
            ))
          )}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
