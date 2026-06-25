const { findPath, findOutgoingEdge } = require("./pathFinder");

function buildQuery(request) {

  const {
    targetNode,
    filterNode,
    filterProperty,
    parameterName,
    targetRelationship
  } = request;

  let path =
    findPath(
      targetNode,
      filterNode
    );

  let appendedOutgoing = null;

  // If a targetRelationship is specified, try to find a path to a node
  // that has an outgoing edge with that relationship to the filterNode.
  if (targetRelationship && !path) {
    const found = findPathToNodeWithOutgoingRelationship(targetNode, targetRelationship, filterNode);
    if (found) {
      path = found.path.concat(found.outgoingEdge);
      appendedOutgoing = found.outgoingEdge;
    }
  }

  if (!path) {
    throw new Error(
      `No path found from ${targetNode} to ${filterNode}`
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
    `MATCH (${alias(targetNode)}:${targetNode})`;

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

WHERE ${alias(filterNode)}.${filterProperty}
      = "${parameterName}"
RETURN ${alias(targetNode)}
`;
// RETURN DISTINCT ${alias(targetNode)} AS ${targetNode},
  return cypher;
}

module.exports = {
  buildQuery
};