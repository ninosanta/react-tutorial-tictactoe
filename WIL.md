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
- We know that React elements are first-class JavaScript objects ;we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.\
In JavaScript, arrays have a `map()` method that is commonly used for mapping data to other data, for example:
  ```javascript
  const numbers = [1, 2, 3];
  const doubled = numbers.map(x => x * 2); // [2, 4, 6]
  ```
  This can turn to be useful when, for example, we need to map an history of something (e.g. a game's moves) to buttons that permits to jump within the history. 

- Each child in an array or iterator should have a unique “key” prop.\
  When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list’s items.\
  Imagine transitioning from:
  ```html javascript
  <li>Alexa: 7 tasks left</li>
  <li>Ben: 5 tasks left</li>
  ```
  to
  ```html javascript
  <li>Ben: 9 tasks left</li>
  <li>Claudia: 8 tasks left</li>
  <li>Alexa: 5 tasks left</li>
  ```
  In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben’s ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a _key_ property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia’s database IDs could be used as keys.
  ```html javascript
  <li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
  ```
  When a list is re-rendered, React takes each list item’s key and searches the previous list’s items for a matching key. If the current list has a key that didn’t exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component’s key changes, the component will be destroyed and re-created with a new state.\
  \
  `key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.\
  \
  **It’s strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don’t have an appropriate key, you may want to consider restructuring your data so that you do.\
  \
  If no key is specified, React will present a **warning** and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list’s items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases!\
  \
  **Keys do not need to be globally unique; they only need to be unique between components and their siblings.**
