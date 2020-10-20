



import { combineReducers } from 'redux'


export const initialState = {
    value1: 5,
    value2: 9
  }

const rootReducer1 = (state= initialState, action, payload) => {
    switch (action.type) {
        case 'ADD_5':
          return { ...state, value1: state.value1 + 5 }
        case 'SUBTRACT_8':
          return { ...state, value1: state.value1 - 8}
        default:
          return state
      }
}

const rootReducer2 = (state= initialState, action, payload) => {
  switch (action.type) {
      case 'ADD_5_TO_VALUE2':
        return { ...state, value2: state.value2 + 5 }
      case 'SUBTRACT_8_2':
        return { ...state, value2: state.value2 - 8}
      default:
        return state
    }
}

const rootReducer = combineReducers({
  value1: rootReducer1,
  value2: rootReducer2
})


export default rootReducer;