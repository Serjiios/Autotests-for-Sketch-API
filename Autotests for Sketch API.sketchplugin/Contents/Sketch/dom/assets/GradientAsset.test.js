/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var GradientAsset = require('sketch').GradientAsset
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

test('should create gradient asset from dictionary', () => {
  const asset = GradientAsset.from({})
  expect(asset.gradient.type).toBe('Gradient')
  expect(asset.name).toBe(null)
})


test('should create gradient asset with name', () => {
  const asset = GradientAsset.from({
    name: 'My Gradient',
    gradient: {},
  })
  expect(asset.gradient.type).toBe('Gradient')
  expect(asset.name).toBe('My Gradient')
})
