const { findPath, findPathToNodeWithOutgoingRelationship } = require("./pathFinder");

function buildQuery(request) {

  const {
    analysisNode,
    targetNode,
    targetProperty,
    targetValue,
    targetRelationship,
    targets
  } = request;

  const targetConditions = Array.isArray(targets) && targets.length
    ? targets
    : [
        {
          targetNode,
          targetProperty,
          targetValue,
          targetRelationship
        }
      ];

  if (!analysisNode) {
    throw new Error("An analysisNode is required to build a query");
  }

  if (!targetConditions.length) {
    throw new Error("At least one target condition is required to build a query");
  }

  const resolvedTargets = targetConditions.map((condition) => {
    const {
      targetNode: conditionTargetNode,
      targetProperty: conditionTargetProperty,
      targetValue: conditionTargetValue,
      targetRelationship: conditionTargetRelationship
    } = condition;

    if (!conditionTargetNode || !conditionTargetProperty || conditionTargetValue === undefined) {
      throw new Error("Each target condition must include targetNode, targetProperty, and targetValue");
    }

    let path = null;
    let appendedOutgoing = null;

    if (conditionTargetRelationship) {
      const found = findPathToNodeWithOutgoingRelationship(analysisNode, conditionTargetRelationship, conditionTargetNode);
      if (found) {
        path = found.path.concat(found.outgoingEdge);
        appendedOutgoing = found.outgoingEdge;
      }
    }

    if (!path) {
      path = findPath(analysisNode, conditionTargetNode);
    }

    if (!path) {
      throw new Error(
        `No path found from ${analysisNode} to ${conditionTargetNode}`
      );
    }

    return {
      targetNode: conditionTargetNode,
      targetProperty: conditionTargetProperty,
      targetValue: conditionTargetValue,
      targetRelationship: conditionTargetRelationship,
      path,
      appendedOutgoing
    };
  });

  const aliases = {};

  let aliasCounter = 0;

  function alias(label, key) {
    const aliasKey = key || label;

    if (!aliases[aliasKey]) {
      aliases[aliasKey] =
        label.toLowerCase()
          .replace(/[^a-z]/g, "")
          .substring(0, 3) +
        aliasCounter++;
    }

    return aliases[aliasKey];
  }

  let cypher =
    `MATCH (${alias(analysisNode, `analysis:${analysisNode}`)}:${analysisNode})`;

  const emittedMatches = new Set();

  resolvedTargets.forEach((targetCondition, index) => {
    for (const edge of targetCondition.path) {
      const fromAlias = alias(edge.from);
      const toAlias = alias(edge.to);
      const matchKey = `${fromAlias}->${edge.relationship}->${toAlias}`;

      if (!emittedMatches.has(matchKey)) {
        cypher += `\nMATCH (${fromAlias})-[:${edge.relationship}]->(${toAlias}:${edge.to})`;
        emittedMatches.add(matchKey);
      }

      if (targetCondition.targetRelationship && edge.relationship === targetCondition.targetRelationship) {
        break;
      }

      if (targetCondition.appendedOutgoing && edge === targetCondition.appendedOutgoing) {
        break;
      }
    }
  });

  const whereClauses = resolvedTargets.map((targetCondition, index) => {
    const valueLiteral = typeof targetCondition.targetValue === "string"
      ? `"${targetCondition.targetValue.replace(/"/g, '\\"')}"`
      : JSON.stringify(targetCondition.targetValue);

    return `${alias(targetCondition.targetNode)}.${targetCondition.targetProperty} = ${valueLiteral}`;
  });

  cypher += `\nWHERE ${whereClauses.join(" AND ")}\nRETURN ${alias(analysisNode, `analysis:${analysisNode}`)}\n`;

  return cypher;
}

module.exports = {
  buildQuery
};