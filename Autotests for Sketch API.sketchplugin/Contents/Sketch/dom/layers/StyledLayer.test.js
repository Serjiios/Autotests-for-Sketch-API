var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var createSharedStyle = require('__autoTest').createSharedStyle;
var Shape = require('sketch').Shape;

test('should get a style', () => {
  const shape = new Shape()
  expect(shape.style.type).toBe('Style')
})

test('should create a Layer with a style property', () => {
  const shape = new Shape({
    style: {
      fills: [],
    },
  })
  expect(shape.style.type).toBe('Style')
})

test('should set a shared style', (context, document) => {
  const shape = new Shape()
  const { sharedStyle } = createSharedStyle(document, Shape, {
    fills: ['#111'],
  })
  shape.sharedStyleId = sharedStyle.id
  expect(shape.sharedStyleId).toBe(sharedStyle.id)

  const { sharedStyle: sharedStyle2 } = createSharedStyle(document, Shape, {
    fills: ['#222'],
  })

  shape.sharedStyle = sharedStyle2
  expect(shape.sharedStyleId).toBe(sharedStyle2.id)
})
