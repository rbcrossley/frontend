import React, { useState, useEffect } from 'react'


const Counter = () => {
  let [count, setCount] = useState(1000);
  let [count1, setCount1] = useState(100);

  useEffect(() => {
    window.alert("Value updated");
  }, [count, count1])


  const increase_count = () => {
    setCount(count + 100);
    console.log(count);
  }

  const decrease_count = () => {
    setCount(count - 100);
    console.log(count);
  }

  const reset_count = () => {
    setCount(1000);
  }





  const increase_count1 = () => {
    setCount1(count1 + 1);
    console.log(count1);
  }

  const decrease_count1 = () => {
    setCount1(count1 - 1);
    console.log(count1);
  }

  const reset_count1 = () => {
    setCount1(100);
  }


  return (
    <>
      <div>
        <div>Counter: {count}</div>

        {
          count < 2000 &&
          <button onClick={increase_count}>Increase Count</button>
        }

        {count > 0 &&
          <button onClick={decrease_count}>Decrease Count</button>
        }

        <button onClick={reset_count}>Reset Count</button>
      </div>
      <div>
        <div>Counter: {count1}</div>
        <button onClick={increase_count1}>Increase Count</button>
        <button onClick={decrease_count1}>Decrease Count</button>
        <button onClick={reset_count1}>Reset Count</button>
      </div>
    </>
  )
}

export default Counter