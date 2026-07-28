const { graphEdges } = require("./schema");

function findPath(startNode, analysisNode) {

  const queue = [
    {
      node: startNode,
      path: []
    }
  ];

  const visited = new Set();

  while (queue.length) {

    const current = queue.shift();

    if (current.node === analysisNode) {
      return current.path;
    }

    if (visited.has(current.node)) {
      continue;
    }

    visited.add(current.node);

    graphEdges
      .filter(edge => edge.from === current.node)
      .forEach(edge => {

        queue.push({
          node: edge.to,
          path: [
            ...current.path,
            edge
          ]
        });

      });
  }

  return null;
}

function findOutgoingEdge(fromNode, relationship) {
  const { graphEdges } = require("./schema");
  return graphEdges.find(e => e.from === fromNode && e.relationship === relationship) || null;
}

function findPathToNodeWithOutgoingRelationship(startNode, relationship, relTargetNode) {
  const { graphEdges } = require("./schema");

  const queue = [
    {
      node: startNode,
      path: []
    }
  ];

  const visited = new Set();

  while (queue.length) {
    const current = queue.shift();

    // Check if current node has outgoing edge matching relationship to relTargetNode
    const outgoing = graphEdges.find(e => e.from === current.node && e.relationship === relationship && e.to === relTargetNode);
    if (outgoing) {
      return {
        path: current.path,
        outgoingEdge: outgoing
      };
    }

    if (visited.has(current.node)) {
      continue;
    }

    visited.add(current.node);

    graphEdges
      .filter(edge => edge.from === current.node)
      .forEach(edge => {
        queue.push({
          node: edge.to,
          path: [
            ...current.path,
            edge
          ]
        });
      });
  }

  return null;
}

module.exports = {
  findPath,
  findOutgoingEdge,
  findPathToNodeWithOutgoingRelationship
};