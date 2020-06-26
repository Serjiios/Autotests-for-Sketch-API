// BUG : NOT IMPLEMENTED
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;

var Image = require('sketch/dom').Image;
var Artboard = require('sketch/dom').Artboard;
var Text = require('sketch/dom').Text;
var SymbolMaster = require('sketch/dom').SymbolMaster;

// using a base64 image cause I'm not sure where and how to keep assets that would work with both local and jenkins tests
const base64Image = require('__autoTest').base64Image;
const base64Image2 =
  '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'

var createSymbolMaster = require('__autoTest').createSymbolMaster;

test('should be able to set overrides', (context, document) => {
  const { master, text } = createSymbolMaster(document)
  const instance = master.createNewInstance()
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)

  expect(instance.overrides.length).toBe(1)
  const override = instance.overrides[0]
  expect(override.isDefault).toBe(true)

  // override
  override.value = 'overridden'

  expect(instance.overrides.length).toBe(1)
  const result = {
    type: 'Override',
    id: `${text.id}_stringValue`,
    path: text.id,
    property: 'stringValue',
    symbolOverride: false,
    value: 'overridden',
    isDefault: false,
    editable: true,
    affectedLayer: text.toJSON(),
    selected: false,
  }
  delete result.affectedLayer.selected
  result.affectedLayer.style = instance.overrides[0].affectedLayer.style.toJSON()
  expect(instance.overrides[0].toJSON()).toEqual(result)
})

test('should change a nested symbol', (context, document) => {
  // build the first symbol master
  const { master: nestedMaster } = createSymbolMaster(document)
  const { master: nestedMaster2 } = createSymbolMaster(document)

  const artboard = new Artboard({
    name: 'Test2',
    parent: document.selectedPage,
  })
  const text2 = new Text({
    text: 'Test value 2',
  })
  const nestedInstance = nestedMaster.createNewInstance()
  artboard.layers = [nestedInstance, text2]

  const master = SymbolMaster.fromArtboard(artboard)

  const instance = master.createNewInstance()

  // add the instance to the page
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)
  expect(instance.overrides.length).toBe(3)

  const override = instance.overrides[1]
  override.value = nestedMaster2.symbolId

  const result = {
    type: 'Override',
    id: `${nestedInstance.id}_symbolID`,
    path: nestedInstance.id,
    property: 'symbolID',
    affectedLayer: nestedInstance.toJSON(),
    symbolOverride: true,
    value: nestedMaster2.symbolId,
    isDefault: false,
    editable: true,
    selected: false,
  }
  delete result.affectedLayer.overrides
  delete result.affectedLayer.selected
  result.affectedLayer.style = instance.overrides[1].affectedLayer.style.toJSON()
  expect(instance.overrides[1].toJSON()).toEqual(result)
})

test('should handle image override', (context, document) => {
  const artboard = new Artboard({
    name: 'Test',
    parent: document.selectedPage,
  })
  // eslint-disable-next-line
  const image = new Image({
    image: {
      base64: base64Image,
    },
    parent: artboard,
  })

  // build the symbol master
  const master = SymbolMaster.fromArtboard(artboard)
  const instance = master.createNewInstance()

  // add the instance to the page
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)
  expect(instance.overrides.length).toBe(1)
  expect(instance.overrides[0].property).toBe('image')
  expect(instance.overrides[0].isDefault).toBe(true)
  expect(instance.overrides[0].value.type).toBe('ImageData')

  instance.overrides[0].value = {
    base64: base64Image2,
  }

  expect(instance.overrides[0].property).toBe('image')
  expect(instance.overrides[0].isDefault).toBe(false)
  expect(instance.overrides[0].value.type).toBe('ImageData')
})

test('hidden layers should not be editable', (context, document) => {
  const { master } = createSymbolMaster(document)
  master.layers[0].hidden = true
  const instance = master.createNewInstance()
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)

  expect(instance.overrides[0].editable).toBe(false)
})

test('should be able to select an override', (context, document) => {
  const { master } = createSymbolMaster(document)
  const instance = master.createNewInstance()
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)

  expect(instance.overrides[0].selected).toBe(false)
  expect(instance.selected).toBe(false)

  instance.overrides[0].selected = true

  expect(instance.overrides[0].selected).toBe(true)
  expect(instance.selected).toBe(true)

  instance.overrides[0].selected = false

  expect(instance.overrides[0].selected).toBe(false)
  expect(instance.selected).toBe(true)
})

test('should be able to access the frame of an override', (context, document) => {
  const { master } = createSymbolMaster(document)
  const instance = master.createNewInstance()
  document.selectedPage.layers = document.selectedPage.layers.concat(instance)

  expect(instance.overrides[0].getFrame().toJSON()).toEqual({
    x: 0,
    y: 0,
    width: 55,
    height: 14,
  })
})
