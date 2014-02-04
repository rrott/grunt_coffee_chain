(function() {
  var Test1;

  Test1 = (function() {
    function Test1() {}

    return Test1;

  })();

}).call(this);

(function() {
  var Test2;

  Test2 = (function() {
    function Test2() {}

    return Test2;

  })();

}).call(this);

(function() {
  var TestLib1;

  TestLib1 = (function() {
    function TestLib1() {}

    return TestLib1;

  })();

}).call(this);

(function() {
  var TestLib2;

  TestLib2 = (function() {
    function TestLib2() {}

    return TestLib2;

  })();

}).call(this);

(function() {
  var Test, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Test = (function(_super) {
    __extends(Test, _super);

    function Test() {
      _ref = Test.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Test;

  })(Test1);

}).call(this);
