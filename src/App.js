import React from 'react';

class App extends React.Component {
  constructor() {
    super(); // give `this` the component's context instead of parent class
    this.myEventHandler = this.myEventHandler.bind(this);
    this.state = {
      txt: 'This is some text from state.',
      eventName: '---'
    }
  }

  myUpdate(e) {
    this.setState({
      txt: e.target.value
    })
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

  render() {
    const propTxt = this.props.txt;
    const stateTxt = this.state.txt;
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
        <input ref={ node => this.myInput = node }/>
        <button onClick={this.clicky.bind(this)}>Change Even Name</button>
      </div>
    );
  }
}

const Widget = (props) => {
  return <input onChange={props.update} />
};

const MyLink = (props) => <div className="whoop">{props.children}</div>

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'some default text',
  cat: 5
}

export default App;
