var test = require('__autoTest').test;
var expect = require('__autoTest').expect;
var Slice = require('sketch').Slice;
var sketch = require('sketch'); 
var document = sketch.getSelectedDocument();

test('should create an slice', () => {
  const slice = new Slice({ name: 'Test' })
  expect(slice.type).toBe('Slice')
})
