import React from 'react'
import * as ReactDOM from 'react-dom/client'

import Dataman from './dataman'
import Grid from './feature/grid/grid'
// import Grid from './feature/grid/voronoi'

const dataman = new Dataman()
const grid = new Grid()
const data = await dataman.load()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Grid data={data}></Grid>
)