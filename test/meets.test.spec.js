const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const fetchUrl = require('fetch').fetchUrl;


// Helper method to identify if files exist within the file system
const testItemExists = async (filePath) => {
  const fileExists = await fsPromise.access(filePath, fs.F_OK)
    .then(() => true)
    .catch((error) => false);
  return fileExists;
};
// Helper method to locate strings within files
const testFileContainsString = async (filePath, searchString) => {
  const searchStringExists =
  await fsPromise.readFile(filePath)
    .then((fileContents) => fileContents.includes(searchString))
    .catch((error) => false);
  return searchStringExists;
};

describe('Mocha', function () {
  it('should execute properly', function () {
    expect(true).to.be.true;
  });
});
describe('meets expectations', function () {
  describe('Validate instructions 01', function () {
    describe('.gitignore', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\.gitignore');
        expect(actual).to.be.true;
      });
      it('file should contain node_modules', async function () {
        const actual = await testFileContainsString(global.appRoot + '\\.gitignore', 'node_modules');
        expect(actual).to.be.true;
      });
    });

    describe('README.md', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\README.md');
        expect(actual).to.be.true;
      });
    });
    describe('Express Application Generator', function () {
      it('should have an app.js file', async function () {
        const actual = await testItemExists(global.appRoot + '\\app.js');
        expect(actual).to.be.true;
      });
      describe('should have a valid bin folder', function () {
        it('bin folder should exist', async function () {
          const actual = await testItemExists(global.appRoot + '\\bin');
          expect(actual).to.be.true;
        });
        it('bin folder should contain www file', async function () {
          const actual = await testItemExists(global.appRoot + '\\bin\\www');
          expect(actual).to.be.true;
        });
      });
    });
  });

  context('Validate instructions 02', function () {

  });

  context('Validate instructions 03', function () {
    describe('config/config.json', function(){
      it ('dialect should be set to sqlite, storage to library.db', async function () {
        const actual = await testFileContainsString(global.appRoot + '\\config\\config.json', 'sqlite');
        expect(actual).to.be.true;
    });
  });

  context('Validate instructions 04', function () {
    const Book = require(`${global.appRoot}/models`).Book;
    let bookInfo;
    let testBook = {};

    before( async () => {
      bookInfo = {
        title: 'Test Title',
        author: 'Testy McTesterson',
        genre: 'testing',
        year: 1999
      }

      testBook = await Book.create(bookInfo);
    });

    describe('models folder', () => {
      it('should contain a book.js file', async () => {
        const actual = await testItemExists(`${global.appRoot}/models/book.js`);
        expect(actual).to.be.true;
      });
    });

    describe('Book model', () => {
      it('should have a "title" property set to data type of "string"', async () => {
        const actual = await testBook;
        expect(actual).to.have.property('title');
        expect(actual.title).to.be.a('string');
      });
      it('should have a "author" property set to data type of "string"', async () => {
        const actual = await testBook;
        expect(actual).to.have.property('author');
        expect(actual.author).to.be.a('string');
      });
      it('should have a "genre" property set to data type of "string"', async () => {
        const actual = await testBook;
        expect(actual).to.have.property('genre');
        expect(actual.genre).to.be.a('string');
      });
      it('should have a "year" property set to data type of "integer"', async () => {
        const actual = await testBook;
        expect(actual).to.have.property('year');
        expect(actual.year).to.be.a('number');
      });
    });

    describe('title property', () => {
      let createError;
      let updateError;

      before( async () => {

        bookInfo = {
          title: '',
          author: 'Testy McTesterson',
          genre: 'testing',
          year: 1999
        }

        try {
          await Book.create(bookInfo);
        } catch (err) {
          createError = err
        }

        try {
          await testBook.update(bookInfo);
        } catch (err) {
          updateError = err
        }

      })

      it('should have an "allowNull" property set to false', () => {
        expect(createError).to.not.be.empty;
      });
      it('return an error message when null item is inserted', () => {
        const actual = createError.message;
        expect(actual).to.not.be.empty;
      });
      it('return an error message when null item is updated', () => {
        const actual = updateError.message;
        expect(actual).to.not.be.empty;
      });
    })

    describe('author property', () => {
      let createError;
      let updateError;

      before( async () => {

        bookInfo = {
          title: 'Test Title',
          author: '',
          genre: 'testing',
          year: 1999
        }

        try {
          await Book.create(bookInfo);
        } catch (err) {
          createError = err
        }

        try {
          await testBook.update(bookInfo);
        } catch (err) {
          updateError = err
        }

      })
      it('should have an "allowNull" property set to false', () => {
        expect(createError).to.not.be.empty;
      });
      it('return an error message when null item is inserted', () => {
        const actual = createError.message;
        expect(actual).to.not.be.empty;
      });
      it('return an error message when null item is updated', () => {
        const actual = updateError.message;
        expect(actual).to.not.be.empty;
      });
    })
  });

  context('Validate instructions 05', function () {

  });

  context('Validate instructions 06', function () {
    describe('Book create', function(){
      const Book = require(global.appRoot +'/models').Book;
      it('should create book with id in db', async function(){
          const book = {title: 'title', author: 'author'}
          const createdBook = await Book.create(book);
          const actual = createdBook.id;
          expect(actual).to.be.finite;
          expect(actual).to.be.above(0);
      })
    })
  });

  context('Validate instructions 07', function () {
    describe('', function () {
      it('should have \'page-not-found\' in head of doc', function (done) {
        fetchUrl('http://localhost:3000/fake', function (error, meta, body) {
          const actual = body.toString();
          expect(actual.includes('<title>404 Page Not Found</title>')).to.be.true;
          done();
        });
      });

      it('should have a response status of 404', function (done) {
        fetchUrl('http://localhost:3000/fake', function (error, meta, body) {
          const actual = meta.status
          expect(actual).to.equal(404);
          done();
        });
      });

      it('expect 500 error', function (done) {
        fetchUrl('http://localhost:3000/books/error/500', function (error, meta, body) {
          const actual = meta.status;
          expect(actual).to.equal(500);
          done();
        });
      });
    });
  });

  context('Validate instructions 08', function () {
    describe('routes/index.js', function(){
      it ('should have a new book route', function (done){
          fetchUrl('http://localhost:3000/books/new', function (error, meta, body){
              const actual = body.toString();
              expect(actual).to.include('<title>New Book</title>');
              done();
          });
      });
    });
  });
  
  
  context('Validate instructions 09', function () {
    describe('layout.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\layout.pug');
        expect(actual).to.be.true;
      });
    });
    describe('index.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\index.pug');
        expect(actual).to.be.true;
      });
    });
    describe('new-book.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\new-book.pug');
        expect(actual).to.be.true;
      });
    });
    describe('update-book.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\update-book.pug');
        expect(actual).to.be.true;
      });
    });
    describe('error.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\error.pug');
        expect(actual).to.be.true;
      });
    });
    describe('page-not-found.pug', function () {
      it('file should exist', async function () {
        const actual = await testItemExists(global.appRoot + '\\views\\page-not-found.pug');
        expect(actual).to.be.true;
      });
    })
  });

  context('Validate instructions 10', function () {
    describe('models/book', function(){
      it ('tests that validator exists', async function () {
        const actual = await testFileContainsString(global.appRoot + '\\models\\book.js', 'Please provide a value for "Title"');
        expect(actual).to.be.true;
    });
  });
  });

  context('Validate instructions 11', function () {

  });
  context('Validate instructions 12', function () {

  });
  context('Validate instructions 13', function () {

  });
  context('Validate instructions 14', function () {

  });
});
});