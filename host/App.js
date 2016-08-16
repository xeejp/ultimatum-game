import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import PageSteps from './PageSteps.js'
import { fetchContents } from './actions.js'
import ExperimentKey from './ExpermentKey.js'

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
    return <div>
      <ExperimentKey />
      <PageSteps />
    </div>
  }
}

export default connect()(App)
