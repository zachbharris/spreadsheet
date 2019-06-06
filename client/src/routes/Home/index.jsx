import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [sheets, set] = useState([])
  const retriveSheets = () => {
    axios('/api/sheets')
      .then(res => set(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    retriveSheets()
  }, [])

  if (!sheets.length) return <p>Loading...</p>
  return sheets.map(({ _id, name }) => (
    <Link key={_id} to={`/${_id}`}>
      {name}
    </Link>
  ))
}

export default Home
