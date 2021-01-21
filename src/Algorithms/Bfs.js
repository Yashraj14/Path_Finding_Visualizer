
export function bfs(grid, startNode, endNode) {
    const vistitedNodesInOrder = [];
    const unvisitedNodes = [];
    
    unvisitedNodes.unshift(startNode);
    while (unvisitedNodes.length) {
        const currentNode = unvisitedNodes.shift();
        if (currentNode === endNode) {
            return vistitedNodesInOrder;
        }
        if (!currentNode.isWall && (currentNode.startNode || !currentNode.isVisited)) {
            currentNode.isVisited = true;
            vistitedNodesInOrder.push(currentNode);

            let newNode;

            if (currentNode.row > 0) {
                newNode = grid[currentNode.row - 1][currentNode.col];
                if (!newNode.isVisited) {
                    newNode.previousNode = currentNode;
                    unvisitedNodes.push(newNode);
                }
            }

            if (currentNode.row < grid.length - 1) {
                newNode = grid[currentNode.row + 1][currentNode.col];
                if (!newNode.isVisited) {
                    newNode.previousNode = currentNode;
                    unvisitedNodes.push(newNode);
                }
            }

            if (currentNode.col > 0) {
                newNode = grid[currentNode.row][currentNode.col - 1];
                if (!newNode.isVisited) {
                    newNode.previousNode = currentNode;
                    unvisitedNodes.push(newNode);
                }
            }

            if (currentNode.col < grid[0].length - 1) {
                newNode = grid[currentNode.row][currentNode.col + 1];
                if (!newNode.isVisited) {
                    newNode.previousNode = currentNode;
                    unvisitedNodes.push(newNode);
                }
            }
        }
    }
}

export function getShortestPathInOrder (endNode) {
    const shortestPathInOrder = [];
    if(endNode != null){
    endNode = endNode.previousNode;
    while (endNode.previousNode != null) {
        shortestPathInOrder.unshift(endNode);
        endNode = endNode.previousNode;
    }
   }
    return shortestPathInOrder;
}