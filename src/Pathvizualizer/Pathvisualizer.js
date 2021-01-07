import React, { Component } from 'react';
import Node from '../Node/Node';
import './Pathvisualizer.css';

class pathvisualizer extends Component {
    state = {
        grid: []
    }

    componentDidMount = () => {
        let newGrid = this.initialGrid();
        this.setState({
             grid:newGrid
        })
    };
    
    initialGrid = () => {
        const nodes = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = []; 
            for (let col = 0; col < 60; col++) {
                const isVisited = false;
                const isWall = false;
                currentRow.push(this.newNode(row, col, isVisited, isWall));
            }
            nodes.push(currentRow);
        }
        return nodes;
    };

    newNode = (row, col, isVisited, isWall) => {
        return [row, col, isVisited, isWall]
    }
    
    render() {
        return (
            <div className="grid" >
                <button>Visualise BFS</button>
                {this.state.grid.map((row, rowIndex) => {
                    return (
                        <div key = {rowIndex}>
                            {
                                row.map((node, nodeIndex) => 
                                {
                                    return (
                                    <Node row = {node[0]} col={node[1]} isVisited = {node[2]} isWall = {node[3]} key = {nodeIndex}/> 
                                    )
                                })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default pathvisualizer;