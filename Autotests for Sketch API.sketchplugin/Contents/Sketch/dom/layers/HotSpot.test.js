var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Artboard = require('sketch').Artboard;
var Group = require('sketch').Group;
var HotSpot = require('sketch').HotSpot;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

test('should create a new HotSpot', () => {
  const hotspot = new HotSpot()

  expect(hotspot.type).toEqual('HotSpot')
})

test('should create a new HotSpot from a layer', (context, document) => {
  const artboard = new Artboard({
    name: 'Test1',
    parent: document.selectedPage,
  })
  const artboard2 = new Artboard({
    name: 'Test2',
    parent: document.selectedPage,
  })

  // BUG : jsonApplier.Apply cannot set flow.
  // ToDo : test all this module after fixes
  const rect = new Group({
    parent: artboard,
    flow: {
      targetId: artboard2.id,
    },
  })

  const hotspot = HotSpot.fromLayer(rect)

  expect(rect.flow).toBe(undefined)

  expect(hotspot.type).toEqual('HotSpot')
  expect(hotspot.flow.toJSON()).toEqual({
    targetId: artboard2.id,
    type: 'Flow',
    animationType: 'slideFromRight',
  })
})

test('should throw an error when trying to create a new HotSpot from a layer without flow', (context, document) => {
  const artboard = new Artboard({
    name: 'Test1',
    parent: document.selectedPage,
  })

  const rect = new Group({
    parent: artboard,
  })

  try {
    HotSpot.fromLayer(rect)
    expect(false).toBe(true)
  } catch (err) {
    expect(err.message).toMatch(
      'Can only create a HotSpot from a layer with an existing flow'
    )
  }
})
