import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from '../util/index.js'

const initialState = {
  game_round: 1,
  page: pages[0],
  game_mode: game_modes[0],
  participants: {},
  pairs: {}
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {
        [id]: participant
      })
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    'change page': (_, { payload }) => ({ page: payload }),
    'change game_round': (_, { payload }) => ({ game_round: payload }),
    'change game_mode': (_, { payload }) => ({ game_mode: payload }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer

