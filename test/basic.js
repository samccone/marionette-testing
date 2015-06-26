chai = require('chai');
chai.should();

jsdom = require("jsdom").jsdom;
global.document = jsdom("<html></html>");
global.window = global.document.parentWindow;

jquery = require("jquery");
_ = require("lodash");
backbone = require("backbone");
backbone.$ = jquery;
Mn = require("backbone.marionette");

describe("rendering", function() {
  beforeEach(function() {
    this.person = new backbone.Model({name: "ryan lost his phone"});

    this.rendered = new Mn.ItemView({
      template: _.template("hi <%= name %>"),
      model: this.person,
      modelEvents: {
        'change': 'render'
      },
      events: {
        "click": function() {
            this.model.set('name', 'tomtom');
        }
      }
    }).render();
  });

  it("should render", function() {
    this.rendered.el.innerHTML.should.eql('hi ryan lost his phone');
  });

  it("should change name on click", function() {
    this.rendered.$el.click();
    this.rendered.el.innerHTML.should.eql('hi tomtom');
  });


  it("should change name when the model is updated", function() {
    this.person.set('name', 'foo');
    this.rendered.el.innerHTML.should.eql('hi foo');
  });
});

