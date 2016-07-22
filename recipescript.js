//Holds the ingredient 
var Ingredient = React.createClass({
  //Capitalize first letter
  formatFirst: function(astring){
    var copystring= (astring.split(''));
    copystring[0]= copystring[0].toUpperCase();
    return copystring.join('');
  },

  render: function(){
    return(
      <div {...this.props} className="ingredient">
        {this.formatFirst(this.props.name)}
      </div>
    )
  }
});

//Holds all ingredients related to a recipe
var IngredientBox= React.createClass({
  //Misleading function name, it converts the string 
  //to one that will have Upper case starting characters
  //in every word
  makeCamelCase: function(somestr){
    var arr= somestr.split(' ');
    for(var cc in arr){
      var instr= arr[cc].split('');
      instr[0]= instr[0].toUpperCase();
      arr[cc]= instr.join(''); 
    }
    return arr.join(' ');
  },
  //don't show ingredients initially
  getInitialState: function(){
    return({"show_ings":"no"})
  },
  //show on click
  handleClick: function(e){
    if(e.target.id== "ingbox-name")
    {
      var val=this.state.show_ings=="yes"? "no":"yes";
      this.setState({"show_ings": val});
    } 
  },

  render: function(){
    return(
      <div {...this.props} className="ingbox" onClick={this.handleClick}>
        <div id="ingbox-name" title="Toggle Ingredient Visibility" className="ingbox-name line"> 
          
          {
            this.makeCamelCase(this.props.name)
          } 
          
        </div>
        <div id="ing-buttons" className="ing-buttons">
          <button title="Edit Recipe" id={this.props.id+"-edit-button"} className="ing-edit-button"> <i className="ion ion-edit"/> </button>
          <button title="Delete Recipe" id={this.props.id+"-delete-button"} className="ing-delete-button"> <i className="ion ion-close-round"/> </button>
        </div>

        <div className="ingredient-container">   
          {
            this.state.show_ings=="yes"? this.props.ingredients.map(function(data, index){
              return(
                <Ingredient name={data} key={index}/> 
              )
            }) : null
          }
        </div>
      </div>       
    )
  }
})

//The modal for adding new ingredients
//Works for editing when vals is not "add"

var Modal= React.createClass({
  render: function(){
    return(
      <div {...this.props} className="modal">
        <div id="modal-inside">
          <div id="modal-text-header" className="modal-text-header modal-header"> Recipe Name </div>
          <input type="text" id="text-modal" placeholder="Enter Recipe Name" defaultValue={this.props.vals==null?"":this.props.vals.recipe_in}/>
          <div id="modal-ingredient-header" className="modal-text-header modal-header"> Ingredients </div>
          <input type="text" id="ingredients-modal" placeholder="Enter Ingredients" defaultValue={this.props.vals==null?"":this.props.vals.ingredient_in.join(", ")}/>
          <button className="modal-button enter-button" id={this.props.id+"-enter-button"}>OK</button>
          <button className="modal-button back-button" id={this.props.id+"-back-button"}>BACK</button>
        </div>
      </div>
    )
  }
})

//The button for opening the modal
var ButtonAdd= React.createClass({
  render: function(){
    return(
      <button title="Add a Recipe" id="add-button" className="m-button add-button"> <i className="ion ion-plus-round"/> </button>
      )
  }
});

//interaction with the button and modal
var Menus= React.createClass({
  render: function(){
    return(
      <div className="menus">
        <span className="menus-text">Recipe Box</span>
        <ButtonAdd/>
      </div>
      )
  }
});

//holds all children
//I used this mostly to seperate the Modal from the rest
//of the body. This was for the modal animation
var ContainerBox= React.createClass({
  render: function(){
    return(
      <div {...this.props} className={'containerbox modal-'+this.props.modalVisible} onClick={this.handleClick}>
        
      </div>
    )
  }
});

//The main parent component
var RecipeBox= React.createClass({
  //get the recipes from local storage if possible
  getInitialState: function(){
    if(window.localStorage && window.localStorage.values){
      return (
        {
          "edit-box":null,
          "modalMode":"add",
          "modal":"hidden",
          "recipes": (JSON.parse(window.localStorage.getItem('values'))).allRecipes
        });
    }
    //if localstorage is empty or not available
    //some pre defined recipes are added
    else{
      var initRecipe={
        "allRecipes": [
          {
            "recipe_in":"Pizza", 
           "ingredient_in":["Onions", "Tomato", "Bread", "Sauce"]
         }]};

      initRecipe.allRecipes.push({
        "recipe_in":"Pumpkin Pie",
        "ingredient_in": ["Pumpkin", "Sugar", "Ready-made mould"]
      },
      {
        "recipe_in": "Sandwich",
        "ingredient_in": ["Bread", "Ham", "Cucumber"]
      });
      if(window.localStorage)
        window.localStorage.setItem('values', JSON.stringify(initRecipe));
    
      return({
        "modal": "hidden",
        "recipes":initRecipe.allRecipes
      })
    }
  },

  //massive click handler
  handleClick: function(e){
    switch(e.target.id){
      case "modal-enter-button":
        var l1= document.getElementById("text-modal").value.length,
            l2= document.getElementById("ingredients-modal").value.length;
        //change focus to empty field if user presses enter button
        //before filling up data
        if(!(l1>0 && l2>0)){
          if(l1===0) document.getElementById("text-modal").focus();
          else document.getElementById("ingredients-modal").focus();
        }

        else{
          var recipe      = document.getElementById("text-modal").value,
            ingredients   = document.getElementById("ingredients-modal").value.split(",").map(function(data){
                          return (data.trim());
                        });

          if(recipe.length>0 && !(ingredients.length==1 && ingredients[0]=="")){
            var r_copy= this.state.recipes.slice();
            //Adding recipes, this is called if the ADD button is pressed
            if(this.state.modalMode=="add"){
              r_copy.push(
              {
                "recipe_in": recipe,
                "ingredient_in":ingredients
              });
            }
            //Editing recipes. Called when edit button of a certain recipe
            //is pressed
            else{
              var in_ind= + (this.state.modalMode.replace("edit", ""));
              r_copy[in_ind].recipe_in=recipe;
              r_copy[in_ind].ingredient_in=ingredients;
            }
            var r_wrapper={
              allRecipes: r_copy
            };
            if(window.localStorage)  
              window.localStorage.setItem('values', JSON.stringify(r_wrapper));
            this.setState({recipes: r_copy, "modal":"hidden"});
          }
        }

        break;

      case "add-button":
        if(this.state.modal=="hidden")
          this.setState(
            {
              "modal":"visible", 
              "editbox": null, 
              "modalMode":"add"}
              );
        break;

      case "modal-back-button":
        this.setState(
          {
            "modal":"hidden"
          });
        break;
    }

    //edit a recipe
    if((/-edit-button/g).test(e.target.id)){
      var ind= e.target.id.slice().replace(/-edit-button/g, "").replace(/ing-/g, "");
      this.setState(
        {
          "modal":"visible", 
          "editbox": this.state.recipes[ind],
          "modalMode": ("edit"+ind)
        });
    }

    //remove a recipe
    else if ((/-delete-button/g).test(e.target.id)){
      ind= e.target.id.slice().replace(/-delete-button/g, "").replace(/ing-/g, "");
      r_copy= this.state.recipes.slice();
      r_copy.splice(+ind, 1);
      r_wrapper= {allRecipes: r_copy};
      if(window.localStorage)
        window.localStorage.setItem('values', JSON.stringify(r_wrapper));
      this.setState({"recipes": r_copy});
    }
  },

  render: function(){
    return (
    <div className="recipebox" id="i_recipebox" onClick={this.handleClick}>
      <ContainerBox modalVisible={this.state.modal=="hidden"?"inactive":"active"}>
        <Menus/>
        {
          this.state.recipes.map(function(data, index){
            return(
              <IngredientBox id={"ing-"+index} name={data.recipe_in} ingredients={data.ingredient_in} key={index}/>
            )
          })
        }
        </ContainerBox>
      {this.state.modal=="visible"? <Modal id="modal" vals={this.state.editbox==null? null: this.state.editbox}/>: null}
    </div>
    )
  }
});

ReactDOM.render(
  <RecipeBox/>,
  document.getElementById("App")
  );