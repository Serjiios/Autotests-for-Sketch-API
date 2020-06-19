/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var base64Image = require('__autoTest').base64Image;
var Image = require('sketch/dom').Image;
var Rectangle = require('sketch/dom').Rectangle;

test('should return an ImageData when accessing `image`', (context, document) => {
  const page = document.selectedPage
  // BUG : JsonApplier
  const image = new Image({
    parent: page,
    image: {
      base64: base64Image,
    },
  })
  expect(image.image.type).toBe('ImageData')
})

test('should return image size when accessing `size`', (context, document) => {
  const page = document.selectedPage

  const image = new Image({
    parent: page,
    image: {
      base64: base64Image,
    },
  })
  expect(image.image.size.width).toBe(50)
  expect(image.image.size.height).toBe(50)
})

test('should return image size regardless of scale', (context, document) => {
  const page = document.selectedPage

  const image = new Image({
    parent: page,
    image: {
      base64: base64Image,
    },
  })
  image.frame = new Rectangle(0, 0, 300, 200)
  expect(image.image.size.width).toBe(50)
  expect(image.image.size.height).toBe(50)
})
