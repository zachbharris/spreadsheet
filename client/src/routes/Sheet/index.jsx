import React, { useState } from 'react'

const initialData = [
  ['', '0', '1'],
  ['a', '', ''],
  ['b', '', ''],
  ['c', '', ''],
  ['d', '', '']
]

const Sheet = () => {
  const [data, set] = useState(initialData)
  const handleChange = (event, row, col) => {
    const { value } = event.target

    // dr = data row
    // dc = data column
    const arr = data.map((dr, i) => {
      return i === row
        ? dr.map((dc, ind) => (ind === col ? (dc = value) : dc))
        : dr
    })

    return set(arr)
  }

  const addColumn = () => {
    const arr = data.map((dr, i) => {
      dr.push('')
      return dr
    })
    return set(arr)
  }

  const removeColumn = () => {
    const arr = data.map(dr => {
      dr.pop()
      return dr
    })
    return set(arr)
  }
  return (
    <>
      <button onClick={addColumn}>Add</button>
      <button onClick={removeColumn}>Remove</button>
      <table>
        <thead>
          <tr>
            {data[0].map((dc, col) => {
              return (
                <th key={col}>
                  <input value={dc} onChange={e => handleChange(e, 0, col)} />
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
                        value={dc}
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
