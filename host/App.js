import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
} from './actions.js'

import { ReadJSON } from '../util/ReadJSON'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import ExperimentSetting from './ExperimentSetting.js'
import EditQuestion from './EditQuestion.js'
import DownloadButton from './DownloadButton.js'

import { changePage } from './actions'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 100)

const mapStateToProps = ({ dispatch, page, pairs, ultimatum_results }) => ({
  dispatch, page, pairs, ultimatum_results
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(intoLoading())
    dispatch(fetchContents())
    dispatch(exitLoading())
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
    const { page, ultimatum_results } = this.props
    var result_tmp = {}
    for(var i in ultimatum_results) {
      for(var j in ultimatum_results[i]) {
        if(!result_tmp[j]) result_tmp[j] = {}
        result_tmp[j][i] = ultimatum_results[i][j]
      }
    }
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <ExperimentSetting />
        <EditQuestion style={{marginRight: "2%"}} disabled={page != "waiting"} />
        <DownloadButton
          fileName={"ultimatum_game.csv"}
          list={[
            [ReadJSON().static_text["title"]],
            [ReadJSON().static_text["file"][0], new Date()],
            [ReadJSON().static_text["file"][1], ReadJSON().static_text["file"][2], ReadJSON().static_text["file"][3], ReadJSON().static_text["file"][4], ReadJSON().static_text["file"][5]]
          ].concat(
            Object.keys(result_tmp).map(i =>
              Object.keys(result_tmp[i]).map(j =>
                [i, result_tmp[i][j].value, 1000 - result_tmp[i][j].value, result_tmp[i][j].accept? ReadJSON().static_text["accept"] : ReadJSON().static_text["reject"], result_tmp[i][j].change_count]
              )
            ).reduce((a, c) => a.concat(c), [])
          )}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
