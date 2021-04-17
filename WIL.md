# What I have Learned

- A React.Component takes in parameters, called props (short for “properties”), and returns a hierarchy of views to display via the render method. In particular, render returns a React element, which is a lightweight description of what to render:
    ```javascript
    class ShoppingList extends React.Component {
      render() {
        return (
          <div className="shopping-list">
            <h1>Shopping List for {this.props.name}</h1>
            <ul>
              <li>Instagram</li>
              <li>WhatsApp</li>
              <li>Oculus</li>
            </ul>
          </div>
        );
      }
    }
    ```

- Most React developers use a special syntax called **JSX** which makes these structures easier to write. The `<div />` syntax is transformed at build time to `React.createElement('div')`, so that the example above is equivalent to:
  ```javascript
    React.createElement("div", { className: "shopping-list" },
        React.createElement("h1", null, "Shopping List for ", props.name),
        React.createElement("ul", null,
            React.createElement("li", null, "Instagram"),
            React.createElement("li", null, "WhatsApp"),
            React.createElement("li", null, "Oculus")
        )
    );
  ```
  JSX comes with the full power of JavaScript. You can put any JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.\
  From now on, we can refer to the whole shopping list by writing `<ShoppingList />`.

- Passing props is how information flows in React apps, from parents to children.

- To “remember” things, components use **state**. React components can have state by setting `this.state` in their constructors. `this.state` should be considered as private to a React component that it has defined in.
  
- By calling `setState` in a component, React automatically updates the child components inside of it too.

- **To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead. The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.**\
Lifting state into a parent component is common when React components are refactored

- **Immutability is important**:\
  The approach is to replace the data with a new copy which has the desired changes instead of _mutate_ the data by directly changing the data’s values.\
  For instance:
  ```javascript
  var player = {score: 1, name: 'Jeff'};
  var newPlayer = {...player, score: 2};  
  // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}
  ```
  By doing this, we gain several benefits:
  * Complex features become simple:\
    An ability to _undo and redo_ certain actions is a common requirement in applications. Avoiding direct data mutation lets us keep the history intact, and reuse it later.
  * Detecting changes:\
    Detecting changes in immutable objects is very easy. If the immutable object that is being referenced is different than the previous one, then the object has changed.
  * Determining when to re-render in React:\
    The main benefit of immutability is that it helps you build pure components in React. Immutable data can easily determine if changes have been made, which helps to determine when a component requires re-rendering.

- **Function Components**:\
  In React, function components **are a simpler way to write components that only contain a** `render` **method and don’t have their own state**. **Instead of defining a class which extends** `React.Component`, **we can write a function that takes** `props` **as input and returns what should be rendered**. Function components are less tedious to write than classes, and many components can be expressed this way.\
  An example:
  ```javascript
  function Square(props) {
    // no more this.props. is needed and
    return (
      <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
    // onClick={ () => props.onClick() } did not need parentheses!
  }
  ``` 

