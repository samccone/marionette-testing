chai = require('chai');
chai.should();
jsdom = require("jsdom").jsdom
global.document = jsdom("<html></html>")
global.window = global.document.parentWindow

jquery = require("jquery")
_ = require("lodash")
backbone = require("backbone")
backbone.$ = jquery
Mn = require("backbone.marionette")


describe("rendering", function() {
  it("should render", function() {
    var rendered = new Mn.ItemView({
      template: _.template("hi")
    }).render();

    rendered.el.innerHTML.should.eql('hi');
  });
})
