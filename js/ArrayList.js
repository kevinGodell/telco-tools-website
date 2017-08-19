function ArrayList(source, callback) {
    var _source;
    var _callback;
    var _length;

    //todo addItems & addItemsAt & removeItems & removeItemsAt

    this.setCallback = function (callback) {
        if (!callback || typeof callback !== "function") {
            throw new TypeError("ArrayList['callback is not a function']");
        }
        _callback = callback;
    };

    this.setSource = function (source) {
        if(Array.isArray(source) !== true) {
            throw new TypeError("ArrayList['source is not an array']");
        }
        _source = source;
        var oldLength = _length;
        _length = _source.length;
        _callback({action: "SourceSet", source: _source, length: _length, oldLength: oldLength});
    };

    this.addItem = function addItem (item) {
        this.addItemAt(item, _length);
    };

    this.addItemAt = function (item, index) {
        if (index < 0 || index > _length) {
            throw new RangeError("ArrayList['index out of bounds']");
        }
        if (index === 0) {
            _source.unshift(item);
        } else if (index === _length) {
            _source.push(item);
        } else {
            _source.splice(index, 0, item);
        }
        var oldLength = _length;
        _length = _source.length;
        _callback({action: "ItemAdded", source: _source, length: _length, oldLength: oldLength, position: index});
    };

    this.getItem = function () {
        return this.getItemAt(_length - 1);
    };

    this.getItemAt = function (index) {
        if (index < 0 || index >= _length) {
            throw new RangeError("ArrayList['index out of bounds']");
        }
        return _source[index];
    };

    this.replaceItem = function (item) {
        this.replaceItemAt(item, _length - 1);
    };

    this.replaceItemAt = function (item, index) {
        if (index < 0 || index >= _length) {
            throw new RangeError("ArrayList['index out of bounds']");
        }
        _source[index] = item;
        _callback({action: "ItemReplaced", source: _source, length: _length, index: index});
    };

    this.removeItem = function () {
        this.removeItemAt(_length - 1);
    };

    this.removeItemAt = function (index) {
        if (index < 0 || index >= _length) {
            throw new RangeError("ArrayList['index out of bounds']");
        }
        var oldLength = _length;
        if (index === 0) {
            _source.shift();
        } else if (index === oldLength - 1) {
            _source.pop();
        } else {
            _source.splice(index, 1);
        }
        _length = _source.length;
        _callback({action: "ItemRemoved", source: _source, length: _length, oldLength: oldLength});
    };

    this.getSource = function () {
        return _source;
    };

    this.getLength = function () {
        return _length;
    };

    this.reset = function () {
        this.resetSource();
        this.resetCallback();
    };

    this.resetSource = function () {
        this.setSource([]);
    };

    this.resetCallback = function () {
        _callback = function (obj) {
            console.log("ArrayList["+JSON.stringify(obj)+"]");
        };
    };

    this.toArray = function () {
        return _source.concat();
    };

    this.toString = function () {
        return _source.toString();
    };

    this.toJSON = function () {
        return JSON.stringify(_source);
    };

    //todo does this need to be at the end?
    //code below runs when ArrayList object created

    if (callback && typeof callback === "function") {
        _callback = callback;
    } else {
        this.resetCallback();
    }

    if (Array.isArray(source) === true) {
        //this.setSource(source);
        _source = source;
        _length = _source.length;
    } else {
        //this.resetSource();
        _source = [];
        _length = 0;
    }

    _callback({action: "Initialized", source: _source, length: _length});
}