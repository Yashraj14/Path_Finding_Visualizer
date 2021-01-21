
export function dfs(grid, startNode, endNode) {
    const vistitedNodesInOrder = [];
    const unvisitedNodes = [];
    
    unvisitedNodes.push(startNode);
    while (unvisitedNodes.length) {
        const currentNode = unvisitedNodes.pop();
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

    while (endNode != null) {
        shortestPathInOrder.unshift(endNode);
        endNode = endNode.previousNode;
    }

    return shortestPathInOrder
}