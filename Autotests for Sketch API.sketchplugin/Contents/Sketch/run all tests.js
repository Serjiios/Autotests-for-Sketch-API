var fs = require('fs');
var UI = require('sketch/ui');
var i = 0;

console.log('-------------');
console.log('Async');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/async/async.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('ColorAsset');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/assets/ColorAsset.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('GradientAsset');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/assets/GradientAsset.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Artboard');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Artboard.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Group');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Group.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('HotSpot');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/HotSpot.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Image');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Image.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Layer');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Layer.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Page');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Page.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Shape');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Shape.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('ShapePath');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/ShapePath.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Slice');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Slice.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('StyledLayer');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/StyledLayer.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('SymbolInstance');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/SymbolInstance.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('SymbolMaster');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/SymbolMaster.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('layers_Text');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/layers/Text.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('CurvePoint');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/CurvePoint.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Document');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Document.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('ExportFormat');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/ExportFormat.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Flow');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Flow.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('ImageData');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/ImageData.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('ImportableObject');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/ImportableObject.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Override');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Override.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Point');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Point.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Rectangle');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Rectangle.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Selection');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Selection.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('SharedStyle');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/SharedStyle.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Blur');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Blur.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Border');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Border.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('BorderOptions');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/BorderOptions.test.js",{encoding:"utf8"}));
i += 1;

/*We test color in Artboard.test.js. Probably don't need this
console.log('-------------');
console.log('Color');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Color.test.js",{encoding:"utf8"}));
i += 1;*/

console.log('-------------');
console.log('Fill');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Fill.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Gradient');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Gradient.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('GradientStop');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/GradientStop.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Shadow');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Shadow.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Style');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Style.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('style_Text');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/style/Text.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('export');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/export.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('find');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/find.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('globalAssets');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/globalAssets.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('import');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/import.test.js",{encoding:"utf8"}));
i += 1;

/*Not used
console.log('-------------');
console.log('WrappedObject');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/WrappedObject.test.js",{encoding:"utf8"}));
i += 1;*/

console.log('-------------');
console.log('Settings');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/settings/Settings.test.js",{encoding:"utf8"}));
i += 1;

console.log('-------------');
console.log('Library');
console.log('-------------');
eval(fs.readFileSync(context.scriptPath + "/dom/models/Library.test.js",{encoding:"utf8"}));
i += 1;

UI.alert("Finish", i + " tests completed")