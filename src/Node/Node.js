import React from 'react';
import './Node.css';

const node = (props) => {
const onMouseDown = props.onMouseDown;
const onMouseEnter = props.onMouseEnter;
const onMouseUp = props.onMouseUp;

const cssClass = props.startNode 
? 'start-node' : props.finishNode 
? 'finish-node': props.isWall 
? 'wall-node' : '';
    return (
        <div 
        className={`node ${cssClass}`}
        onMouseDown = {() => onMouseDown(props.row,props.col)}
        onMouseEnter = {() => onMouseEnter(props.row,props.col)}
        onMouseUp = {() => onMouseUp(props.row,props.col)}
        id={`node-${props.row}-${props.col}`}>
        </div>
    )
}

export default node;
