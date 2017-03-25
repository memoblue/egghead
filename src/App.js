import React from 'react';

class App extends React.Component {
  constructor() {
    super(); // give `this` the component's context instead of parent class
    this.state = {
      txt: 'This is some text from state.'
    }
  }

  myUpdate(e) {
    this.setState({
      txt: e.target.value
    })
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
          This is <Widget update={this.myUpdate.bind(this)}/> pretty cool
        </MyLink>
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
