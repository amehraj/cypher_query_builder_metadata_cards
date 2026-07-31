const test = require('node:test');
const assert = require('node:assert/strict');

const { buildQuery } = require('../queryBuilder');

test('buildQuery supports multiple target conditions with AND clauses', () => {
  const request = {
    analysisNode: 'Software_System',
    targets: [
      {
        targetNode: 'Severity',
        targetRelationship: 'DATA_RISK_SEVERITY',
        targetProperty: 'severity',
        targetValue: 'High'
      },
      {
        targetNode: 'Domain',
        targetRelationship: 'AI_MODEL_INTENDED_USE_DOMAIN',
        targetProperty: 'domain',
        targetValue: 'Object Recognition'
      }
    ]
  };

  const query = buildQuery(request);

  assert.match(query, /MATCH \(sof0:Software_System\)/);
  assert.match(query, /MATCH \(sof0\)-\[:HAS_DATA\]->\([^)]*:Data\)/);
  assert.match(query, /\[:DATA_RISK_SEVERITY\]/);
  assert.match(query, /\[:HAS_AI_MODEL\]/);
  assert.match(query, /\[:AI_MODEL_INTENDED_USE_DOMAIN\]/);
  assert.match(query, /WHERE .*severity = "High" AND .*domain = "Object Recognition"/s);
  assert.match(query, /RETURN sof0/);
});
