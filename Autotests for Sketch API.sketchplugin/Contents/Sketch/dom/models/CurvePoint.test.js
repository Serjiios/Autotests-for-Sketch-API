var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Document = require('sketch/dom').Document
var ShapePath = require('sketch/dom').ShapePath

test('should be able to modify a CurvePoint', () => {
  const curvePoint = {};
  var shapePath = new ShapePath({
    points:[
      curvePoint
    ]
  });

  expect(shapePath.points[0].toJSON()).toEqual({
    type: 'CurvePoint',
    pointType: 'Undefined',
    cornerRadius: 0,
    curveFrom: { x: 0, y: 0 },
    curveTo: { x: 0, y: 0 },
    point: { x: 0, y: 0 },
  })

  shapePath.points[0].cornerRadius = 3
  expect(shapePath.points[0].cornerRadius).toBe(3)

  shapePath.points[0].curveFrom = {
    x: 25,
    y: 3,
  }
  expect(shapePath.points[0].curveFrom.toJSON()).toEqual({
    x: 25,
    y: 3,
  })

  shapePath.points[0].curveTo = {
    x: 24,
    y: 4,
  }
  expect(shapePath.points[0].curveTo.toJSON()).toEqual({
    x: 24,
    y: 4,
  })

  shapePath.points[0].point = {
    x: 3,
    y: 4,
  }
  expect(shapePath.points[0].point.toJSON()).toEqual({
    x: 3,
    y: 4,
  })
})

test('should show if a point is selected', () => {
  const document = new Document()
  const shape = new ShapePath({
    parent: document.selectedPage,
  })
  expect(shape.points[0].isSelected()).toBe(false)
  //document.close()
})

