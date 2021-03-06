var test = require('__autoTest').test;
var expect = require('__autoTest').expect;

var Style = require('sketch').Style;
var GradientType = require('sketch').Style.GradientType;

test('should create a default gradient', () => {

  const gradient = {};

  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  }); 
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })
})

test('should create a gradient with a specific type', () => {
  const gradient = { gradientType: GradientType.Angular };
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  }); 
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Angular',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })
})

test('should create a gradient with a specific from and to coordinates', () => {
  const gradient = {
    from: {
      x: 1,
      y: 0.5,
    },
    to: {
      x: 2,
      y: 5,
    },
  }
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  }); 
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 1, y: 0.5 },
    to: { x: 2, y: 5 },
    aspectRatio: 0,
    stops: [],
  })
})

test('should change the from', () => {
  const gradient = {}
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  }); 
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })
  style.fills[0].gradient.from.x = 0.7
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.7, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })

  style.fills[0].gradient.from.y = 0.1
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.7, y: 0.1 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })

  style.fills[0].gradient.from = {
    x: 0.1,
    y: 0.4,
  }
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.1, y: 0.4 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })
})


test('should change the to', () => {
  const gradient = {};
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  }); 

  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [],
  })
  style.fills[0].gradient.to.x = 0.7
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.7, y: 1 },
    aspectRatio: 0,
    stops: [],
  })

  style.fills[0].gradient.to.y = 0.1
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.7, y: 0.1 },
    aspectRatio: 0,
    stops: [],
  })

  style.fills[0].gradient.to = {
    x: 0.1,
    y: 0.4,
  }
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.1, y: 0.4 },
    aspectRatio: 0,
    stops: [],
  })
})

// https://github.com/sketch-hq/SketchAPI/issues/230
test('should create a gradient with a specific from and to coordinates including 0s', () => {
  const gradient = {
    from: {
      x: 0,
      y: 0,
    },
    to: {
      x: 0,
      y: 0,
    },
  };
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  });

  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    aspectRatio: 0,
    stops: [],
  })
})

test('should set the aspect ratio of a gradient', () => {
  const gradient = {
    gradientType: 'Radial',
  }
  const style = new Style({
    fills: [
      { gradient: gradient }
    ]
  });

  expect(style.fills[0].gradient.aspectRatio).toBe(0)

  style.fills[0].gradient.aspectRatio = 2

  expect(style.fills[0].gradient.aspectRatio).toBe(2)
})
