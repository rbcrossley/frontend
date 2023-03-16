const initialData = {
  count: 100,
  data: 500
}
const CounterReducer = (state = initialData, action) => {

  switch (action.type) {
    case "INCREASE_COUNT":
      return {
        ...state, count: ++state.count
      }
    case "DECREASE_COUNT":
      return { ...state, count: --state.count }
    case "RESET_COUNT":
      return { ...state, count: 0 }
    case "INCREASE_DATA":
      return { ...state, data: ++state.data }
    case "DECREASE_DATA":
      return { ...state, data: --state.data }
    case "RESET_DATA":
      return { ...state, data: 0 }

    default:
      return state

  }


}

export default CounterReducer