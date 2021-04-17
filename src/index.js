import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/**
 * BOARD COMPONENT: 
 *   It renders 9 squares. The best approach is to store the game’s state in
 *   the parent Board component instead of in each Square.
 *   The Board component can tell each Square what to display by passing a prop,
 *   just like we did when we passed a number to each Square. */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),  // array of 9 nulls correspondig to the 9 squares
      xIsNext: true,  // X is the first move by default
    };
  }


  /* The state is stored in the Board component instead of the individual Square 
    * components. This will allow it to determine the winner in the future.
    * The Square components receive values from the Board component and inform the
    * Board component when they’re clicked 
    *    => the Square components are controlled components */
  handleClick(i) {
    const squares = this.state.squares.slice();  /* we call .slice() to create a copy
                                                  * of the squares array to modify instead 
                                                  * of modifying the existing array */
    if (calculateWinner(squares) || squares[i]) {
      return;  // early return if someone has already won or if a square is already filled
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O' ;  // history
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,  // flip the value
    });
    
  }

  renderSquare(i) {
    // this pass two props (value and onClick) to square
	  return <Square 
              value={this.state.squares[i]} /* Each Square will now receive a value prop
                                             * that will either be 'X', 'O', or null for 
                                             * empty squares. */
              onClick={ () => this.handleClick(i) }  /* Since state is considered to be private 
                                                      * to a component that defines it, we cannot 
                                                      * update the Board’s state directly from Square.
                                                      * Insted this will be the function that's passed
                                                      * down from the Board to Square and called
                                                      * by Square when a square is clicked */
            />;
              
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');  
    }
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/** 
 * SQUARE COMPONENT
 *  It renders a single <button> */
//  class Square extends React.Component {
//    /* This constructor is nomore required since
//     * Square no longer keeps track of the game’s state */
//   // constructor(props) {
//   //   /** 
//   //    * In JavaScript classes, you need to always call super when defining
//   //    * the constructor of a subclass. All React component classes that have
//   //    * a constructor should start with a super(props) call: */
//   //   super(props);
//   //   this.state = { value: null };
//   // }

//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={ () => this.props.onClick() }
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

/* SQUARE FUNCTION COMPONENT */
function Square(props) {
  // no more this.props. is needed!
    return(
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
      // onClick={ () => props.onClick() } did not need parentheses!
    );
}


/**
 * GAME COMPONENT 
 *   It renders a board with placeholders values */
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;  
}