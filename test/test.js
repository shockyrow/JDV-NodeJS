const assert = require('assert');
const JDV = require('../app/index');

describe('JDV test', function () {
    describe('configuration get/set test', function () {
        it('should return "Hi"', function () {
            let jdv = new JDV();
            jdv.setRules('hi');
            assert.equal(jdv.getAllRules(), "hi");
        });

        it('should return "Hi" (chained functions)', function () {
            let jdv = new JDV();
            assert.equal(jdv.setRules('hi').getAllRules(), "hi");
        });
    });

    describe('validation test', function () {
        let jdv = new JDV();

        it('should return true for data: "hello", rule: {type: "string"}', function () {
            assert.equal(jdv.validate('hello', {type: 'string'}), true);
        });

        it('should return false for data: 123, rule: {type: "string"}', function () {
            assert.equal(jdv.validate(123, {type: 'string'}), false);
        });

        it('should return true for data: {msg: "hello"}, rule: {type: "object", props: {msg: {type: "string"}}}', function () {
            assert.equal(jdv.validate({msg: 'hello'}, {type: 'object', props: {msg: {type: 'string'}}}), true);
        });
    });
});