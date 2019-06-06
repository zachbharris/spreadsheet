import React, { useState } from 'react'

const initialData = [
  [
    { type: 'text', value: '' },
    { type: 'text', value: '' },
    { type: 'number', value: '' }
  ],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }]
]

const Sheet = () => {
  const [data, set] = useState(initialData)
  const handleChange = (event, row, col) => {
    const { value } = event.target

    // dr = data row
    // dc = data column
    const arr = data.map((dr, i) => {
      return i === row
        ? dr.map((dc, ind) => (ind === col ? { ...dc, value } : dc))
        : dr
    })
    return set(arr)
  }

  const handleTypeChange = (event, col) => {
    const { value } = event.target

    // dr = data row
    // dc = data column
    const arr = data.map((dr, row) => {
      if (row !== 0) return dr
      return dr.map((dc, i) => {
        return i === col ? { ...dc, type: value } : dc
      })
    })

    return set(arr)
  }

  const addColumn = () => {
    // dr = data row
    const arr = data.map(dr => {
      dr.push({ type: '', value: '' })
      return dr
    })
    return set(arr)
  }

  const removeColumn = () => {
    // dr = data row
    const arr = data.map(dr => {
      dr.pop()
      return dr
    })
    return set(arr)
  }

  const addRow = () => {
    let mutation = []
    for (let i = 0; i < data[0].length; i++) {
      mutation.push({ value: '' })
    }
    const arr = [...data, mutation]
    return set(arr)
  }

  return (
    <>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={removeColumn}>Remove Column</button>
      <button onClick={addRow}>Add Row</button>
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
  // return data.map((d, row) => {
  //   return (
  //     <div key={row}>
  //       {d.map((item, col) => {
  //         return (
  //           <input
  //             key={col}
  //             value={item}
  //             onChange={e => handleChange(e, row, col)}
  //           />
  //         )
  //       })}
  //     </div>
  //   )
  // })
}

export default Sheet
