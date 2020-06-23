var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Slice = require('sketch').Slice;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

//Удалить все объекты со страницы
pagelayers = document.selectedPage.layers;
for (var i = 0; i < pagelayers.length; i++){
pagelayers[i].remove()
}

test('should create an slice', () => {
  const slice = new Slice({ name: 'Test' })
  expect(slice.type).toBe('Slice')
})
