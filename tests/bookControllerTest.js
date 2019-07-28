const should = require('should');
const sinon = require('sinon');
const bookController = require('../controller/bookController');

describe('bookController Test', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const Book = function (book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: 'Cole',
        },
      };

      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is missing').should.equal(true);
    });
  });
});
