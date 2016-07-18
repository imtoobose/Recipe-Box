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
      this.props.ingredients.map(function (data, index) {
        return React.createElement(Ingredient, { name: data, key: index });
      })
    );
  }
});

var ContainerBox = React.createClass({
  displayName: "ContainerBox",

  getInitialState: function () {
    return {
      "recipes": ["coconutpie"]
    };
  },

  handleClick: function (e) {
    if (e.target.id == "modal-enter-button") {
      var recipe = document.getElementById("text-modal").value,
          ingredients = document.getElementById("ingredients-modal").value.split(",").map(function (data) {
        return data.trim();
      });
      console.log(recipe, ingredients);
      if (recipe.length > 0 && ingredients.length > 0) {
        var r_copy = this.state.recipes.slice();
        r_copy.push(recipe);
        this.setState({ recipes: r_copy });
      }
    }
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "containerbox", onClick: this.handleClick },
      this.state.recipes.map(function (data, index) {
        return React.createElement(IngredientBox, { name: data, key: index });
      }),
      React.createElement(Menus, null)
    );
  }
});

var Modal = React.createClass({
  displayName: "Modal",

  render: function () {
    return React.createElement(
      "div",
      { className: "modal" },
      React.createElement("input", { type: "text", id: "text-modal" }),
      React.createElement("input", { type: "text", id: "ingredients-modal" }),
      React.createElement(
        "button",
        { className: "modal-button enter-button", id: "modal-enter-button" },
        "OK"
      ),
      React.createElement(
        "button",
        { className: "modal-button back-button", id: "modal-back-button" },
        "BACK"
      )
    );
  }
});

var ButtonAdd = React.createClass({
  displayName: "ButtonAdd",

  render: function () {
    return React.createElement(
      "button",
      { id: "add-button", className: "m-button add-button" },
      " add "
    );
  }
});

var Menus = React.createClass({
  displayName: "Menus",

  getInitialState: function () {
    return {
      "modal": "hidden"
    };
  },

  handleClick: function (e) {
    switch (e.target.id) {
      case "add-button":
        if (this.state.modal == "hidden") this.setState({ "modal": "visible" });else this.setState({ "modal": "hidden" });
        break;
      case "modal-enter-button":
        this.setState({ "modal": "hidden" });
        break;
      case "modal-back-button":
        this.setState({ "modal": "hidden" });
        break;
    }
  },

  render: function () {
    return React.createElement(
      "div",
      { className: "menus", onClick: this.handleClick },
      React.createElement(ButtonAdd, null),
      this.state.modal == "visible" ? React.createElement(Modal, null) : null
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
