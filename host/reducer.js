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
  ultimatum_results: [],
  dictator_results: [],
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'finish allocating': ( { pairs } , { payload }) => ({
      pairs: Object.assign({}, pairs, {
        [payload]: Object.assign({}, [payload], {
          state: "judging",
          now_round: pairs[payload].now_round
        })
      })
    }),
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
    'push results': ({ game_mode, game_round, ultimatum_results, dictator_results, participants, pairs },
    { payload: {id, target_id, allo_temp} }) => ({
      ultimatum_results: (game_mode == "ultimatum")? ultimatum_results.concat(allo_temp) : ultimatum_results,
      dictator_results: (game_mode == "dictator")? dictator_results.concat(allo_temp) : dictator_results,
      participants: Object.assign({}, participants, {
        [id]: Object.assign({}, participants[id], {
          point: participants[id].point + allo_temp,
        }),
        [target_id]: Object.assign({}, participants[target_id], {
          point: participants[target_id].point + (1000 - allo_temp),
        })
      }),
      pairs: Object.assign({}, pairs, {
        [participants[id].pair_id]: Object.assign({}, pairs[participants[id].pair_id], {
          state: (pairs[participants[id].pair_id].now_round < game_round)? "allocating" : "finished",
          now_round: (pairs[participants[id].pair_id].now_round < game_round)? pairs[participants[id].pair_id].now_round + 1 : pairs[participants[id].pair_id].now_round,
        })
      })
    }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
