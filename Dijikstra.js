//https://medium.com/@adriennetjohnson/a-walkthrough-of-dijkstras-algorithm-in-javascript-e94b74192026

class Graph {
  //create a weighted graph
  constructor() {
    this.nodes = []; //stores the list of possible nodes
    this.adjacencyList = {}; //creates object with the node to all it's edges from that node in an array
  }
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
    //{ A: [], B: [], C: [], D: [], E: [], F: [] }
  }
  addEdge(node1, node2, weight) {
    //adds edges to that node along with it's weight/distance to get to it
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    // this.adjacencyList[node2].push({ node: node1, weight: weight });
  }

  findPathWithDijikstra(startNode, endNode) {
    let distances = {}; //stores the distances needed to reach that node from the fastest node
    let previous = {}; //store reference to the previous node
    let pq = new PriorityQueue();
    distances[startNode] = 0; //shortest time to get to start node
    //set all distances to infinity except start node
    this.nodes.forEach((node) => {
      if (node !== startNode) {
        distances[node] = Infinity;
      }
    });

    pq.enqueue([startNode, 0]); //add starting node to priority queue
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue(); //get first element in queue
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach((neighbor) => {
        //check neighbours of the first element in queue using adjacency list
        let distance = distances[currentNode] + neighbor.weight; ///adds neighbours distance to the distance it took to get there
        if (distance < distances[neighbor.node]) {
          //check whether calulated time is faster than previously known short time
          // if smallest distance is found then update new smallest distance to neighbour
          distances[neighbor.node] = distance;
          //update previous how we got to the neighbour
          previous[neighbor.node] = currentNode;
          //add this node to line of nodes to visit next
          pq.enqueue([neighbor.node, distance]);
        }
      });
    }

    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode && !path.includes(undefined)) {
      path.unshift(previous[lastStep]);
      lastStep = previous[lastStep];
    }
    return {
      routes: this.formatOutput(path),
      distance: distances[endNode] !== Infinity ? distances[endNode] : 0,
    };
  }
  formatOutput(path) {
    if (path.includes(undefined)) return [];
    let routes = [];
    let pair = "";
    for (let i = 0; i < path.length - 1; i++) {
      pair = path[i] + path[i + 1];
      routes.push(pair);
    }
    return routes;
  }
}

class PriorityQueue {
  //first in first out
  constructor() {
    this.collection = [];
  }
  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }
  dequeue() {
    let value = this.collection.shift(); //removes first element in the queue
    return value;
  }
  isEmpty() {
    return this.collection.length === 0;
  }
}

module.exports = Graph;
