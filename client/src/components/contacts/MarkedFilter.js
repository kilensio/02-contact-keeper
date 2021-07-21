import React, { Fragment } from 'react'

const MarkedFilter = ({ text, filter }) => {

  const marked = (text, filter) => {
    const regFilter = new RegExp(`${filter}`, 'gi')
    const result = []
    
    let matched = Array.from(text.matchAll(regFilter))
    const indexes = matched.map((item) => {
      return item.index
    })
  
    let current = 0
    for (let i = 0; i < indexes.length; i++) {
      let start = current
      current = indexes[i]
      result.push(text.slice(start, current))
      start = current
      current += filter.length
      result.push(<mark>{text.slice(start, current)}</mark>)
    }
    result.push(text.slice(current))

    return result
  }

  return marked(text, filter).map((item, i) => <Fragment key={i}>{item}</Fragment>)
}

export default MarkedFilter
