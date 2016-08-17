import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const match = createAction('MATCH')

export const submitPage = createAction('SUBMIT_PAGE', page => page)
export const prevPage = createAction('PREV_PAGE')
export const nextPage = createAction('NEXT_PAGE')

export const changeRounds = createAction('CHANGE_ROUNDS', rounds => rounds)
export const submitRounds = createAction('SUBMIT_ROUNDS', rounds => rounds)

export const changeGameMode = createAction('CHANGE_GAMEMODE', gamemode => gamemode)
export const submitGameMode = createAction('SUBMIT_GAMEMODE', gamemode => gamemode)
