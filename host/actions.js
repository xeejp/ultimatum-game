import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const match = createAction('MATCH')

export const submitPage = createAction('SUBMIT_PAGE', page => page)
export const changePage = createAction('CHANGE_PAGE', page => page)
export const prevPage = createAction('PREV_PAGE')
export const nextPage = createAction('NEXT_PAGE')

export const changeGameRound = createAction('CHANGE_GAME_ROUND', game_round => game_round)
export const incGameRound = createAction('INC_GAME_ROUND')
export const decGameRound = createAction('DEC_GAME_ROUND')

export const changeGameMode = createAction('CHANGE_GAMEMODE', game_mode => game_mode)
export const submitGameMode = createAction('SUBMIT_GAMEMODE', game_mode => game_mode)
