var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Group = require('sketch').Group;
var Text = require('sketch').Text;
var Shape = require('sketch').Shape;
var Rectangle = require('sketch').Rectangle;
var SmartLayout = require('sketch').SmartLayout;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

test('should return the layers and can iterate through them', (context, document) => {
  const page = document.selectedPage
  const group = new Group({ parent: page })
  const text = new Text({ parent: page }) // eslint-disable-line

  let iterations = 0
  let groups = 0
  page.layers.forEach(layer => {
    iterations += 1
    if (layer.isEqual(group)) {
      groups += 1
    }
  })
  expect(iterations).toBe(2)
  expect(groups).toBe(1)
})

test('should transform a rectangle in page coords to local coords', (context, document) => {
  const page = document.selectedPage
  const group = new Group({
    parent: page,
    frame: new Rectangle(100, 100, 100, 100),
  })
  // ToDo: Убрать этот тест или реализовать метод. В апи его нет
  const local = group.pageRectToLocalRect(new Rectangle(125, 75, 50, 200))
  expect(local).toEqual(new Rectangle(25, -25, 50, 200))
})

test('should adjust the frame to fit its layers', (context, document) => {
  const page = document.selectedPage
  const group = new Group({
    parent: page,
    frame: new Rectangle(100, 100, 100, 100),
  })
  const shape = new Shape({
    parent: group,
    frame: new Rectangle(50, 50, 50, 50),
  })
  group.adjustToFit()
  expect(shape.parent).toEqual(group)
  expect(group.frame).toEqual(new Rectangle(150, 150, 50, 50))
})

test('should create a group', (context, document) => {
  const page = document.selectedPage

  const group = new Group({ parent: page })

  expect(group.type).toBe('Group')
})

test('should create a group with some layers', (context, document) => {
  const page = document.selectedPage

  const group = new Group({
    parent: page,
    layers: [
      {
        type: 'Text',
        text: 'hello world',
      },
    ],
  })
  expect(group.layers[0].type).toBe('Text')
})

test('should add a layer to a group', (context, document) => {
  const page = document.selectedPage

  const group = new Group({
    parent: page,
    layers: [
      {
        type: 'Text',
        text: 'hello world',
      },
    ],
  })
  expect(group.layers.length).toBe(1)

  group.layers = group.layers.concat({
    type: 'Text',
    text: 'hello world',
  })
  expect(group.layers.length).toBe(2)

  group.layers.push({
    type: 'Text',
    text: 'hello world',
  })
  expect(group.layers.length).toBe(3)
})

test('should expose a smartLayout getter/setter', (context, document) => {
  const page = document.selectedPage
  const group = new Group({
    parent: page,
    layers: [],
  })

  // returns null by default
  // BUG : group.smartLayout = {}
  expect(group.smartLayout).toBe(null)

  // can set to a value
  // BUG : в сеттере group.smartLayout  значение groupNode?.GroupLayout равно null. сеттер не работает
  group.smartLayout = SmartLayout.TopToBottom
  expect(group.smartLayout).toBe(SmartLayout.TopToBottom)

  // can clear the value
  group.smartLayout = null

  expect(group.smartLayout).toBe(null)
})
