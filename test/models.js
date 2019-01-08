const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const CacheItem = require('../models/CacheItem');

describe('User Model', () => {
  it('should create a Cache Item', (done) => {
    const CacheItemMock = sinon.mock(new CacheItem({
      key: 'testKey',
      value: 'testValue'
    }));
    const cacheItem = CacheItemMock.object;

    CacheItemMock
      .expects('save')
      .yields(null);

    cacheItem.save((err) => {
      CacheItemMock.verify();
      CacheItemMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should return error if Cache Item is not created', (done) => {
    const CacheItemMock = sinon.mock(new CacheItem({
      key: 'testKey',
      value: 'testValue'
    }));
    const cacheItem = CacheItemMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    CacheItemMock
      .expects('save')
      .yields(expectedError);

    cacheItem.save((err, result) => {
      CacheItemMock.verify();
      CacheItemMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should not create a Cache Item with the unique key', (done) => {
    const CacheItemMock = sinon.mock(new CacheItem({
      key: 'testKey',
      value: 'testValue'
    }));
    const cacheItem = CacheItemMock.object;
    const expectedError = {
      name: 'MongoError',
      code: 11000
    };

    CacheItemMock
      .expects('save')
      .yields(expectedError);

    cacheItem.save((err, result) => {
      CacheItemMock.verify();
      CacheItemMock.restore();
      expect(err.name).to.equal('MongoError');
      expect(err.code).to.equal(11000);
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should find cacheItem by key', (done) => {
    const CacheItemMock = sinon.mock(CacheItem);
    const expectedItem = {
      _id: '5700a128bd97c1341d8fb365',
      key: 'testKey',
      value: 'testValue'
    };

    CacheItemMock
      .expects('findOne')
      .withArgs({
        key: 'testKey',
      })
      .yields(null, expectedItem);

    CacheItem.findOne({ key: 'testKey', }, (err, result) => {
      CacheItemMock.verify();
      CacheItemMock.restore();
      expect(result.key).to.equal('testKey');
      done();
    });
  });

  it('should remove cacheItem by key', (done) => {
    const CacheItemMock = sinon.mock(CacheItem);
    const expectedResult = {
      nRemoved: 1
    };

    CacheItemMock
      .expects('remove')
      .withArgs({
        key: 'testKey',
      })
      .yields(null, expectedResult);

    CacheItem.remove({ key: 'testKey' }, (err, result) => {
      CacheItemMock.verify();
      CacheItemMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.equal(1);
      done();
    });
  });
});
