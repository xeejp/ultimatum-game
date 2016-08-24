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
  finishJudging,
  responseOK,
  responseNG,
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

const initialState = {
  point: 0,
  role: "visitor",
  pair_id: null,
  now_round: 1,
  allo_temp: 100 * Math.round(10 * Math.random()),
  ultimatum_results: [],
  dictator_results: [],
  state: "allocating",
  responsedOK: false,
  responseOK: false,
  responsedNG: false,
  responseNG: false,
  changeRole: false,
  participants_length: 0,
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'sync game progress': (_, { payload }) => ({
      game_progress: payload
    }),
    'sync participants length': (_, { payload }) => ({
      participants_length: payload
    }),
    'show results': (_ , { payload: {ultimatum_results, dictator_results} }) => ({
      ultimatum_results: ultimatum_results,
      dictator_results: dictator_results
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
    [submitAlloTemp]: (_, { payload }) => ({ allo_temp: payload}),
    'change allo_temp': (_, { payload })=> ({ allo_temp: payload}), 
    [finishAllocating]: (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    'finish allocating': (_, { payload }) => ({ state: "judging", allo_temp: payload}),
    [responseOK]: ( {now_round, game_mode, game_round, state, point, role, allo_temp}, { payload }) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? ((game_mode == "ultimatum")? "proposer": "dictator") : "responder",
      point: point + 1000 - payload,
      allo_result: allo_temp,
      allo_temp: 100 * Math.round(10* Math.random()),
      responseOK: true,
    }),
    'response ok': ({now_round, game_mode, game_round, state, point, role, allo_temp}, { payload }) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? ((game_mode == "ultimatum")? "proposer": "dictator") : "responder",
      point: point + payload,
      allo_result: allo_temp,
      allo_temp: 100 * Math.round(10* Math.random()),
      responsedOK: true,
    }),
    [responseNG]: ({state, now_round, game_round, role, game_mode}, {}) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? ((game_mode == "ultimatum")? "proposer": "dictator") : "responder",
      allo_temp: 100 * Math.round(10* Math.random()),
      responseNG: true,
    }),
    'response ng': ({state, now_round, game_round, role, game_mode}, {}) => ({
      state: (now_round < game_round)? "allocating" : "finished",
      now_round: (now_round < game_round)? now_round+1 : now_round,
      role: (role == "responder")? ((game_mode == "ultimatum")? "proposer": "dictator") : "responder",
      allo_temp: 100 * Math.round(10* Math.random()),
      responsedNG: true,
    }),
    [fallSnackBarFlags]: ({ state }) => ({
      responsedOK: false,
      responseOK: false,
      responsedNG: false,
      responseNG: false,
      changeRole: state == "allocating",
    }),
    [fallSnackBarFlags2]: ({}) => ({
      changeRole: false,
    }),
    'change page': (_, { payload }) => ({ page: payload }),
    'change game_round': (_, { payload }) => ({ game_round: payload }),
    'change game_mode': (_, { payload }) => ({ game_mode: payload }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
