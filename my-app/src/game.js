import React from 'react';
import './index.css';
import Board from './board.js';
import MoveCount from './moveCount.js';

//Game Class
class Game extends React.Component {
    constructor(props) {
        super(props);
    //Set the inital state.
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            CountO: 0,
            CountX: 0,
            winningRow: [],
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'; // Ternirary operator. IF NOT X then O for next player(vice versa)
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

        console.log(squares);
        this.updateCounter(squares)
    }
    // function to count moves of x and o 
    updateCounter = (squares) => {
        let CountX = 0;
        let CountO = 0;
    // FOR loop that iterates the X and O counter 
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === 'X') {
                CountX++;
            }
            if (squares[i] === 'O') {
                CountO++;
            }
        }
    //Set the state of the counter.
        this.setState({
            CountX: CountX,
            CountO: CountO,
        });
    }
    // update count
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
    // IF you step back a step clear the winning row to continue game.
            winningRow: []
        });
        let newSquares = this.state.history[step].squares
        this.updateCounter(newSquares)
    }

    calculateWinner(squares) {
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

                // IF a player wins, set those there squares as winning row.
                if (this.state.winningRow.length < 1) {
                    this.setState({
                        winningRow: lines[i]
                    })
                }
                return squares[a];
            }
        }
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        // Total squares on Board
        const boardTotal = 9;
        //IF winner Display (x or o) if the winner
        if (winner) {
            status = 'Winner: ' + winner;
        }
        //ELSE IF all squares are clicked and no winner display that its a draw
        else if(this.state.stepNumber === boardTotal){
            status = "It's a draw! try again!";
        } 
        //ELSE keep playing game
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                {/* DISPLAY PLAYING BOARD */}
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        // add new prop called winningRow
                        winningRow={this.state.winningRow} 
                    />
                    {/* DISPLAY THE X AND O MOVE COUNTER */}
                    <MoveCount
                    // Passing the state to move count class
                        CountO={this.state.CountO}
                        CountX={this.state.CountX}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;