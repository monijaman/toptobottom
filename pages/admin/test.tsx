 

function Child() {
  return <div>This is children content</div>;
}

function Childs() {
  return <div>This is children content</div>;
}
function Child2() {
  return <div>This is children content</div>;
}

// Add code only here
function Parent( {children}) {
  return (
    <div>
      <h3>Parent Component</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Parent>
      <Child />
      <Childs />
    </Parent>
  );
}
export default App
