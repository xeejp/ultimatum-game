import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import ExperimentKey from './ExpermentKey.js'
import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'

const mapStateToProps = ({ dispatch }) => ({
  dispatch
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

  render() {
    const { loading } = this.props
    if ( !loading ) {
      return (
        <div>
          <ExperimentKey />
          <PageSteps />
          <Users />
          <Chart />
        </div>
      )
    } else {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }
  }
}

export default connect()(App)
