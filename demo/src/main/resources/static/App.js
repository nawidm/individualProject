var NavBar = React.createClass({

  getInitialState: function(){
	return {
		showForm: true	
	}
  },

  addAccount: function(){
	this.setState({showForm: true});	

  },

  handleClick1: function() {
	this.refs.child.setToView();
  },  

  handleClick2: function(){
	this.refs.child.setToCreate();
  },
  renderWithForm: function(){
	return(
	<div>
	  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">AccountApp</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active" onclick="active(this)"><a href="#">Dashboard</a></li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Accounts
                <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={this.handleClick1}>Get Accounts</a></li>
                <li><a href="#" onClick={this.handleClick2}>Add Accounts</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
	  <MyForm ref="child"/></div>
	);
  },

  render: function(){
	if(this.state.showForm){
		return this.renderWithForm();
	}else {
    return (
	
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">AccountApp</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active" onclick="active(this)"><a href="#">Dashboard</a></li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Accounts
                <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="#" onClick={this.handleClick}>Get Accounts</a></li>
                <li><a href="#" onClick={this.addAccount}>Add Accounts</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
	}

  }
});

var MyForm = React.createClass({

	getInitialState: function(){
		return {
			dataMounted: false,
			adding: true,
			editing: false,
			id: [],
			firstNames: [],
			surNames: [],
			accNumbers: [],
			index: 0	
				}
	},

	loadAccountsFromServer: function () {
    	var self = this;
    	$.ajax({
      		url: "http://localhost:8080/demo/all",
			dataType: 'json'
    	}).then(function (data) {
			for(var i=0; i<data.length; i++){
				self.state.id.push(data[i].id);
				self.state.firstNames.push(data[i].firstName);
				self.state.surNames.push(data[i].surName);
				self.state.accNumbers.push(data[i].accNumber);
			}
			self.setState({dataMounted: true});
    	});
  	},

	setToCreate: function(){
		this.setState({adding: true,
						editing: false});
	},

	setToView: function(){
		this.setState({adding: false,
						editing: false});
	},

	addNewAccount: function(){
    	var self = this;
    	$.ajax({
      		url: "http://localhost:8080/demo/add?firstname="+this.refs.firstName.value+"&surname="+this.refs.surName.value+"&accNumber="+this.refs.accNumber.value,
			type: 'POST'
    	}).then(function (data) {
			self.setState({		
						id: [],
						firstNames: [],
						surNames: [],
						accNumbers: [],
						dataMounted: false,
				});
    	});
		this.setToView();
	},

	removeRow: function(i){

    	var self = this;
    	$.ajax({
      		url: "http://localhost:8080/demo/remove?idRemove="+i,
			type: 'POST'
    	}).then(function (data) {
			self.setState({
						
						id: [],
						firstNames: [],
						surNames: [],
						accNumbers: [],
						dataMounted: false,
				});
    	});

	},

	editRow: function(i){
		this.setState({
					index: i,
					editing: true
					
				})
	},

	renderAdding: function(){
		return (
		<form id="myForm" className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="First-Name">First-name:</label>
          <div className="col-sm-10">
            <input type="text" ref="firstName" className="form-control" id="First-Name" placeholder="Enter first name" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="Surname">Surname:</label>
          <div className="col-sm-10"> 
            <input type="text" ref="surName"className="form-control" id="Surname" placeholder="Enter surname" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="AccountNumber">Account Number:</label>
          <div className="col-sm-10"> 
            <input type="text" ref="accNumber" className="form-control" id="AccountNumber" placeholder="Enter account number" />
          </div>
        </div>
        <div className="form-group"> 
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" onClick={this.addNewAccount} className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
		);
	},

	renderViewing: function(){
		if(!this.state.dataMounted){
			this.loadAccountsFromServer();
		}

		return (
			<div className="container">
        <h2>Current Accounts</h2>           
        <table className="table">
          <thead>
            <tr>
              <th>First_name</th>
              <th>Surname</th>
              <th>Account Number</th>
            </tr>
          </thead>
          <tbody>
			{this.state.id.map((item,i) => {
        return <tr>
              <td>{this.state.firstNames[i]}</td>
              <td>{this.state.surNames[i]}</td>
              <td>{this.state.accNumbers[i]}</td>
			  <td><Button type="Edit" ref="test" index={i} parentMethod={this.editRow}/></td>
			  <td><Button type="Remove" index={this.state.id[i]} parentMethod={this.removeRow} /></td>
            </tr>
      })}
          </tbody>
        </table>
      </div>
	
		);
	},

  renderEditing: function(i){
	console.log(i);
	return (
		<form id="myForm" className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="First-Name">First-name:</label>
          <div className="col-sm-10">
            <input type="text" ref="firstName" className="form-control" id="First-Name" defaultValue={this.state.firstNames[i]}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="Surname">Surname:</label>
          <div className="col-sm-10"> 
            <input type="text" ref="surName"className="form-control" id="Surname" defaultValue={this.state.surNames[i]} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlfor="AccountNumber">Account Number:</label>
          <div className="col-sm-10"> 
            <input type="text" ref="accNumber" className="form-control" id="AccountNumber" defaultValue={this.state.accNumbers[i]} />
          </div>
        </div>
        <div className="form-group"> 
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" onClick={this.save} className="btn btn-default">Save</button>
          </div>
        </div>
      </form>

	);
  },

  save: function(){
    	var self = this;
    	$.ajax({
      		url: "http://localhost:8080/demo/edit?idEdit="+this.state.id[this.state.index]+"&firstname="+this.refs.firstName.value+"&surname="+this.refs.surName.value+"&accNumber="+this.refs.accNumber.value,
			type: 'POST'
    	}).then(function (data) {
			self.setState({		
						id: [],
						firstNames: [],
						surNames: [],
						accNumbers: [],
						dataMounted: false,
						editing: false
				});
    	});

	},
  render: function() {

		if(this.state.adding){
			return this.renderAdding();
		} else if(this.state.editing){
			return this.renderEditing(this.state.index);
		} else {
			return this.renderViewing();
		}

  }
  });

	var Button = React.createClass({

	getInitialState: function(){
		return {
			type: this.props.type
		}
	},
	handleClick: function(){
		this.props.parentMethod(this.props.index);
	},
	render: function(){
			if(this.state.type == "Edit"){
				return <button type="button" onClick={this.handleClick} className="btn btn-primary">Edit</button>;
			} else {
				return <button type="button" onClick={this.handleClick} className="btn btn-danger">Remove</button>;
			}
	},
	 
	});


ReactDOM.render(<div>
					<NavBar/>
				</div>,document.getElementById("root"));

