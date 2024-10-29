import * as d3 from 'd3'
import _ from 'lodash'
import { voronoiMapInitialPositionPie, voronoiMapSimulation } from 'd3-voronoi-map'
import './voronoi.css'

export default class Voronoi {
  constructor () {
    this.svg = d3.select(document.querySelector('svg'))
    this.imageContainer = d3.select(document.querySelector('.image-container'))
    this.state = {}
    this.p = {
      size: {
        height: 900,
        width: 1440,
      }
    }
  }

  run (data) {
    this.data = data
    const { width, height } = this.p.size
    const simulation = voronoiMapSimulation(this.data)
      .initialPosition(voronoiMapInitialPositionPie())
      .weight(d => d.w)
      .clip([[0, 0], [0, height], [width, height], [width, 0]])
      .maxIterationCount(500)
    // .convergenceRatio(1e-3)

    do {
      simulation.tick()
      this.state = simulation.state()
    } while (!this.state.ended)
    this.render()
  }

  render () {
    _.each(this.state.polygons, d => {
      const path = this.svg.append('polygon')
        .attr('points', _.reduce(d, (_d, point) => _d + point.join(',') + ' ', ''))
      const size = path.node().getBBox()
      const width = Math.max(size.width, size.height)
      this.svg.insert('svg:image', 'polygon')
        .attr('xlink:href', `./data/svg/${d.site.originalObject.data.originalData.name}.svg`)
        .attr('x', d.site.x - width / 2)
        .attr('y', d.site.y - width / 2)
        .attr('width', width)
        .attr('height', width)
    })
  }

  path (polygon) {
    return 'M' + polygon.join('L') + 'Z'
  }

  color (t) {
    return d3.schemeReds[9][((t * 9) / (this.data.length + 1)) | 0]
  }
}