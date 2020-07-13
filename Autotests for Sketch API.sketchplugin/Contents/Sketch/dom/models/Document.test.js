var test = require('__autoTest').test;
var expect = require('__autoTest').expect;

var fs = require('fs');
var outputPath = require('__autoTest').outputPath;

var Document = require('sketch/dom').Document
var Group = require('sketch/dom').Group
var Shape = require('sketch/dom').Shape
var Text = require('sketch/dom').Text

const ColorSpaceMap = require('__autoTest').ColorSpaceMap;

var createSharedStyle = require('__autoTest').createSharedStyle;
var createSymbolMaster = require('__autoTest').createSymbolMaster;


test('should return the pages', (context, document) => {
    const { pages } = document
    expect(pages.length).toBe(1)
    expect(pages[0].id).toEqual(document.selectedPage.id)
})

test('should return the selected layers', (context, document) => {
    const selection = document.selectedLayers
    expect(selection.isEmpty).toBe(true)

    const page = document.selectedPage
    const group = new Group({
        name: 'Test',
        parent: page,
        selected: true,
    })

    expect(group.selected).toBe(true)
    expect(selection.isEmpty).toBe(false)

    document.selectedLayers = [] // eslint-disable-line
    expect(selection.isEmpty).toBe(true)
})

test('should look for a layer by its id', (context, document) => {
    const page = document.selectedPage
    const group = new Group({
        name: 'Test',
        parent: page,
    })
    const { id } = group
    const found = document.getLayerWithID(id)
    expect(found.id).toEqual(group.id)
})

test('should look for a layer by its name', (context, document) => {
    const page = document.selectedPage
    const group = new Group({
        name: 'Test',
        parent: page,
    })
    const found = document.getLayersNamed('Test')
    expect(found[0].id).toEqual(group.id)
})

test('should look for a symbol by its symbolId', (context, document) => {
    // BUG : Text not working
    const { master } = createSymbolMaster(document)

    expect(document.getSymbolMasterWithID(master.symbolId)).toEqual(master)
})

test('should list all the symbols', (context, document) => {
    // BUG : Text not working
    const { master } = createSymbolMaster(document)

    expect(document.getSymbols()).toEqual([master])
})

test('should look for a shared layer style by its id', (context, document) => {
    // BUG : Problems with sharedStyle.id
    const { sharedStyle } = createSharedStyle(document, Shape)

    expect(document.getSharedLayerStyleWithID(sharedStyle.id)).toEqual(
        sharedStyle
    )
})

test('should list all the shared layer styles', (context, document) => {
    const { sharedStyle } = createSharedStyle(document, Shape)

    expect(document.sharedLayerStyles.length).toBe(1)
    expect(document.sharedLayerStyles[0]).toEqual(sharedStyle)

    document.sharedLayerStyles.push({
        name: 'test2',
        style: { fills: ['#000'] },
    })

    expect(document.sharedLayerStyles.length).toBe(2)

    document.sharedLayerStyles.pop()

    expect(document.sharedLayerStyles.length).toBe(1)
})

test('should look for a shared text style by its id', (context, document) => {
    const { sharedStyle } = createSharedStyle(document, Text)

    expect(document.getSharedTextStyleWithID(sharedStyle.id)).toEqual(sharedStyle)
})

test('should list all the shared text styles', (context, document) => {
    const { sharedStyle } = createSharedStyle(document, Text)

    expect(document.sharedTextStyles.length).toBe(1)
    expect(document.sharedTextStyles[0]).toEqual(sharedStyle)
})

test('should reset document colors', (context, document) => {
    const doc = document
    // BUG : colors setter not working
    doc.colors = ['#FFFFFF', '#AAAAAA']
    expect(document.colors[0].color).toEqual('#ffffffff')
    expect(document.colors[1].color).toEqual('#aaaaaaff')
})

test('should append document colors', (context, document) => {
    const doc = document
    doc.colors = ['000000']
    doc.colors.push('#FFFFFF')
    expect(document.colors.length).toEqual(2)
    expect(document.colors[1].color).toEqual('#ffffffff')
})

test('should remove document color', (context, document) => {
    const doc = document
    doc.colors = ['#FFFFFF', '#000000']
    expect(document.colors.length).toEqual(2)
    doc.colors.splice(1, 1)
    expect(document.colors.length).toEqual(1)
    expect(document.colors[0].color).toEqual('#ffffffff')
})

test('should reset document gradients', (context, document) => {
    const doc = document
    doc.gradients = [
        {
            gradient: {},
            name: 'Gradient 1',
        },
        {
            gradient: {},
            name: 'Gradient 2',
        },
    ]
    expect(document.gradients[0].name).toEqual('Gradient 1')
    expect(document.gradients[1].name).toEqual('Gradient 2')
})

test('should append document gradients', (context, document) => {
    const doc = document
    doc.gradients = [{ gradient: {}, name: 'Gradient 1' }]
    // BUG : push does not change the array
    doc.gradients.push({ gradient: {}, name: 'Gradient 2' })
    expect(document.gradients.length).toEqual(2)
    expect(document.gradients[0].name).toEqual('Gradient 1')
    expect(document.gradients[1].name).toEqual('Gradient 2')
})

test('should remove document gradients', (context, document) => {
    const doc = document
    doc.gradients = [
        {
            gradient: {},
            name: 'Gradient 1',
        },
        {
            gradient: {},
            name: 'Gradient 2',
        },
    ]
    expect(document.gradients.length).toEqual(2)
    // BUG : splice does not change the array
    doc.gradients.splice(0, 1)
    expect(document.gradients.length).toEqual(1)
    expect(document.gradients[0].name).toEqual('Gradient 2')
})

// some tests cannot really run on jenkins because it doesn't have access to MSDocument
//if (!isRunningOnJenkins()) {
let _document
let documentId
// BUG : Document constructor does not work
test('should create a new document', () => {
    _document = new Document()
    documentId = _document.id
    const documents = Document.getDocuments()
    expect(_document.type).toBe('Document')
    expect(documents.find(d => d.id === documentId)).toEqual(_document)
})

test('path should be undefined before saving it', () => {
    expect(_document.path).toBe(undefined)
})

test('should save a file', () =>
    new Promise((resolve, reject) => {
        _document.save(
            `${outputPath()}/sketch-api-unit-tests.sketch`,
            (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            }
        )
    }).then(result => {
        expect(result).toBe(_document)
        expect(_document.path).toBe(
            String(`${outputPath()}/sketch-api-unit-tests.sketch`)
        )
    }))

test('should save a file without specifying the path', () =>
    new Promise((resolve, reject) => {
        _document.save((err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    }).then(result => {
        expect(result).toBe(_document)
        expect(_document.path).toBe(
            String(`${outputPath()}/sketch-api-unit-tests.sketch`)
        )

    }))

test('should save a file to a specific path when setting the path', () => {
    _document.path = `${outputPath()}sketch-api-unit-tests-2.sketch`
    return new Promise((resolve, reject) => {
        _document.save((err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    }).then(result => {
        expect(result).toBe(_document)
        expect(_document.path).toBe(
            String(`${outputPath()}/sketch-api-unit-tests-2.sketch`)
        )

    })
})

test('should close a file', () => {
    _document.close()
    const documents = Document.getDocuments()
    expect(documents.find(d => d.id === documentId)).toBe(undefined)
})

test('should open a file', () => {
    const document = Document.open(
        `${outputPath()}/sketch-api-unit-tests.sketch`
    )
    const documents = Document.getDocuments()
    expect(documents.find(d => d.id === document.id)).toEqual(document)
    // close it again because when watching the tests, it will open dozens of documents
    document.close()
})

test('should fail to open a non-existing file', () => {
    try {
        Document.open(`${outputPath()}/non-existing-sketch-api-unit-tests.sketch`)
        expect(true).toBe(false)
    } catch (err) {
        expect(err.message).toMatch(
            'couldn’t be opened because there is no such file'
        )
    }
})

test('should have defined colorSpace enums', () => {
    expect(Document.ColorSpace.Unmanaged).toBe('Unmanaged')
    expect(Document.ColorSpace.sRGB).toBe('sRGB')
    expect(Document.ColorSpace.P3).toBe('P3')
    expect(ColorSpaceMap.Unmanaged).toBe(0)
    expect(ColorSpaceMap.sRGB).toBe(1)
    expect(ColorSpaceMap.P3).toBe(2)
})

test('should have a colorSpace getter', (context, document) => {
    expect(document.colorSpace).toBe(Document.ColorSpace.Unmanaged)
})

test('colorSpace setter should assign color profiles', (context, document) => {
    // eslint-disable-next-line no-param-reassign
    document.colorSpace = Document.ColorSpace.sRGB
    expect(document.colorSpace).toBe(Document.ColorSpace.sRGB)
    // eslint-disable-next-line no-param-reassign
    document.colorSpace = Document.ColorSpace.P3
    expect(document.colorSpace).toBe(Document.ColorSpace.P3)
})

test('throws when setting an invalid colorSpace', (context, document) => {
    try {
        // eslint-disable-next-line no-param-reassign
        document.colorSpace = 'foo'
        expect(true).toBe(false)
    } catch (err) {
        expect(err instanceof Error).toBe(true)
    }
})

test('throws when changing to an invalid color space', (context, document) => {
    try {
        document.changeColorSpace('foo')
        expect(true).toBe(false)
    } catch (err) {
        expect(err instanceof Error).toBe(true)
    }
})

test('can assign the sRGB color space', (context, document) => {
    document.changeColorSpace(Document.ColorSpace.sRGB)
    expect(document.colorSpace).toBe(Document.ColorSpace.sRGB)
})

test('can convert to the sRGB color space', (context, document) => {
    document.changeColorSpace(Document.ColorSpace.sRGB, true)
    expect(document.colorSpace).toBe(Document.ColorSpace.sRGB)
})

test('can assign the P3 color space', (context, document) => {
    document.changeColorSpace(Document.ColorSpace.P3)
    expect(document.colorSpace).toBe(Document.ColorSpace.P3)
})

test('can convert to the P3 color space', (context, document) => {
    document.changeColorSpace(Document.ColorSpace.P3, true)
    expect(document.colorSpace).toBe(Document.ColorSpace.P3)
})
//}
