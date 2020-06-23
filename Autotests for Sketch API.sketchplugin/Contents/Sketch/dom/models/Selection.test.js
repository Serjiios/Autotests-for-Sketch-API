var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Text = require('sketch/dom').Text;
var Group = require('sketch/dom').Group;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

test('an empty document should have an empty selection', (context, document) => {
  expect(document.selectedLayers.isEmpty).toBe(true)
})

test('should clear the selection', (context, document) => {
  const group = new Group({
    parent: document.selectedPage,
    selected: true,
  })
  const selection = document.selectedLayers
  // check that a selection can be logged
  expect(group.selected).toBe(true)
  expect(selection.isEmpty).toBe(false)
  selection.clear()
  expect(group.selected).toBe(false)
  expect(selection.isEmpty).toBe(true)
})

test('should change the selection', (context, document) => {
  const group = new Group({
    parent: document.selectedPage,
    selected: true,
  })
  const selection = document.selectedLayers
  // check that a selection can be logged
  expect(group.selected).toBe(true)
  expect(selection.isEmpty).toBe(false)
  selection.layers = []
  expect(group.selected).toBe(false)
  expect(selection.isEmpty).toBe(true)
})

test('should return the length without wrapping all the object', (context, document) => {
  // eslint-disable-next-line
  const group = new Group({
    parent: document.selectedPage,
    selected: true,
  })
  // eslint-disable-next-line
  const text = new Text({
    parent: document.selectedPage,
    selected: true,
  })
  const selection = document.selectedLayers

  expect(selection.length).toBe(2)
})

test('should be able to go through the layers', (context, document) => {
  const group = new Group({
    parent: document.selectedPage,
    selected: true,
  })
  const text = new Text({
    parent: document.selectedPage,
    selected: true,
  })
  const selection = document.selectedLayers

  let iterations = 0
  let groups = 0
  selection.layers.forEach(layer => {
    iterations += 1
    if (layer.isEqual(group)) {
      groups += 1
    }
  })
  expect(iterations).toBe(2)
  expect(groups).toBe(1)
})

test('should define convenience array methods', (context, document) => {
  const group = new Group({
    parent: document.selectedPage,
    selected: true,
  })
  const text = new Text({
    parent: document.selectedPage,
    selected: true,
  })
  const selection = document.selectedLayers

  expect(selection.forEach).toBeDefined()
  expect(selection.map).toBeDefined()
  expect(selection.reduce).toBeDefined()
})
