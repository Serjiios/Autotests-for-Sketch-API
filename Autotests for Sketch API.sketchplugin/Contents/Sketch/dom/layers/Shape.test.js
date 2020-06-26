/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Shape = require('sketch').Shape;
var ShapePath = require('sketch').ShapePath;

test('should create a new shape', () => {
  const shape = new Shape()
  expect(shape.type).toBe('Shape')
})

test('a new shape should have a rectangle shape path if no layers was defined', () => {
  const shape = new Shape()
  
  expect(shape.layers.length).toBe(1)
  expect(shape.layers[0].shapeType).toBe('Rectangle')

  const shape2 = new Shape({
    layers: [
      new ShapePath({
        shapeType: 'Oval',
      }),
    ],
  })
  expect(shape2.layers.length).toBe(1)
  expect(shape2.layers[0].shapeType).toBe('Oval')
})
