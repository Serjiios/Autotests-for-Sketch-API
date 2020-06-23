/* globals expect, test */
// BUG : globalAssets not implenemted
var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var ColorAsset = require('sketch').ColorAsset
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

test('should create color asset from hex', () => {
  const asset = ColorAsset.from('#FFFFFF')
  expect(asset.color).toBe('#ffffffff')
  expect(asset.name).toBe(null)
})

test('should create color asset with name', () => {
  const asset = ColorAsset.from({
    name: 'White',
    color: '#ffffff',
  })
  expect(asset.color).toBe('#ffffffff')
  expect(asset.name).toBe('White')
})
