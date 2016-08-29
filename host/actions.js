import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const showResults = createAction('SHOW_RESULTS')

export const match = createAction('MATCH')
export const reset = createAction('RESET')

export const changeChartRound = createAction('CHANGE_CHART_ROUND', chart_round => chart_round)
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const changePage = createAction('CHANGE_PAGE', page => page)
export const changeGameRound = createAction('CHANGE_GAME_ROUND', game_round => game_round)
export const changeGameMode = createAction('CHANGE_GAMEMODE', game_mode => game_mode)
export const changeGameRedo = createAction('CHANGE_GAME_REDO', game_redo => game_redo)
export const changeInfRedo = createAction('CHANGE_INF_REDO', inf_redo => inf_redo)

export const intoLoading = createAction('INTO_LOADING')
export const exitLoading = createAction('EXIT_LOADING')
