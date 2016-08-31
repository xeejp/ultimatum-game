import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from '../util/index.js'

import {
  changeChartRound,
  fallChartButton,
  submitAlloTemp,
  finishAllocating,
  finishJudging,
  responseOK,
  redoAllcating,
  responseNG,
  fallSnackBarFlags,
  fallSnackBarFlags2,
  fallSnackBarFlags3,
} from './actions.js'

const initialState = {
  point: 0,
  role: "visitor",
  pair_id: null,
  chart_round: 1,
  chart_button: false,
  now_round: 1,
  redo_count: 0,
  allo_temp: 100 * Math.round(10 * Math.random()),
  change_count: 0,
  ultimatum_results: {},
  state: "allocating",
  responsedOK: false,
  responseOK: false,
  responsedNG: false,
  responseNG: false,
  changeRole: false,
  redo_flag: false,
  participants_length: 0,
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'sync game progress': (_, { payload }) => ({
      game_progress: payload
    }),
    'reseted': () => ({
      page: "waiting",
      game_round: 1,
      game_redo: 0,
      role: "visitor",
      point: 0,
      pair_id: null,
    }),
    'sync participants length': (_, { payload }) => ({
      participants_length: payload
    }),
    'show results': (_ , { payload: { ultimatum_results } }) => ({
      ultimatum_results: ultimatum_results,
    }),
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {
        [id]: participant
      })
    }),
    'matched': (_, { payload: {
      allo_temp, members, now_round, pair_id,
      point, results, role, state
    } }) => ({
      allo_temp, members, now_round, pair_id,
      point, results, role, state
    }),
    [submitAlloTemp]: ({ change_count }, { payload }) => ({ allo_temp: payload, change_count: change_count + 1}),
    'change allo_temp': ({ change_count }, { payload })=> ({ allo_temp: payload, change_count: change_count + 1}), 
    [finishAllocating]: (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    'finish allocating': (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    [responseOK]: ( {now_round, game_round, state, point, role, allo_temp },
    { payload: { value: value } }) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? "proposer" : "responder",
      point: point + 1000 - value,
      allo_result: allo_temp,
      allo_temp: 100 * Math.round(10* Math.random()),
      responseOK: true,
      change_count: 0,
    }),
    'response ok': ({now_round, game_round, state, point, role, allo_temp},
      { payload }) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? "proposer" : "responder",
      point: point + payload,
      allo_result: allo_temp,
      allo_temp: 100 * Math.round(10* Math.random()),
      responsedOK: true,
      change_count: 0,
    }),
    [responseNG]: ({state, now_round, game_round, role, game_redo, redo_count}, {}) => ({
        state: (now_round < game_round)? "allocating" : "finished",
        now_round: (now_round < game_round)? now_round+1 : now_round,
        role: (role == "responder")? "proposer" : "responder",
        allo_temp: 100 * Math.round(10* Math.random()),
        responseNG: true,
        change_count: 0,
        redo_count: 0,
    }),
    [redoAllcating]: ({redo_count}, {}) => ({
      state: "allocating",
      redo_count: redo_count + 1,
      redo_flag: true,
    }),
    'redo allocating': ({redo_count}, {}) => ({
      state: "allocating",
      redo_count: redo_count + 1,
      redo_flag: true,
    }),
    'response ng': ({state, now_round, game_round, role }, {}) => ({
      redo_count: 0,
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? "proposer" : "responder",
      allo_temp: 100 * Math.round(10* Math.random()),
      responsedNG: true,
      change_count: 0,
    }),
    [fallSnackBarFlags]: ({ state }) => ({
      responsedOK: false,
      responseOK: false,
      responsedNG: false,
      responseNG: false,
      changeRole: state == "allocating",
    }),
    [fallSnackBarFlags2]: ({}) => ({changeRole: false}),
    [fallSnackBarFlags3]: ({}) => ({redo_flag: false}),
    [changeChartRound]: (_, { payload }) => ({ chart_round: payload, chart_button: true }),
    [fallChartButton]: () => ({ chart_button: false}),
    'change page': (_, { payload }) => ({ page: payload }),
    'change inf_redo': (_, { payload }) => ({ inf_redo: payload }),
    'change game_redo': (_, { payload }) => ({ game_redo: payload }),
    'change game_round': (_, { payload }) => ({ game_round: payload }),
    'change game_redo': (_, { payload }) => ({ game_redo: payload }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
