import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Counter2 = () => {

  const [gameName, setGameName] = useState("")
  const [playerName, setPlayerName] = useState("")

  const { count, data } = useSelector(store => store.counter)
  const { game, player } = useSelector(store => store.game)

  const dispatch = useDispatch()



  return (
    <>
      <h1 className='display-1 text-center'>Count:{count}</h1>
      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'INCREASE_COUNT' }) }} >Increase Count</button>

      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'DECREASE_COUNT' }) }} >Decrease Count</button>

      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'RESET_COUNT' }) }} >RESET Count</button>

      <br />

      <h1 className='display-1 text-center'>Data:{data}</h1>
      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'INCREASE_DATA' }) }} >Increase Data</button>

      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'DECREASE_DATA' }) }} >Decrease Data</button>

      <button className='btn btn-primary' onClick={() => { return dispatch({ type: 'RESET_DATA' }) }} >RESET Data</button>

      <h1 className='display-1 text-center'>Game:{game}</h1>
      <input type="text" placeholder='enter game name here' className='form-control' onChange={(e) => { setGameName(e.target.value) }} />
      <button className='btn btn-warning' onClick={() => dispatch({ type: "UPDATE_GAME", payload: gameName })}>Update Game</button>


      <h1 className='display-1 text-center'>player:{player}</h1>
      <input type="text" placeholder='enter game name here' className='form-control' onChange={(e) => { setPlayerName(e.target.value) }} />
      <button className='btn btn-warning' onClick={() => dispatch({ type: "UPDATE_PLAYER", payload: playerName })}>Update player</button>
    </>
  )
}

export default Counter2