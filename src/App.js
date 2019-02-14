import React, { Component } from 'react';
import classes from './App.module.css';

class App extends Component {
  state = {
    keywords: [],
    addTask: false,
    cancelTask: false,
    dropdown: false,
    string: ''
  }

  getLabels = keyword => {
    const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
    const result = allLabels
      .filter(function(x) {
        return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
    return result;
  }

  getLabelsAsync = keyword => {
    const result = this.getLabels(keyword);
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, delay, result);
    });
  }

  handleChange = e => {
    const word = e.target.value;
    this.setState({
      dropdown: false,
      string: word
    })
    if (word.includes("@")) {
      const keywords = this.getLabelsAsync(word.substring(word.indexOf('@')+1))
      keywords.then((keywords) => {
        this.setState({
          keywords,
          dropdown: true,
        })
        keywords.forEach(word => console.log(word));
      })      
    }
  }

  handleAddTask = () => {
    this.setState({
      addTask: true
    })
  }

  handleCancelTask = () => {
    this.setState({
      keywords: [],
      addTask: false,
      cancelTask: true,
      string: ''
    })
  }

  handleLabelColor = (keyword) => {
    switch (keyword) {
      case 'NextActions':
        return 'green'
      case 'Someday_Actions':
        return 'blue'
      case 'Costco':
        return 'red'
      case 'Alexa':
        return 'orange' 
      default:
        return '';
    }
  }

  handleClick = (word) => {
    let string = this.state.string.replace('@','') + word
    console.log("Current String:", JSON.stringify(string))
    this.setState({
      string: string
    })
  }


  render() {
    return (
      <div className={ classes.Wrapper }>
        <div className={classes.ToolBar}>
          <div className='container col-sm-12 col-lg-6 mt-2'>
            <div className="row">
              <div className={classes.Label}>Inbox</div>
              <div className={classes.Comment}><i className="far fa-comment-alt"></i></div>
              <div className={classes.Ellipsis}><i className="fas fa-ellipsis-h"></i></div>
            </div>
          </div>
          
          { 
            this.state.addTask ?

            <div className='container col-sm-12 col-lg-6 mt-2'>
              <form action="" className={classes.Form}>
                <input 
                  className='form-control' 
                  onChange={this.handleChange.bind(this)}
                  type="text"
                  value={this.state.string} />      
              </form>
              { this.state.dropdown ? 
                <div className='mt-3 mb-3'>
                  { this.state.keywords.map(word => (
                      <div 
                        className='dropdown-item'
                        key={word}
                        onClick={() => this.handleClick(word)}>
                        <i className="fas fa-tag mr-2" style={ { color: this.handleLabelColor(word) } } />
                        {word} 
                      </div>
                    ))
                  }
                </div>
                  :
                null
              }
              <div className='container row mt-2'>
                <button 
                  onClick={this.handleAddTask}
                  className='btn btn-danger'
                  >Add Task</button>
                <button 
                  onClick={this.handleCancelTask}
                  className='btn btn-link text-secondary'>Cancel</button>
              </div>
            </div> :
            <div className='container col-sm-12 col-lg-6 mt-2'>
              <button 
                className='btn btn-danger rounded-circle'
                onClick={() => this.handleAddTask()}
              >
                <i className="fas fa-plus" ></i>
              </button> 
              <span className='ml-3'>Add Task</span>
            </div>
          }

        </div>
      </div>  
    );
  }
}

export default App;

