import React from 'react';

class App extends React.Component {
  render() {
    const txt = this.props.txt;
    return (
      <div>
        <h1>A class component</h1>
        <p>A componenet's render methode can only return one <code>React.createElement()</code> so we nest the JSX in a top <code>div</code>.</p>
        <p>{txt}</p>
      </div>
    );
  }
}

export default App;
