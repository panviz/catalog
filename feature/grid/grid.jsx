import React from 'react'
import _ from 'lodash'

import './grid.css'

export default function Grid (p = {}) {
  return (
    <div className="grid">{
    _.map(p.data, d => (
      <img key={d.name} src={ `./data/svg/${ d.name }.svg`}/>
    ))
    }</div>
  )
}