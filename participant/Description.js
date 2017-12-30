import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({ game_round, dynamic_text }) => ({
  game_round, dynamic_text
})

class Description extends Component {
  render() {
    const { dynamic_text, game_round } = this.props
    return (
      <Card>
        <CardTitle title={ReadJSON().static_text["title"]} subtitle={dynamic_text["description"][0]} />
        <CardText>
          <p>{LineBreak(InsertVariable(dynamic_text["description"][1], { round: game_round }))}</p>
          <ListItem
            primaryText={dynamic_text["description"][2]}
            secondaryText={dynamic_text["description"][3]}
          />
          <ListItem
            primaryText={dynamic_text["description"][4]}
            secondaryText={dynamic_text["description"][5]}
          />
          <p>{LineBreak(InsertVariable(dynamic_text["description"][6], { round: game_round }))}</p>
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
