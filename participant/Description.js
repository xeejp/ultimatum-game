import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from '../util/index.js'

const mapStateToProps = ({ gamemode, rounds}) => ({
  gamemode,
  rounds
})

class Description extends Component {
  render() {
    const { gamemode, rounds } = this.props
    if( gamemode == "ultimatum") {
      return (
        <Card>
          <CardTitle title={getGamemodeName(gamemode)} subtitle="ルールの説明" />
          <CardText>
            <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{rounds-1}回の役割交代があります。</p>
            <List>
              <ListItem
                primaryText="提案者"
                secondaryText="提案者は始めにポイントが配られ、それを自分と受け手の間でどう分けるか提案できます"
              />
              <ListItem
                primaryText="受け手"
                secondaryText="受け手は提案者の提案を承認するか拒否するか選択できます。"
              />
            </List> 
            <p>受け手が拒否した場合、そのラウンドに提案者に配られたポイントは没収されます。</p>
          </CardText>
        </Card>
      )
    }
    else {
      return (
        <Card>
          <CardTitle title={getGamemodeName(gamemode)} subtitle="ルールの説明" />
          <CardText>
            <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{rounds-1}回の役割交代があります。</p>
            <List>
              <ListItem
                primaryText="独裁者"
                secondaryText="提案者は始めにポイントが配られ、それを自分と受け手の間でどう分けるか決定できます"
              />
              <ListItem
                primaryText="受け手"
                secondaryText="受け手は提案者の提案を承認します。"
              />
            </List> 
          </CardText>
        </Card>
      )
    }
  }
}
export default connect(mapStateToProps)(Description)
