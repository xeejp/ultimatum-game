import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from '../util/index.js'

import {
  submitAlloTemp,
  finishAllocating,
} from './actions.js'

const initialState = {
  game_round: 1,
  page: pages[0],
  game_mode: game_modes[0],
  now_round: 1,
  allo_temp: 500,
  state: states[0],
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {
        [id]: participant
      })
    }),
    'matched': (_, { payload: {
      allo_temp, members, now_round, pair_id,
      point, result, role, state
    } }) => ({
      allo_temp, members, now_round, pair_id,
      point, result, role, state
    }),
    [submitAlloTemp]: (_, { payload }) => ({ allo_temp: payload}),
    'change allo_temp': (_, { payload })=> ({ allo_temp: payload}), 
    [finishAllocating]: (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    'finish allocating': (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    'change page': (_, { payload }) => ({ page: payload }),
    'change game_round': (_, { payload }) => ({ game_round: payload }),
    'change game_mode': (_, { payload }) => ({ game_mode: payload }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
