import * as d3 from 'd3'
import _ from 'lodash'

const categories = `
diagram
chart
graph
plot
map
`.split('\n').filter(n => n)
const functions = `
comparison
composition
distribution
relationship
concept
`.split('\n').filter(n => n)
const encodingShapes = `
dot
line
area
rectangle
square
sector
circle
polygon
`.split('\n').filter(n => n)
const layout = `
line
multiline
cartesian
polar
barycentric
cylindrical
spherical
geo
curve
cyclical
spiral
serpentine
columns
rows
grid
table
hyperbolic
`.split('\n').filter(n => n)

export default class Dataman {
  constructor () {
    this.data = []
    // this.data = d3.range(11)
    //   .map(d => ({
    //     w: 1// + d,
    //   }))
  }

  async load () {
    return d3.csv('./data/index.csv', this.parse.bind(this))
  }

  parse (d) {
    if (!d.Name || d.Done !== 'TRUE') return

    const vis = {
      name: d.Name,
      altName: d['Alternative Name'],
      category: d.Category,
      variation: d.Variation,
      encodingShapes: _.without(d['Encoding Shapes'].split(', '), '-'),
      layout: d.Layout,
      functions: _.filter(functions, f => d[f] === 'TRUE'),
      data: {
        dimensions: parseInt(d.Dimensions),
        numeric: parseInt(d.Numeric),
        ordinal: parseInt(d.Ordinal),
        colorIsNumeric: d['Color numeric scale'] === 'TRUE',
        graphLinks: d['Graph Links'] === 'TRUE',
        hierarchy: d.Hierarchy === 'TRUE',
      },
    }
    vis.error = !this.validate(vis)
    if (vis.error) console.error(vis)
    // weight
    vis.w = d.variation ? 1 : 5
    return vis
  }

  validate (vis) {
    return !_.isEmpty(vis.layout) &&
      !_.isEmpty(vis.category) &&
      !_.isEmpty(vis.functions) &&
      _.isNumber(vis.data.dimensions) &&
      _.isNumber(vis.data.ordinal) &&
      _.isNumber(vis.data.numeric) &&
      vis.data.dimensions === vis.data.numeric + vis.data.ordinal &&
      categories.includes(vis.category) &&
      _.difference(vis.encodingShapes, encodingShapes).length === 0 &&
      _.difference(vis.functions, functions).length === 0
  }
}