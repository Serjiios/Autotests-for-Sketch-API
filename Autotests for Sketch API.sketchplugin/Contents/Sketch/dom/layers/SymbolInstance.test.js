var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Artboard = require('sketch').Artboard;
var Text = require('sketch').Text;
var SymbolMaster = require('sketch').SymbolMaster;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

function createSymbolMaster(document) {
  const artboard = new Artboard({
    name: 'Test',
    parent: document.selectedPage,
  })
  const text = new Text({
    text: 'Test value',
    parent: artboard,
  })

  // build the symbol master
  return {
    master: SymbolMaster.fromArtboard(artboard),
    text,
    artboard,
  }
}

var SymbolInstance = require('sketch').SymbolInstance;
var SmartLayout = require('sketch').SmartLayout;

test('should create a instance by setting the master property', (context, document) => {
  const { master } = createSymbolMaster(document)
  const instance = new SymbolInstance({
    parent: document.selectedPage,
    master,
  })

  expect(instance.type).toBe('SymbolInstance')
  expect(instance.master).toEqual(master)
  expect(master.getAllInstances()).toEqual([instance])

})

test('should create a instance by setting the symbolId property', (context, document) => {
  const { master } = createSymbolMaster(document)
  const instance = new SymbolInstance({
    symbolId: master.symbolId,
    parent: document.selectedPage,
  })
  expect(instance.type).toBe('SymbolInstance')
  expect(master.getAllInstances()).toEqual([instance])
  expect(instance.master).toEqual(master)
})

test('should have overrides', (context, document) => {
  const { master, text } = createSymbolMaster(document)
  const instance = master.createNewInstance()
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)

  expect(instance.overrides.length).toBe(1)
  const override = instance.overrides[0]
  const result = {
    type: 'Override',
    id: `${text.id}_stringValue`,
    path: text.id,
    property: 'stringValue',
    symbolOverride: false,
    value: 'Test value',
    isDefault: true,
    editable: true,
    affectedLayer: text.toJSON(),
    selected: false,
  }
  delete result.affectedLayer.selected
  result.affectedLayer.style = instance.overrides[0].affectedLayer.style.toJSON()
  expect(override.toJSON()).toEqual(result)
})

test('should detach an instance', (context, document) => {
  const { master } = createSymbolMaster(document)
  const instance = new SymbolInstance({
    symbolId: master.symbolId,
    parent: document.selectedPage,
  })
  expect(instance.type).toBe('SymbolInstance')

  const group = instance.detach()
  expect(group.type).toBe('Group')
})

test('should resize in response to smart layout changes', (context, document) => {
  const { master } = createSymbolMaster(document)
  master.smartLayout = SmartLayout.LeftToRight

  const instance = new SymbolInstance({
    symbolId: master.symbolId,
    parent: document.selectedPage,
  })

  const initialWidth = instance.frame.width
  instance.overrides[0].value = '0'.repeat(1000)
  instance.resizeWithSmartLayout()
  const widthAfterSmartLayout = instance.frame.width
  expect(initialWidth < widthAfterSmartLayout).toBe(true)
})
