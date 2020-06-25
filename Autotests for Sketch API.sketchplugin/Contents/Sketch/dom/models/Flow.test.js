/* globals expect, test */
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Artboard = require('sketch/dom').Artboard;
var Group = require('sketch/dom').Group;
var Flow = require('sketch/dom').Flow;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

test('should create a flow between a layer and an artboard with a default animation', (context, document) => {
  const artboard = new Artboard({
    name: 'Test1',
    parent: document.selectedPage,
  })
  const artboard2 = new Artboard({
    name: 'Test2',
    parent: document.selectedPage,
  })
  // BUG : JsonApplier does now work correctly
  const rect = new Group({
    parent: artboard,
    flow: {
      target: artboard2,
    },
  })


  expect(rect.flow.toJSON()).toEqual({
    targetId: artboard2.id,
    type: 'Flow',
    animationType: 'slideFromRight',
  })
  expect(rect.flow.isBackAction()).toBe(false)
  expect(rect.flow.isValidConnection()).toBe(true)
})

test('should create a flow between a layer and an artboard with a targetId', (context, document) => {
  const artboard = new Artboard({
    name: 'Test1',
    parent: document.selectedPage,
  })
  const artboard2 = new Artboard({
    name: 'Test2',
    parent: document.selectedPage,
  })

  const rect = new Group({
    parent: artboard,
    flow: {
      targetId: artboard2.id,
    },
  })

  expect(rect.flow.toJSON()).toEqual({
    targetId: artboard2.id,
    type: 'Flow',
    animationType: 'slideFromRight',
  })
})

test('target should return the wrapped artboard', (context, document) => {
  const artboard = new Artboard({
    name: 'Test1',
    parent: document.selectedPage,
  })
  const artboard2 = new Artboard({
    name: 'Test2',
    parent: document.selectedPage,
  })

  const rect = new Group({
    parent: artboard,
    flow: {
      targetId: artboard2.id,
    },
  })

  expect(rect.flow.target).toEqual(artboard2)
})

test('should create a flow between a layer and an artboard with a specific animation', () => {
  const artboard = new Artboard({ name: 'Test1' })
  const artboard2 = new Artboard({ name: 'Test2' })

  const rect = new Group({
    parent: artboard,
    flow: {
      target: artboard2,
      animationType: Flow.AnimationType.slideFromLeft,
    },
  })

  expect(rect.flow.toJSON()).toEqual({
    targetId: artboard2.id,
    type: 'Flow',
    animationType: 'slideFromLeft',
  })
})

test('should create a back action', () => {
  const artboard = new Artboard({ name: 'Test1' })

  const rect = new Group({
    parent: artboard,
    flow: {
      target: Flow.BackTarget,
    },
  })

  expect(rect.flow.toJSON()).toEqual({
    targetId: Flow.BackTarget,
    type: 'Flow',
    animationType: 'slideFromRight',
  })
  expect(rect.flow.isBackAction()).toBe(true)
})

test('adding a flow action with an unknow target work but isValidConnection should return false', () => {
  const artboard = new Artboard({ name: 'Test1' })

  const rect = new Group({
    parent: artboard,
    flow: {
      targetId: 'unknown',
    },
  })

  expect(rect.flow.isValidConnection()).toBe(false)
})
