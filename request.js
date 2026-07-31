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
      targetNode: "Use_Type",
      targetRelationship: "DATA_INTENDED_USE_TYPE",
      targetProperty: "use_type",
      targetValue: "Object Recognition"
    }
  ]
};

module.exports = request;
