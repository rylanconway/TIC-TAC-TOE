import React from 'react';
import './index.css';

//Function Move Count
 function MoveCount(props) {
    
        return(
            // This is my Function to display my moves from props of game.js
            <div className='moveCount'>
                X moves count: {props.CountX}<br/>
                O moves count: {props.CountO}
            </div>
        )
    }


export default MoveCount;