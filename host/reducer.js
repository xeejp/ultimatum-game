import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from '../util/index.js'

const initialState = {
  participants: {},
  pairs: {},
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
    'push results': ({ game_mode, ultimatum_results, dictator_results }, { payload }) => ({
      ultimatum_results: (game_mode == "ultimatum")? ultimatum_results.concat(payload) : ultimatum_results,
      dictator_results: (game_mode == "dictator")? dictator_results.concat(payload) : dictator_results,
    }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
