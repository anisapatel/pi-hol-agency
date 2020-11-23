class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }
  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }
  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;

    this.nodes.forEach((node) => {
      if (node !== startNode) {
        times[node] = Infinity;
      }
    });
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach((neighbor) => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }
    return `Path is ${path} and time is ${times[endNode]}`;
  }
}

//move to node you haven't visited
//check how long it will take to get to differing nodes
//add weight to to the time it took to reach those nodes
//check whether calulated time is faster than previously known short time
//if faster then update shortest time
//addd node to line of nodes to visit next
//arrange node in order of shortest time

class PriorityQueue {
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
    let value = this.collection.shift();
    return value;
  }
  isEmpty() {
    return this.collection.length === 0;
  }
}

let map = new Graph();
map.addNode("A");
map.addNode("B");
map.addEdge("A", "B", 8);
map.addNode("B");
map.addNode("C");
map.addEdge("B", "C", 9);
map.addNode("C");
map.addNode("D");
map.addEdge("C", "D", 4);
map.addNode("D");
map.addNode("E");
map.addEdge("D", "E", 4);
map.addNode("B");
map.addNode("F");
map.addEdge("B", "F", 4);
map.addNode("C");
map.addNode("E");
map.addEdge("C", "E", 3);
map.addNode("D");
map.addNode("E");
map.addEdge("D", "E", 3);
map.addNode("E");
map.addNode("B");
map.addEdge("E", "B", 6);
map.addNode("C");
map.addNode("E");
map.addEdge("C", "E", 2);
map.addNode("D");
map.addNode("C");
map.addEdge("D", "C", 7);
map.addNode("E");
map.addNode("B");
map.addEdge("E", "B", 5);
map.addNode("F");
map.addNode("D");
map.addEdge("F", "D", 2);
console.log(map.adjacencyList, "<--");
console.log(map.findPathWithDijkstra("A", "B"), "<--result");
