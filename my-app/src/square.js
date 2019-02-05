import React from 'react';
import './index.css';

//Function Square
function Square(props) {
    
        return (
        <button 
            style={{
                //if win highlight squares blue
                //Grabs winning props from parent class
                backgroundColor: props.winning ? 'rgb(79, 139, 234)' : 'white' // Ternirary operator. IF winning, set to blue, else make it white
            }}

            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
        );
    }



export default Square;