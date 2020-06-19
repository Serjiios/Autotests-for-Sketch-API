/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;

function createSharedStyle(document, Primitive, style) {
  const object = new Primitive({
    name: 'Test',
    parent: document.selectedPage,
    ...(style ? { style } : {}),
  })

  const sharedStyles =
    object.style.styleType == Style.StyleType.Layer
      ? document.sharedLayerStyles
      : document.sharedTextStyles

  const newLength = sharedStyles.push({
    name: 'test shared style',
    style: object.style,
  })

  const sharedStyle = sharedStyles[newLength - 1]

  object.sharedStyle = sharedStyle

  return {
    sharedStyle,
    object,
  }
}
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
