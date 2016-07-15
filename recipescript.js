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
        this.props.ingredients.map(function(data){
          return(
            <Ingredient name={data}/> 
          )
        })
      }
      </div>       
    )
  }

})

var ContainerBox= React.createClass({
  getDefaultProps: function(){
    return({
      "recipes":["coconutpie"]
    })
  },
  render: function(){
    return(
      <div className='containerbox'>
        {
          this.props.recipes.map(function(data){
            return(
              <IngredientBox name={data}/>
            )
          })
        }
      </div>
    )
  }

})

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