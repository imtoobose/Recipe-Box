var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Ingredient = React.createClass({
  displayName: "Ingredient",

  render: function () {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "ingredient", id: "ing-" + this.props.name }),
      this.props.name
    );
  }
});

var IngredientBox = React.createClass({
  displayName: "IngredientBox",

  getDefaultProps: function () {
    return {
      "ingredients": ["coconut"]
    };
  },

  render: function () {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "ingbox", id: "ingbox-" + this.props.name }),
      this.props.ingredients.map(function (data) {
        return React.createElement(Ingredient, { name: data });
      })
    );
  }

});

var ContainerBox = React.createClass({
  displayName: "ContainerBox",

  getDefaultProps: function () {
    return {
      "recipes": ["coconutpie"]
    };
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "containerbox" },
      this.props.recipes.map(function (data) {
        return React.createElement(IngredientBox, { name: data });
      })
    );
  }

});

var RecipeBox = React.createClass({
  displayName: "RecipeBox",

  render: function () {
    return React.createElement(
      "div",
      { className: "recipebox", id: "i_recipebox" },
      React.createElement(ContainerBox, null)
    );
  }
});

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById("App"));
