import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [sheets, set] = useState([])
  const retriveSheets = () => {
    axios
      .get('/api/sheets')
      .then(res => {
        if (res.status === 200) return set(res.data)
      })
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
      .then(res => {
        if (res.status === 200) return set([...sheets, res.data])
      })
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
      {Array.isArray(sheets) && sheets.length ? (
        <ul>
          {sheets.map(({ _id, name }) => (
            <li key={_id}>
              <Link to={`/${_id}`} children={name} />
            </li>
          ))}
        </ul>
      ) : (
        <p>no sheets</p>
      )}
    </>
  )
}

export default Home
