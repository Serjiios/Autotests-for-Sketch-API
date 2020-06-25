/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

var Style = require('sketch').Style;

test('should change the border options', () => {
  const style = new Style()
  expect(style.borderOptions.toJSON()).toEqual({
    startArrowhead: 'None',
    endArrowhead: 'None',
    dashPattern: [],
    lineEnd: 'Butt',
    lineJoin: 'Miter',
  })
  style.borderOptions = {
    startArrowhead: Style.Arrowhead.OpenArrow,
    endArrowhead: Style.Arrowhead.FilledArrow,
    dashPattern: [20, 5],
    lineEnd: Style.LineEnd.Round,
    lineJoin: Style.LineJoin.Bevel,
  }
  expect(style.borderOptions.toJSON()).toEqual({
    startArrowhead: 'OpenArrow',
    endArrowhead: 'FilledArrow',
    dashPattern: [20, 5],
    lineEnd: 'Round',
    lineJoin: 'Bevel',
  })
})

test('should be backward compatible with Style.Arrowhead.ClosedArrow', () => {
  const style = new Style()
  style.borderOptions = {
    startArrowhead: Style.Arrowhead.OpenArrow,
    endArrowhead: Style.Arrowhead.ClosedArrow,
    dashPattern: [20, 5],
    lineEnd: Style.LineEnd.Round,
    lineJoin: Style.LineJoin.Bevel,
  }
  expect(style.borderOptions.toJSON()).toEqual({
    startArrowhead: 'OpenArrow',
    endArrowhead: 'FilledArrow',
    dashPattern: [20, 5],
    lineEnd: 'Round',
    lineJoin: 'Bevel',
  })
})
