var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Style = require('sketch').Style;

test('should create a gradient with some stops', () => {
  const gradient = {
    stops: [
      {
        position: 1,
        color: '#123',
      },
      {
        position: 0,
        color: '#534',
      },
      {
        position: 0.5,
        color: '#1234',
      },
    ],
  }
  var style = new Style({
    fills:[
      {gradient:gradient}
    ]
  })
  
  expect(style.fills[0].gradient.toJSON()).toEqual({
    gradientType: 'Linear',
    from: { x: 0.5, y: 0 },
    to: { x: 0.5, y: 1 },
    aspectRatio: 0,
    stops: [
      { position: 1, color: '#112233ff' },
      { position: 0, color: '#553344ff' },
      { position: 0.5, color: '#11223344' },
    ],
  })
})
