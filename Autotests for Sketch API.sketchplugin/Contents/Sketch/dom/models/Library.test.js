var test = require('__autoTest').test;
var expect = require('__autoTest').expect;

var outputPath = require('__autoTest').outputPath;
var Library = require('sketch/dom').Library;
var Document = require('sketch/dom').Document;
var Artboard = require('sketch/dom').Artboard;
var Text = require('sketch/dom').Text;
var SymbolMaster = require('sketch/dom').SymbolMaster;

function findValidLib(libs) {
  return libs.find(l => l.valid)
}
(async () => {
	await test('should list the libraries', () => {
		//BUG : getLibraries returns empty array
		const libraries = Library.getLibraries()
		expect(libraries[0].type).toBe('Library')
	})

	await test('should be able to get the document', () => {
		const libraries = Library.getLibraries()
		const lib = findValidLib(libraries)
		expect(lib.getDocument().type).toBe('Document')
	})

	await test('should be able to get the list of symbols to be imported', () => {
		const document = new Document()
		const libraries = Library.getLibraries()
		const lib = findValidLib(libraries)
		expect(lib.getImportableSymbolReferencesForDocument(document)[0].type).toBe(
			'ImportableObject'
		)
		document.close()
	})

	let lib
	let libId

	await test('should create a library from a document', () => {
		const document = new Document()

		const artboard = new Artboard({
			name: 'Test',
			parent: document.selectedPage,
		})
		// eslint-disable-next-line
		const text = new Text({
			text: 'Test value',
			parent: artboard,
		})
		// eslint-disable-next-line
		const master = SymbolMaster.fromArtboard(artboard)

		return new Promise((resolve, reject) => {
			document.save(
				`${outputPath()}sketch-api-unit-tests-library.sketch`,
				err => {
					if (err) {
						return reject(err)
					}
					return resolve()
				}
			)
		}).then(() => {
			document.close()

			lib = Library.getLibraryForDocumentAtPath(
				`${outputPath()}sketch-api-unit-tests-library.sketch`
			)
			libId = lib.id
			expect(lib.type).toBe('Library')

			const libraries = Library.getLibraries()
			expect(libraries.find(d => d.id === libId)).toEqual(lib)
		})
	})

	await test('should disabled a library', () => {
		expect(lib.enabled).toBe(true)
		lib.enabled = false
		expect(lib.enabled).toBe(false)
		lib.enabled = true
		expect(lib.enabled).toBe(true)
	})

	await test('should get the lastModifiedAt date', () => {
		expect(lib.lastModifiedAt instanceof Date).toBe(true)
	})

	await test('should get the document of the library', () => {
		const document = lib.getDocument()
		expect(document.type).toBe('Document')
		expect(document.path.endsWith('sketch-api-unit-tests-library.sketch')).toBe(true)
	})

	await test('should remove a library', () => {
		lib.remove()

		const libraries = Library.getLibraries()
		expect(libraries.find(d => d.id === libId)).toBe(undefined)
	})

	//await test('should add a remote library', () =>
	//	new Promise((resolve, reject) => {
	//		Library.getRemoteLibraryWithRSS(
	//			'https://client.sketch.cloud/v1/shares/PR8z1/rss',
	//			(err, result) => {
	//				if (err) {
	//					return reject(err)
	//				}
	//				return resolve(result)
	//			}
	//		)
	//	}).then(result => {
	//		expect(result.libraryType).toBe(Library.LibraryType.RemoteThirdParty)
	//		result.remove()
	//	}))

})();