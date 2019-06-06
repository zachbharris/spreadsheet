import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// helpers
import isObjectEmpty from 'helpers/isObjectEmpty'

const Sheet = ({ history, match }) => {
  const [sheet, set] = useState({})
  const { sheetId } = match.params

  const getSheet = useCallback(() => {
    return axios(`/api/sheets/${sheetId}`)
      .then(res => set(res.data))
      .catch(err => console.error(err))
  }, [sheetId])

  useEffect(() => {
    if (isObjectEmpty(sheet)) getSheet()
  }, [getSheet, sheet])

  const handleSave = () => {
    axios
      .patch(`/api/sheets/${sheetId}`, {
        name: sheet.name,
        data: sheet.data
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  const handleDelete = () => {
    axios
      .delete(`/api/sheets/${sheetId}`)
      .then(() => history.push('/'))
      .catch(err => console.error(err))
  }

  // check if sheet has loaded
  if (isObjectEmpty(sheet)) return <p>Loading...</p>

  // parse data
  const data = JSON.parse(sheet.data)

  const handleChange = (event, row, col) => {
    const { value } = event.target
    const data = JSON.parse(sheet.data)

    // dr = data row
    // dc = data column
    const arr = data.map((dr, i) => {
      return i === row
        ? dr.map((dc, ind) => (ind === col ? { ...dc, value } : dc))
        : dr
    })
    return set({ ...sheet, data: JSON.stringify(arr) })
  }

  const handleTypeChange = (event, col) => {
    const { value } = event.target
    const data = JSON.parse(sheet.data)

    // dr = data row
    // dc = data column
    const arr = data.map((dr, row) => {
      if (row !== 0) return dr
      return dr.map((dc, i) => {
        return i === col ? { ...dc, type: value } : dc
      })
    })

    return set({ ...sheet, data: JSON.stringify(arr) })
  }

  const handleNameChange = e => {
    const { value } = e.target
    return set({ ...sheet, name: value })
  }

  const addColumn = () => {
    // dr = data row
    const arr = data.map(dr => {
      dr.push({ type: '', value: '' })
      return dr
    })
    return set({ ...sheet, data: JSON.stringify(arr) })
  }

  const removeColumn = () => {
    // dr = data row
    const arr = data.map(dr => {
      dr.pop()
      return dr
    })
    return set({ ...sheet, data: JSON.stringify(arr) })
  }

  const addRow = () => {
    let mutation = []
    for (let i = 0; i < data[0].length; i++) {
      mutation.push({ value: '' })
    }
    const arr = [...data, mutation]
    return set({ ...sheet, data: JSON.stringify(arr) })
  }

  return (
    <>
      <label>Sheet Name: </label>
      <input value={sheet.name} onChange={handleNameChange} />
      <Link to="/">Go Home</Link>
      <br />
      <br />
      <button onClick={addColumn}>Add Column</button>
      <button onClick={removeColumn}>Remove Column</button>
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
      <table>
        <thead>
          <tr>
            {data[0].map((dc, col) => {
              return (
                <th key={col}>
                  <input
                    type={dc.type}
                    value={dc.value}
                    onChange={e => handleChange(e, 0, col)}
                  />
                  <select
                    onChange={e => handleTypeChange(e, col)}
                    value={dc.type}
                  >
                    <option value="text">text</option>
                    <option value="number">number</option>
                  </select>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((dr, row) => {
            return (
              <tr key={row}>
                {dr.map((dc, col) => {
                  if (row === 0) return null
                  return (
                    <td key={col}>
                      <input
                        type={data[0][col].type}
                        value={dc.value}
                        onChange={e => handleChange(e, row, col)}
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Sheet
