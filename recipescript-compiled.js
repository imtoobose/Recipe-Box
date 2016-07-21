var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* CODE FOR DELETION
for (var i in values){
  if(values[i].recipe_in==thisRecipeName) { 
    values.splice(i, 1);
    break; 
  } 
}
*/

//Holds the ingredient
var Ingredient = React.createClass({
  displayName: "Ingredient",

  render: function () {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "ingredient" }),
      this.props.name
    );
  }
});

//Holds all ingredients related to a recipe
var IngredientBox = React.createClass({
  displayName: "IngredientBox",

  getInitialState: function () {
    return { "show_ings": "no" };
  },

  handleClick: function () {
    var val = this.state.show_ings == "yes" ? "no" : "yes";
    this.setState({ "show_ings": val });
  },

  render: function () {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "ingbox", onClick: this.handleClick }),
      React.createElement(
        "div",
        { className: "ingbox-name" },
        " ",
        this.props.name,
        " "
      ),
      this.state.show_ings == "yes" ? this.props.ingredients.map(function (data, index) {
        return React.createElement(Ingredient, { name: data, key: index });
      }) : null
    );
  }
});

//The modal for adding new ingredients
var Modal = React.createClass({
  displayName: "Modal",

  render: function () {
    return React.createElement(
      "div",
      _extends({}, this.props, { className: "modal" }),
      React.createElement("input", { type: "text", id: "text-modal", value: this.props.textval == "" ? "" : this.props.textval }),
      React.createElement("input", { type: "text", id: "ingredients-modal", value: this.props.ingval == "" ? "" : this.props.ingval }),
      React.createElement(
        "button",
        { className: "modal-button enter-button", id: this.props.id + "-enter-button" },
        "OK"
      ),
      React.createElement(
        "button",
        { className: "modal-button back-button", id: this.props.id + "-back-button" },
        "BACK"
      )
    );
  }
});

//The button for opening the modal
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

//interaction with the button and modal
var Menus = React.createClass({
  displayName: "Menus",

  render: function () {
    return React.createElement(
      "div",
      { className: "menus" },
      React.createElement(ButtonAdd, null)
    );
  }
});

//main parent container
//holds all children
var ContainerBox = React.createClass({
  displayName: "ContainerBox",

  getInitialState: function () {
    if (window.localStorage && window.localStorage.values) {
      console.log('yes');
      return {
        "recipes": JSON.parse(window.localStorage.getItem('values')).allRecipes,
        "modal": "hidden"
      };
    } else {
      var initRecipe = {
        "allRecipes": [{ "recipe_in": "cocounutpie",
          "ingredient_in": ["coconut"]
        }] };

      initRecipe.allRecipes.push({
        "recipe_in": "pumpkin pie",
        "ingredient_in": ["pumpkin", "sugar", "wheat"]
      });

      window.localStorage.setItem('values', JSON.stringify(initRecipe));

      return {
        "recipes": initRecipe.allRecipes,
        "modal": "hidden"
      };
    }
  },

  handleClick: function (e) {
    var id = e.target.id;
    switch (id) {
      case "modal-enter-button":
        var recipe = document.getElementById("text-modal").value,
            ingredients = document.getElementById("ingredients-modal").value.split(",").map(function (data) {
          return data.trim();
        });

        if (recipe.length > 0 && !(ingredients.length == 1 && ingredients[0] == "")) {
          var r_copy = this.state.recipes.slice();
          r_copy.push({
            "recipe_in": recipe,
            "ingredient_in": ingredients
          });

          var r_wrapper = {
            allRecipes: r_copy
          };

          window.localStorage.setItem('values', JSON.stringify(r_wrapper));
          this.setState({ recipes: r_copy });
        }

        var l1 = document.getElementById("text-modal").value.length,
            l2 = document.getElementById("ingredients-modal").value.length;
        if (l1 > 0 && l2 > 0) {
          this.setState({ "modal": "hidden" });
        } else {
          if (l1 === 0) document.getElementById("text-modal").focus();else document.getElementById("ingredients-modal").focus();
        }

        break;

      case "add-button":
        if (this.state.modal == "hidden") this.setState({ "modal": "visible" });else this.setState({ "modal": "hidden" });
        break;

      case "modal-back-button":
        this.setState({ "modal": "hidden" });
        break;
    }
  },

  render: function () {
    return React.createElement(
      "div",
      { className: 'containerbox ' + (this.state.modal == "visible" ? "modal-active" : "modal-inactive"), onClick: this.handleClick },
      React.createElement(Menus, null),
      this.state.recipes.map(function (data, index) {
        return React.createElement(IngredientBox, { name: data.recipe_in, ingredients: data.ingredient_in, key: index });
      }),
      this.state.modal == "visible" ? React.createElement(Modal, { id: "modal" }) : null
    );
  }
});

//Just a wrapper
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
