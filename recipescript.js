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
      <div {...this.props} className="modal">
        <input type="text" id="text-modal" value={this.props.textval==""?"":this.props.textval}/>
        <input type="text" id="ingredients-modal" value={this.props.ingval==""?"":this.props.ingval}/>
        <button className="modal-button enter-button" id={this.props.id+"-enter-button"}>OK</button>
        <button className="modal-button back-button" id={this.props.id+"-back-button"}>BACK</button>
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
  render: function(){
    return(
      <div className="menus">
        <ButtonAdd/>
      </div>
      )
  }
});

//main parent container
//holds all children
var ContainerBox= React.createClass({
  getInitialState: function(){
    if(window.localStorage && window.localStorage.values){
      console.log('yes');
      return (
        {
          "recipes": (JSON.parse(window.localStorage.getItem('values'))).allRecipes
        });
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
        "recipes":initRecipe.allRecipes
      })
    }
  },

  handleClick: function(e){
    var id= e.target.id;
    switch(id){
      case "modal-enter-button":
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
        break;
    }
  },

  render: function(){
    return(
      <div {...this.props} className={'containerbox modal-'+this.props.modalVisible} onClick={this.handleClick}>
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
  getInitialState: function(){
    return({"modal":"hidden"})
  },

  handleClick: function(e){
    switch(e.target.id){
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

      case "add-button":
        if(this.state.modal=="hidden")
          this.setState({"modal":"visible"});
        else 
          this.setState({"modal": "hidden"});
        break;

      case "modal-back-button":
        this.setState({"modal":"hidden"});
        break;
    }
  },
  render: function(){
    return (
    <div className="recipebox" id="i_recipebox" onClick={this.handleClick}>
      <ContainerBox modalVisible={this.state.modal=="hidden"?"inactive":"active"}/>
      {this.state.modal=="visible"? <Modal id="modal"/>: null}
    </div>
    )
  }
});

ReactDOM.render(
  <RecipeBox/>,
  document.getElementById("App")
  );