import React from 'react';

class App extends React.Component {
  constructor() {
    super(); // give `this` the component's context instead of parent class
    this.myEventHandler = this.myEventHandler.bind(this);
    this.state = {
      txt: 'This is some text from state.',
      eventName: '---',
      people: [],
      color: 0
    }
  }

  componentWillMount() {
    fetch('http://swapi.co/api/people/?format=json')
      .then(response => response.json())
      // destructuring assignment: get "results" from API and rename to "items"
      .then(({results: items}) => this.setState({people: items}));
  }

  myUpdate(e) {
    this.setState({
      txt: e.target.value
    })
    console.log(this.state);
  }

  myEventHandler(e) {
    this.setState({
      eventName: e.type
    })
  }

  clicky() {
    this.setState({
      eventName: this.myInput.value
    });
  }

  filterNames(e) {
    this.setState({ filter: e.target.value });
  }

  updateColor(e) {
    this.setState({
      color: this.red.colorInput.value
    });
  }

  render() {
    const propTxt = this.props.txt;
    const stateTxt = this.state.txt;
    let people = this.state.people;
    if(this.state.filter) {
      people = people.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    }
    return (
      <div>
        <h1>A class component</h1>
        <p>A componenet's render methode can only return one <code>React.createElement()</code> so we nest the JSX in a top <code>div</code>.</p>
        <p>{propTxt}</p>
        <p>{stateTxt}</p>
        <MyLink>
          This is <Widget update={this.myUpdate.bind(this)} /> pretty cool
        </MyLink>
        <textarea
          onFocus={this.myEventHandler}
          onBlur={this.myEventHandler}
          onKeyPress={this.myEventHandler}
          onCopy={this.myEventHandler}
          onCut={this.myEventHandler}
          onPaste={this.myEventHandler}
          cols="30"
          rows="10" />
        <p>Event Name: {this.state.eventName}</p>
        <input ref={ node => this.myInput = node } />
        <button onClick={this.clicky.bind(this)}>Change Even Name</button>
        <h2>Filter Names</h2>
        <input type="text" onChange={this.filterNames.bind(this)} />
        <ul>
          {people.map(person => <StarWarsPerson key={person.name} name={person.name} />)}
        </ul>
        <hr />
        <NumInput
          ref={component => this.red = component}
          min={0}
          max={255}
          step={1}
          val={+this.state.color}
          type="range"
          label="Yellow"
          update={this.updateColor.bind(this)} />
      </div>
    );
  }
}

class NumInput extends React.Component {
  render() {
    return (
      <div>
        <input
          ref={node => this.colorInput = node}
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.val}
          onChange={this.props.update} />
        {this.props.label && <label>{this.props.label} - {this.props.val}</label> }
      </div>);
  }
}

const Widget = (props) => {
  return <input onChange={props.update} />
};

const MyLink = (props) => <div className="whoop">{props.children}</div>

const StarWarsPerson = (props) => <li>{props.name}</li>

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'some default text',
  cat: 5
}

export default App;
