import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from 'util/index'

import {
  changeChartRound,
  fallChartButton,
  changePage,
  changeGameRound,
  changeGameRedo,
  changeGameMode,
  reset,
  intoLoading,
  exitLoading,
} from './actions.js'

const initialState = {
  participants: {},
  pairs: {},
  loading: true,
  ultimatum_results: {},
  dictator_results: {},
  chart_round: 1,
  chart_button: false,
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
      page: "waiting",
      game_mode: "ultimatum",
      game_round: 1,
      game_redo: 0,
      game_mode_temp: "ultimatum",
      game_round_temp: 1,
      game_redo_temp: 0,
      pairs: {},
      ultimatum_results: {},
      dictator_results: {},
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    [changeChartRound]: (_, { payload }) => ({ chart_round: payload, chart_button: true}),
    [fallChartButton]: () => ({ chart_button: false}),
    [changePage]: (_, { payload }) => ({
        page: payload,
        game_progress: 0,
    }),
    [changeGameRound]: (_, { payload }) => ({ game_round: payload }),
    [changeGameRedo]: (_, { payload }) => ({ game_redo: payload }),
    [changeGameMode]: (_, { payload }) => ({ game_mode: payload }),
    'push results': ({ game_progress, game_mode, game_round, ultimatum_results, dictator_results, participants, pairs },
    { payload: {id, target_id, pair_id, result: {value, change_count, accept, now_round}} }) => ({
      game_progress: game_progress + 1,
      ultimatum_results: (game_mode == "ultimatum")?
        Object.assign({}, ultimatum_results, {
          [now_round]: {
            [pair_id]: {
              value: value,
              change_count: change_count,
              accept: accept,
            }
          }
        })
      : ultimatum_results,
      dictator_results: (game_mode == "dictator")?
        Object.assign({}, dictator_results, {
          [now_round]: {
            [pair_id]: {
              value: value,
              change_count: change_count,
              accept: accept,
            }
          }
        })
      : dictator_results,
      participants: Object.assign({}, participants, {
        [id]: Object.assign({}, participants[id], {
          point: participants[id].point + value,
        }),
        [target_id]: Object.assign({}, participants[target_id], {
          point: participants[target_id].point + (1000 - value),
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
