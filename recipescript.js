//Holds the ingredient 
var Ingredient = React.createClass({
  render: function(){
    return(
      <div {...this.props} className="ingredient">
        {this.props.name}
      </div>
    )
  }
});

//Holds all ingredients related to a recipe
var IngredientBox= React.createClass({
  getInitialState: function(){
    return({"show_ings":"no"})
  },

  handleClick: function(){
    var val=this.state.show_ings=="yes"? "no":"yes";
    this.setState({"show_ings": val}); 
  },

  render: function(){
    return(
      <div {...this.props} className="ingbox" onClick={this.handleClick}>
      <div className="ingbox-name"> {this.props.name} </div> 
      {
        this.state.show_ings=="yes"? this.props.ingredients.map(function(data, index){
          return(
            <Ingredient name={data} key={index}/> 
          )
        }) : null
      }
      </div>       
    )
  }
})

//The modal for adding new ingredients
var Modal= React.createClass({
  render: function(){
    return(
      <div className="modal">
        <input type="text" id="text-modal"/>
        <input type="text" id="ingredients-modal"/>
        <button className="modal-button enter-button" id="modal-enter-button">OK</button>
        <button className="modal-button back-button" id="modal-back-button">BACK</button>
      </div>
    )
  }
})

//The button for opening the modal
var ButtonAdd= React.createClass({
  render: function(){
    return(
      <button id="add-button" className="m-button add-button"> add </button>
      )
  }
});

//interaction with the button and modal
var Menus= React.createClass({
  getInitialState: function(){
    return({
      "modal":"hidden"
    })
  },

  handleClick: function(e){
    switch(e.target.id){
      case "add-button":
      if(this.state.modal=="hidden")
        this.setState({"modal":"visible"});
      else 
        this.setState({"modal": "hidden"});
      break;
      case "modal-enter-button":
        var l1= document.getElementById("text-modal").value.length,
            l2= document.getElementById("ingredients-modal").value.length;
        if(l1>0 && l2>0){
          this.setState({"modal":"hidden"});
        }
        else {
          if(l1===0) document.getElementById("text-modal").focus();
          else document.getElementById("ingredients-modal").focus();
        }
        break;
      case "modal-back-button":
        this.setState({"modal":"hidden"});
        break;
    }
  },

  render: function(){
    return(
      <div className="menus" onClick={this.handleClick}>
        <ButtonAdd/>
        {this.state.modal=="visible"? <Modal/>: null}
      </div>
      )
  }
});

//main parent container
//holds all children
var ContainerBox= React.createClass({
  getInitialState: function(){
    if(window.localStorage && window.localStorage.values && window.localStorage.length>0 && !(window.localStorage.length==1 && window.localStorage[0]=="")){
      console.log('yes');
      return ({"recipes": (JSON.parse(window.localStorage.getItem('values'))).allRecipes});
    }

    else{
      var initRecipe={
        "allRecipes": [
          {"recipe_in":"cocounutpie", 
           "ingredient_in":["coconut"]
         }]};

      initRecipe.allRecipes.push({
        "recipe_in":"pumpkin pie",
        "ingredient_in": ["pumpkin", "sugar", "wheat"]
      });

      window.localStorage.setItem('values', JSON.stringify(initRecipe));
    
      return({
        "recipes":[{"recipe_in":"cocounutpie", "ingredient_in":["coconut"]}]
      })
    }
  },

  handleClick: function(e){
    if(e.target.id=="modal-enter-button"){
      //adding new recipes
      var recipe      = document.getElementById("text-modal").value,
          ingredients = document.getElementById("ingredients-modal").value.split(",").map(function(data){
                          return (data.trim());
                        });

          if(recipe.length>0 && !(ingredients.length==1 && ingredients[0]=="")){
            var r_copy= this.state.recipes.slice();
            r_copy.push(
              {
                "recipe_in": recipe,
                "ingredient_in":ingredients
          });

            var r_wrapper={
              allRecipes: r_copy
            };

            window.localStorage.setItem('values', JSON.stringify(r_wrapper));
            this.setState({recipes: r_copy});
          }
    }
  },

  render: function(){
    return(
      <div className='containerbox' onClick={this.handleClick}>
        <Menus/>
        {
          this.state.recipes.map(function(data, index){
            return(
              <IngredientBox name={data.recipe_in} ingredients={data.ingredient_in} key={index}/>
            )
          })
        }
      </div>
    )
  }
});

//Just a wrapper
var RecipeBox= React.createClass({
  render: function(){
    return (
    <div className="recipebox" id="i_recipebox">
      <ContainerBox/>
    </div>
    )
  }
});

ReactDOM.render(
  <RecipeBox/>,
  document.getElementById("App")
  );