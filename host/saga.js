import { put, take, call, select, fork } from 'redux-saga/effects'

import { delay } from "redux-saga";

import {
  fetchContents,
  showResults,
  match,
  submitPage,
  changePage,
  prevPage,
  nextPage,
  changeGameRound,
  incGameRound,
  decGameRound,
  submitGameMode,
  changeGameMode,
} from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* syncGameProgressSaga() {
  while(true) {
    yield call(delay, 2000)
    const game_progress = yield select(({game_progress}) => game_progress)
    const game_round = yield select(({game_round}) => game_round)
    const pairs = yield select(({pairs}) => pairs)
    sendData('SYNC_GAME_PROGRESS', 100 * game_progress / game_round*Object.keys(pairs).length)
  }
}

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* showResultsSaga() {
  while(true) {
    yield take(`${showResults}`)
    const results = {
      ultimatum_results: yield select(({ ultimatum_results }) => ultimatum_results),
      dictator_results: yield select(({ dictator_results }) => dictator_results) 
    }
    sendData('SHOW_RESULTS', results)
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    if (payload == 'result') {
      yield put(showResults())
    }
  }
}

function* nextPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length - 1; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* prevPageSaga() {
  const pages = ["waiting", "description", "experiment", "result"]
  while (true) {
    yield take(`${prevPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 1; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i - 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}
function* incGameRoundSaga() {
  while(true) {
    yield take(`${incGameRound}`)
    const game_round = yield select(( { game_round }) => game_round)
    yield put(changeGameRound(game_round + 1))
  }
}

function* decGameRoundSaga() {
  while(true) {
    yield take(`${decGameRound}`)
    const game_round = yield select(( { game_round }) =>  game_round)
    let next = (game_round <= 1)? 1 : game_round -1
    yield put(changeGameRound(next))
  }
}

function* changeGameRoundSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRound}`)
    sendData('CHANGE_GAME_ROUND', payload)
  }
}

function* changeGameModeSaga() {
  while(true) {
    const { payload } = yield take(`${submitGameMode}`)
    sendData('CHANGE_GAME_MODE', payload)
  }
}

function* saga() {
  yield fork(matchSaga)
  yield fork(syncGameProgressSaga)
  yield fork(showResultsSaga)
  yield fork(changePageSaga)
  yield fork(nextPageSaga)
  yield fork(prevPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeGameRoundSaga)
  yield fork(incGameRoundSaga)
  yield fork(decGameRoundSaga)
  yield fork(changeGameModeSaga)
}

export default saga
