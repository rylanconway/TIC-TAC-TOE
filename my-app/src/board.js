
import React from 'react';
import './index.css';
import Square from './square.js';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          //check squares
          winning={this.props.winningRow.indexOf(i) > -1 ? true : false } // Ternirary operator. IF square is clicked 
        />
      );
    }
  
    render() {
      return (
        // This will Create 3 Rows with 3 Coloums
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
  
  export default Board;