import React, { Component } from 'react'
import { connect } from 'react-redux'

import Pages from './Pages.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import {
  fetchContents,
} from './actions.js'

const mapStateToProps = ({ dispatch }) => ({
  dispatch,
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
        <Pages />
      </div>
  }
}

export default connect(mapStateToProps)(App)
