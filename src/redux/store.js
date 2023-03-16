import { combineReducers, createStore } from "redux";
import CounterReducer from "./Counterreducer"
import gameReducer from "./gameReducer"

// const myStore = createStore(CounterReducer)

// const myStore = createStore(gameReducer)

const rootReducer = combineReducers({
  counter: CounterReducer,
  game: gameReducer
})

const myStore = createStore(rootReducer)
export default myStore