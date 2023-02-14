class Graph {
    constructor() {
      this.nodes = {};
    }
  
    addNode(node) {
      this.nodes[node] = {};
    }
  
    addEdge(node1, node2, weight) {
      if (!this.nodes[node1] || !this.nodes[node2]) return;
      this.nodes[node1][node2] = weight;
      this.nodes[node2][node1] = weight;
    }
  }