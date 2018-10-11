const assert = require('assert');
const jdv = require('../app/index');

describe('Basic Mocha Boolean Test', function () {
    it('should return true with no parameter', function () {
        assert.equal(jdv.mochaTest(), true);
    });

    it('should return true with true as parameter', function () {
        assert.equal(jdv.mochaTest(true), true);
    });

    it('should return false with false as parameter', function () {
        assert.equal(jdv.mochaTest(false), false);
    });
});