var Ingredient = React.createClass({
  render: function(){
    return(
      <div {...this.props} className="ingredient" id={"ing-"+this.props.name}>
        {this.props.name}
      </div>
    )
  }
});

var IngredientBox= React.createClass({
  getDefaultProps: function(){
    return({
      "ingredients":["coconut"]
      }
    )
  },

  render: function(){
    return(
      <div {...this.props} className="ingbox" id={"ingbox-"+this.props.name}>
      {
        this.props.ingredients.map(function(data, index){
          return(
            <Ingredient name={data} key={index}/> 
          )
        })
      }
      </div>       
    )
  }
})

var ContainerBox= React.createClass({
  getInitialState: function(){
    return({
      "recipes":["coconutpie"]
    })
  },

  handleClick: function(e){
    if(e.target.id=="modal-enter-button"){
      var recipe      = document.getElementById("text-modal").value,
          ingredients = document.getElementById("ingredients-modal").value.split(",").map(function(data){
                          return (data.trim());
                        });
          console.log(recipe, ingredients);
          if(recipe.length>0 && ingredients.length>0){
            var r_copy= this.state.recipes.slice();
            r_copy.push(recipe);
            this.setState({recipes: r_copy});
          }
    }
  },

  render: function(){
    return(
      <div className='containerbox' onClick={this.handleClick}>
        {
          this.state.recipes.map(function(data, index){
            return(
              <IngredientBox name={data} key={index}/>
            )
          })
        }
        <Menus/>
      </div>
    )
  }
});

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

var ButtonAdd= React.createClass({
  render: function(){
    return(
      <button id="add-button" className="m-button add-button"> add </button>
      )
  }
});

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
        this.setState({"modal":"hidden"});
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