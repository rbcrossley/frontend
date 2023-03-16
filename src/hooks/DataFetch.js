import React, { useEffect, useState } from 'react'
import axios from "axios";

const DataFetch = () => {
  const [posts, setposts] = useState([])

  const [limit, setlimit] = useState(20)
  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(res => res.json())
    //   .then(result => setposts(result))
    //   .catch(err => console.log(err))

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res)
      .then(result => setposts(result.data.slice(0, limit)))
      .catch(err => console.log(err))



  }, [limit])


  return (
    <div>

      {
        posts.map((item) => {
          return (
            <div className='p-5 m-3 rounded rounded-3 shadow-lg'>

              <h1>{item.id}</h1>
              <h1>{item.title}</h1>
              <h2>{item.body}</h2>
            </div>

          )
        })
      }
      {limit < 100 && <button className='btn btn-info' onClick={() => setlimit(limit + 20)}>Load More</button>
      }
      {limit > 0 &&
        <button className='btn btn-info' onClick={() => setlimit(limit - 20)}>Load Less</button>}


    </div>
  )
}

export default DataFetch