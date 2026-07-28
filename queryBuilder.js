const { findPath, findOutgoingEdge } = require("./pathFinder");

function buildQuery(request) {

  const {
    analysisNode,
    targetNode,
    targetProperty,
    targetValue,
    targetRelationship
  } = request;

  let path =
    findPath(
      analysisNode,
      targetNode
    );

  let appendedOutgoing = null;

  // If a targetRelationship is specified, try to find a path to a node
  // that has an outgoing edge with that relationship to the targetNode.
  if (targetRelationship && !path) {
    const found = findPathToNodeWithOutgoingRelationship(analysisNode, targetRelationship, targetNode);
    if (found) {
      path = found.path.concat(found.outgoingEdge);
      appendedOutgoing = found.outgoingEdge;
    }
  }

  if (!path) {
    throw new Error(
      `No path found from ${analysisNode} to ${targetNode}`
    );
  }

  const aliases = {};

  let aliasCounter = 0;

  function alias(label) {

    if (!aliases[label]) {
      aliases[label] =
        label.toLowerCase()
          .replace(/[^a-z]/g, "")
          .substring(0, 3) +
        aliasCounter++;
    }

    return aliases[label];
  }

  let cypher =
    `MATCH (${alias(analysisNode)}:${analysisNode})`;

  for (const edge of path) {
    cypher += `
MATCH (${alias(edge.from)})
      -[:${edge.relationship}]
      ->(${alias(edge.to)}:${edge.to})`;

    // If this edge matches the target relationship, stop here
    if (targetRelationship && edge.relationship === targetRelationship) {
      break;
    }

    // If we already appended an outgoing edge as part of a found path,
    // stop after reaching it.
    if (appendedOutgoing && edge === appendedOutgoing) {
      break;
    }
  }

  cypher += `

WHERE ${alias(targetNode)}.${targetProperty}
      = "${targetValue}"
RETURN ${alias(analysisNode)}
`;
// RETURN DISTINCT ${alias(analysisNode)} AS ${analysisNode},
  return cypher;
}

module.exports = {
  buildQuery
};