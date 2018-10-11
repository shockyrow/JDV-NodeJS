/**
 * HelperFunctions class
 * @type {HelperFunctions}
 */
module.exports = {
    typeChecker: {
        /**
         * returns true if value is a string
         * @param value
         * @returns {boolean}
         */
        isString: function (value) {
            return typeof value === 'string' || value instanceof String;
        },

        /**
         * returns true if value is really a number
         * @param value
         * @returns {boolean}
         */
        isNumber: function (value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * returns true if value is an array
         * @param value
         * @returns {boolean}
         */
        isArray: function (value) {
            return !!(value && typeof value === 'object' && value.constructor === Array);
        },

        /**
         * returns true if value is a function
         * @param value
         * @returns {boolean}
         */
        isFunction: function (value) {
            return typeof value === 'function';
        },

        /**
         * returns true if value is an object
         * @param value
         * @returns {boolean}
         */
        isObject: function (value) {
            return !!(value && typeof value === 'object' && value.constructor === Object);
        },

        /**
         * returns true if value is null
         * @param value
         * @returns {boolean}
         */
        isNull: function (value) {
            return value === null;
        },

        /**
         * returns true if value is undefined
         * @param value
         * @returns {boolean}
         */
        isUndefined: function (value) {
            return typeof value === 'undefined';
        },

        /**
         * returns true if value is a boolean
         * @param value
         * @returns {boolean}
         */
        isBoolean: function (value) {
            return typeof value === 'boolean';
        },

        /**
         * returns true if value is a regexp
         * @param value
         * @returns {boolean}
         */
        isRegExp: function (value) {
            return !!(value && typeof value === 'object' && value.constructor === RegExp);
        },

        /**
         * returns true if value is an error object
         * @param value
         * @returns {boolean}
         */
        isError: function (value) {
            return value instanceof Error && typeof value.message !== 'undefined';
        },

        /**
         * returns true if value is a date object
         * @param value
         * @returns {boolean}
         */
        isDate: function (value) {
            return value instanceof Date;
        },

        /**
         * returns true if values is a symbol
         * @param value
         * @returns {boolean}
         */
        isSymbol: function (value) {
            return typeof value === 'symbol';
        }
    },

    /**
     * returns the type checker function name
     * @param {string} type
     * @returns {string}
     */
    getTypeFunction: function (type) {
        return 'is' + type.replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    },

    /**
     * returns the type name of the value
     * @param value
     * @returns {string}
     */
    getTypeName: function (value) {
        let type = '';
        Object.keys(this.typeChecker).forEach(
            typeFunction => {
                if (this.typeChecker[typeFunction](value)) {
                    type = typeFunction.toLowerCase().substr(2);
                }
            }
        );
        return type;
    }
};