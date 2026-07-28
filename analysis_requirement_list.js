const request_1 = {
  analysisNode: "Software_System",
  targetNode: "Severity",
  targetRelationship: "DATA_RISK_SEVERITY",
  targetProperty: "severity",
  targetValue: "High"
}
const request_2 = {
  analysisNode: "AI_Model",
  targetNode: "Domain",
  targetRelationship: "AI_MODEL_INTENDED_USE_DOMAIN",
  targetProperty: "domain_name",
  targetValue: "Object Recognition"
}
const request_3 = {
  analysisNode: "Software_User",
  targetNode: "Software_Component",
  targetRelationship: "HAS_ACCESS",
  targetProperty: "software_component_name",
  targetValue: "View Record Component"
}
