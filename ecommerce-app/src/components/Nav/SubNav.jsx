import React from 'react'

const SubNav = ({items}) => {
  return (
    <ul>
        {items.map((i, index) => (
            <li key={index}>{i.display}</li>
        ))}
    </ul>
  )
}

export default SubNav