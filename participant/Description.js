import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({ game_round, description }) => ({
  game_round, description
})

class Description extends Component {
  render() {
    const { description, game_round } = this.props
    const text = description
      .replace('{round}', game_round-1)
    return (
      <Card>
        <CardText>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
