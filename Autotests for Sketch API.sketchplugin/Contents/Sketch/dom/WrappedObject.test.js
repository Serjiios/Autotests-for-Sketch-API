/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

import { WrappedObject } from '../WrappedObject'

test('should keep the wrapped object in sketchObject', () => {
  const object = MSLayer.new()
  const wrapped = WrappedObject.fromNative(object)
  expect(wrapped.sketchObject).toBe(object)
})

test('should expose the ID of the object', () => {
  const object = MSLayer.new()
  const wrapped = WrappedObject.fromNative(object)
  expect(wrapped.id).toBe(String(object.objectID()))
})

test('should have _isWrappedObject set to true', () => {
  const object = MSLayer.new()
  const wrapped = WrappedObject.fromNative(object)
  expect(wrapped._isWrappedObject).toBe(true)
})
