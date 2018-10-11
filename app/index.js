const HelperFunctions = require('./HelperFunctions');
const RulesExample = require('./RulesExample');

module.exports = (function () {
    /**
     * returns an instance of JDV
     * @param {Object} rules
     * @param {boolean} is_verbose
     * @constructor
     */
    function JDV(rules = null, is_verbose = false) {
        /**
         * rules getter
         * @returns {Object}
         */
        this.getAllRules = function () {
            return rules;
        };

        /**
         * chained rules setter
         * @param {Object} new_rules
         * @returns {JDV}
         */
        this.setRules = function (new_rules) {
            rules = new_rules;
            return this;
        };

        /**
         * returns rules[ruleName] or null
         * @param {string} ruleName
         * @returns {*}
         */
        this.getRule = function (ruleName) {
            return (rules ? (rules[ruleName] || null) : null);
        };

        /**
         * verbose getter
         * @returns {boolean}
         */
        this.isVerbose = function () {
            return verbose;
        };

        /**
         * chained rules verbose
         * @param {boolean} new_verbose
         * @returns {JDV}
         */
        this.setVerbose = function (new_verbose) {
            verbose = new_verbose;
            return this;
        };
    }

    /**
     * returns true if data is valid
     * @param {*} data
     * @param {string} ruleName
     */
    JDV.prototype.isValid = function (data, ruleName) {
        if (this.getAllRules() == null) {
            if (this.isVerbose()) {
                console.log(
                    'No configuration assigned!' +
                    '\nPlease assign your configuration and try again!' +
                    '\nExample: jsonDataValidator.config = myconfig;'
                );
            }
            return false;
        } else {
            return !!this.validate(data, this.getRule(ruleName));
        }
    };

    /**
     * returns true if data is valid
     * @param {*} data
     * @param {Object} rule
     * @param {string} name
     * @returns {boolean}
     */
    JDV.prototype.validate = function (data, rule, name = 'data') {
        try {
            let isValid = HelperFunctions.typeChecker[HelperFunctions.getTypeFunction(rule.type)](data);

            if (!isValid) {
                if (this.isVerbose()) {
                    console.log(
                        '-----------Validator Error-----------' +
                        '\nObject Path: ' + name +
                        '\nExpected: ' + rule.type +
                        '\nGot: ' + HelperFunctions.getTypeName(data) +
                        '\nValue: ' + data +
                        '\n-------------------------------------'
                    );
                }
                return false;
            } else if (rule.props) {
                Object.keys(rule.props).forEach(
                    value => {
                        isValid &= this.validate(data[value], rule.props[value], name + '.' + value);
                    }
                );
            }

            return !!isValid;
        } catch (e) {
            return false;
        }
    };

    JDV.prototype.rulesExample = function () {
        return RulesExample;
    };

    return JDV;
}());