import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [sheets, set] = useState([])
  const retriveSheets = () => {
    axios
      .get('/api/sheets')
      .then(res => set(res.data))
      .catch(err => console.error(err))
  }

  const [form, setForm] = useState({ name: '' })
  const handleChange = e => setForm({ ...form, name: e.target.value })
  const createSheet = e => {
    e.preventDefault()
    axios
      .post('/api/sheets', {
        name: form.name
      })
      .then(res => console.log(res.data))
      .catch(err => console.err(err))
  }

  useEffect(() => {
    retriveSheets()
  }, [])

  return (
    <>
      <form onSubmit={createSheet}>
        <label htmlFor="sheet_name">Sheet Name</label>
        <input
          name="sheet_name"
          id="sheet_name"
          value={form.name}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
      <hr />
      {sheets.length ? (
        sheets.map(({ _id, name }) => (
          <Link key={_id} to={`/${_id}`}>
            {name}
          </Link>
        ))
      ) : (
        <p>no sheets</p>
      )}
    </>
  )
}

export default Home
