import React, { Component } from 'react';
import Node from '../Node/Node';
import './Pathvisualizer.css';
import { bfs,getShortestPathInOrder } from '../Algorithms/Bfs.js';
import { dfs } from '../Algorithms/Dfs.js';

const start_node_row = 4;
const start_node_col = 5;
const finish_node_row = 16;
const finish_node_col = 54;

class pathvisualizer extends Component {
    state = {
        grid: [],
        mouseIsClicked: false,
    }

    componentDidMount = () => {
        let newGrid = initialGrid();
        this.setState({
             grid:newGrid
        })
    };

    handleMouseOver = (row,col) => {
    let newGrid = newGridWithMouseOver(this.state.grid, row, col);
    this.setState({grid:newGrid, mouseIsClicked: true})
    };

    handleMouseEnter = (row,col) => {
        if(!this.state.mouseIsClicked) return;
        let newGrid = newGridWithMouseOver(this.state.grid, row, col)
        this.setState({grid:newGrid})
    };

    handleMouseOverAgain = () => {
        this.setState({mouseIsClicked: false})
    };

    animatePath(visitedNodesInOrder, shortestPathInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathInOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node visited-node';
      }, 10 * i);
    }
  }

    animateShortestPath(shortestPathInOrder){
        for (let i = 0; i < shortestPathInOrder.length; i++) {
        setTimeout(() => {
            const node = shortestPathInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path';
        }, 50 * i);
        }
    }

    visualizeBfs = (grid, startNode, finishNode) => {
        grid = this.state.grid;
        startNode = grid[start_node_row][start_node_col];
        finishNode = grid[finish_node_row][finish_node_col];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const shortestPathInOrder = getShortestPathInOrder(finishNode);
        this.animatePath(visitedNodesInOrder,shortestPathInOrder);
    };

    visualizeDfs = (grid, startNode, finishNode) => {
        grid = this.state.grid;
        startNode = grid[start_node_row][start_node_col];
        finishNode = grid[finish_node_row][finish_node_col];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const shortestPathInOrder = getShortestPathInOrder(finishNode);
        this.animatePath(visitedNodesInOrder,shortestPathInOrder);
    };
    
    render() {
        return (
            <div>
                <button onClick = {this.visualizeBfs}>Visualize BFS</button>
                <button onClick = {this.visualizeDfs}>Visualize DFS</button>
                <button onClick = {this.componentDidMount}>Clear Grid</button>
            <div className="grid" >
                {this.state.grid.map((row, rowIndex) => {
                    return (
                        <div key = {rowIndex}>
                            {
                                row.map((node, nodeIndex) => 
                                {
                                    return (
                                    <Node row = {node.row} col={node.col} 
                                          isVisited = {node.isVisited} 
                                          isWall = {node.isWall} 
                                          key = {nodeIndex} 
                                          startNode = {node.startNode} 
                                          finishNode = {node.finishNode}
                                          previousNode = {node.previousNode}
                                          mouseIsClicked = {this.state.mouseIsClicked}
                                          onMouseDown = {(row,col) => this.handleMouseOver(node.row,node.col)}
                                          onMouseEnter = {(row,col) => this.handleMouseEnter(node.row,node.col)}
                                          onMouseUp = {() => this.handleMouseOverAgain()}/> 
                                    )
                                })}
                        </div>
                    )
                })}
            </div>
            </div>
        );
    }
}

const initialGrid = () => {
    const nodes = [];
        for (let row = 0; row < 26; row++) {
            const currentRow = []; 
            for (let col = 0; col < 60; col++) {
                currentRow.push(newNode(row, col));
            }
            nodes.push(currentRow);
     }
    return nodes;
};

const newNode = (row, col) => {
    return { row, col, isVisited: false, isWall: false, 
    startNode: row === start_node_row && col === start_node_col,
    finishNode: row === finish_node_row && col === finish_node_col,
    previousNode: null,
    }
};

const newGridWithMouseOver = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default pathvisualizer;