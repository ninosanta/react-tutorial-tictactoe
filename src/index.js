import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/**
 * BOARD COMPONENT:
 *   It renders 9 squares.
 */
class Board extends React.Component {

  renderSquare(i) {
    // method passes two props (value and onClick) to square:
	  return (
      <Square 
        value={ this.props.squares[i] } /* Each Square will now receive a value prop
                                         * that will either be 'X', 'O', or null for 
                                         * empty squares. */
        onClick={ () => this.props.onClick(i) }  /* Since state is considered to be private 
                                                  * to a component that defines it, we cannot 
                                                  * update the Board’s state directly from Square.
                                                  * Insted this will be the function that's passed
                                                  * down from the Board to Square and called
                                                  * by Square when a square is clicked */
      />
    );
  }

  render() {
    return (
      <div>
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
 * SQUARE FUNCTION COMPONENT 
 */
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
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    /* To ensures that if we “go back in time” and then make a new move from 
     * that point, we throw away all the “future” history that would now become 
     * incorrect: */
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();  /* we call .slice() to create a copy
                                               * of the squares array to modify instead 
                                               * of modifying the existing array */
    if (calculateWinner(squares) || squares[i]) {
      return;  // early return if someone has already won or if a square is already filled
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O' ;  // history
    this.setState({
      history: history.concat([ // unlike push(), the concat() method doesn’t mutate the original array, so we prefer it
        {  
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,  // flip the value
    });
    
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;   
    const current = history[this.state.stepNumber];  // render the current move according to stepNumber
    const winner = calculateWinner(current.squares);

    /* For each move in the tic-tac-toe game’s history, we create a list item <li> 
     * which contains a button <button>. 
     * The button has a onClick handler which calls a method called this.jumpTo() */
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      /* In the tic-tac-toe game’s history, each past move has a unique ID associated with it: 
       * it’s the sequential number of the move. The moves are never re-ordered, deleted, or
       * inserted in the middle, so it’s safe to use the move index as a key. */
      return (
        <li key={move}>
          <button
            onClick={ () => this.jumpTo(move) }
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');  
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
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