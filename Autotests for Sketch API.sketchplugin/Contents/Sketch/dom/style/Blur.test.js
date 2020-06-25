/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

var Style = require('sketch').Style;

test('should change the blur', () => {
  const style = new Style()
  expect(style.blur.toJSON()).toEqual({
    center: { x: 0.5, y: 0.5 },
    motionAngle: 0,
    radius: 10,
    enabled: false,
    blurType: 'Gaussian',
  })
  style.blur = {
    center: { x: 2, y: 6 },
    motionAngle: 5,
    radius: 20,
    enabled: true,
    blurType: Style.BlurType.Zoom,
  }
  expect(style.blur.toJSON()).toEqual({
    center: { x: 2, y: 6 },
    motionAngle: 5,
    radius: 20,
    enabled: true,
    blurType: 'Zoom',
  })

  style.blur.motionAngle = 10
  expect(style.blur.toJSON()).toEqual({
    center: { x: 2, y: 6 },
    motionAngle: 10,
    radius: 20,
    enabled: true,
    blurType: 'Zoom',
  })
})
