import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from 'util/index'

import {
  changePage,
  changeGameRound,
  changeGameMode,
  reset,
  intoLoading,
  exitLoading,
} from './actions.js'

const initialState = {
  participants: {},
  pairs: {},
  loading: true,
  ultimatum_results: [],
  dictator_results: [],
}

const reducer = concatenateReducers([
  handleActions({
    [intoLoading]: ({}) => ({ loading: true }),
    [exitLoading]: ({}) => ({ loading: false }),
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
    [reset]: ({}) => ({
      game_progress: 0,
      pairs: {}
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    [changePage]: (_, { payload }) => ({ page: payload }),
    [changeGameRound]: (_, { payload }) => ({ game_round: payload }),
    [changeGameMode]: (_, { payload }) => ({ game_mode: payload }),
    'push results': ({ game_progress, game_mode, game_round, ultimatum_results, dictator_results, participants, pairs },
    { payload: {id, target_id, allo_temp} }) => ({
      game_progress: game_progress + 1,
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
])

export default reducer
