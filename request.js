const request = {
  analysisNode: "Software_System",
  targets: [
    {
      targetNode: "Severity",
      targetRelationship: "DATA_RISK_SEVERITY",
      targetProperty: "severity",
      targetValue: "High"
    },
    {
      targetNode: "Domain",
      targetRelationship: "AI_MODEL_INTENDED_USE_DOMAIN",
      targetProperty: "domain_name",
      targetValue: "Object Recognition"
    }
  ]
};

module.exports = request;
