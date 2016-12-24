import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
} from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import ExperimentSetting from './ExperimentSetting.js'
import EditQuestion from './EditQuestion.js'
import DownloadButton from './DownloadButton.js'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 100)

const mapStateToProps = ({ dispatch, page }) => ({
  dispatch, page,
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

  render() {
    const { page } = this.props
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
            ["最後通牒ゲーム"],
            ["実験日", new Date()],
          ]}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
