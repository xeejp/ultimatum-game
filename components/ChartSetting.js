import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/chip'

import { ReadJSON, InsertVariable } from '../util/ReadJSON';

const styles = {
  roundButton: {
    margin: 12,
  },
}

const ChartSetting = ({chart_round, max_chart_round, handleInc, handleDec}) => {
  return (
    <div>
        <Chip style={{margin: 4}}>{InsertVariable(ReadJSON().static_text["chart"]["round"], { round: chart_round })}</Chip>
        { chart_round != 1?
          <RaisedButton
            label="-"
            style={styles.roundButton}
            onClick={handleDec}
          />
          :
          <FlatButton
            label="-"
            style={styles.roundButton}
          />
        }
        { chart_round < max_chart_round?
          <RaisedButton
            label="+"
            style={styles.roundButton}
            onClick={handleInc}
          />
          :
          <FlatButton
            label="+"
            style={styles.roundButton}
          />
        }
    </div>
  )
}


export default ChartSetting
