import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'

const mapStateToProps = ({ game_round }) => ({
  game_round
})

class Description extends Component {
  render() {
    const { game_round } = this.props
    return (
      <Card>
        <CardTitle title="最後通牒ゲーム" subtitle="ルールの説明" />
        <CardText>
          <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{game_round-1}回の役割交代があります。</p>
          <List>
            <ListItem
              primaryText="提案者"
              secondaryText="提案者はポイントを自分と受け手の間でどう分けるか提案できます"
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
}
export default connect(mapStateToProps)(Description)
