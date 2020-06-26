var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
const base64Image = require('__autoTest').base64Image
var Image = require('sketch').Image;

test('should create an empty image', (context, document) => {
  const page = document.selectedPage

  const image = new Image({ parent: page })

  expect(image.type).toBe('Image')
  expect(image.parent).toEqual(page)
  expect(image.image).toBe(null)
})

test('should resize image to its original size', (context, document) => {
  const page = document.selectedPage
  // BUG : Json applier can't set base64
  const image = new Image({
    image: {
      base64: base64Image,
    },
    parent: page,
  })

  expect(image.frame.width).toBe(100)
  expect(image.frame.height).toBe(100)

  image.resizeToOriginalSize()

  expect(image.frame.width).toBe(50)
  expect(image.frame.height).toBe(50)
})
