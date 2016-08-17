import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const initialState = {
  rounds: 1,
  page: "waiting",
  gamemode: "ultimatum",
  participants: {},
  pairs: {}
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {[id]: participant})
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    'change page': (_, { payload }) => ({ page: payload }),
    'change rounds': (_, { payload }) => ({ rounds: payload }),
    'change gamemode': (_, { payload }) => ({ gamemode: payload }),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
