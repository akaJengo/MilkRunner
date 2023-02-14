const extractMinimum = (queue, dist) => {
  let minIndex = 0;
  for (let i = 1; i < queue.length; i++) {
    if (dist[queue[i]] < dist[queue[minIndex]]) {
      minIndex = i;
    }
  }
  return queue.splice(minIndex, 1)[0];
};

const dijkstra = (graph, startNode, endNode) => {
  const distances = {};
  const previousNodes = {};
  const queue = Object.keys(graph);

  for (const node in graph) {
    distances[node] = Infinity;
  }

  distances[startNode] = 0;

  while (queue.length) {
    const currentNode = extractMinimum(queue, distances);
    if (currentNode === endNode) break;

    for (const neighbor in graph[currentNode]) {
      const distance = distances[currentNode] + graph[currentNode][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previousNodes[neighbor] = currentNode;
      }
    }
  }

  let path = [endNode];
  let lastNode = endNode;

  while (lastNode !== startNode) {
    path.unshift(previousNodes[lastNode]);
    lastNode = previousNodes[lastNode];
  }

  return {
    distance: distances[endNode],
    path
  };
};

export default dijkstra; 