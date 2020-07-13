var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var CurvePoint = require('sketch').CurvePoint;
var ShapePath = require('sketch').ShapePath;


test('should create a new shape path', () => {
  const shapePath = new ShapePath()
  expect(shapePath.type).toBe('ShapePath')
})

test('should expose PointType', () => {
  expect(ShapePath.PointType.Undefined).toBe(CurvePoint.PointType.Undefined);
})

test('should create shape paths of different shape type', () => {
  Object.keys(ShapePath.ShapeType).forEach(shapeType => {
    const shapePath = new ShapePath({
      shapeType,
    })
    expect(shapePath.type).toBe('ShapePath')
    expect(shapePath.shapeType).toBe(shapeType)
  })
})

test('should return the points of a shape', () => {
  const shapePath = new ShapePath()
  expect(shapePath.points.map(p => p.toJSON())).toEqual([
    {
      type: 'CurvePoint',
      pointType: 'Straight',
      cornerRadius: 0,
      curveFrom: { x: 0, y: 0 },
      curveTo: { x: 0, y: 0 },
      point: { x: 0, y: 0 },
    },
    {
      type: 'CurvePoint',
      pointType: 'Straight',
      cornerRadius: 0,
      curveFrom: { x: 1, y: 0 },
      curveTo: { x: 1, y: 0 },
      point: { x: 1, y: 0 },
    },
    {
      type: 'CurvePoint',
      pointType: 'Straight',
      cornerRadius: 0,
      curveFrom: { x: 1, y: 1 },
      curveTo: { x: 1, y: 1 },
      point: { x: 1, y: 1 },
    },
    {
      type: 'CurvePoint',
      pointType: 'Straight',
      cornerRadius: 0,
      curveFrom: { x: 0, y: 1 },
      curveTo: { x: 0, y: 1 },
      point: { x: 0, y: 1 },
    },
  ])
})


test('should create a shape path from an svg path', () => {
  const svgPath = 'M10 10L90 10L90 90L10 90L10 10'
  const shapePath = ShapePath.fromSVGPath(svgPath)
  expect(shapePath.getSVGPath()).toBe(svgPath)
})

