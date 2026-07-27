const request_1 = {
  targetNode: "Software_System",
  filterNode: "Severity",
  targetRelationship: "DATA_RISK_SEVERITY",
  filterProperty: "severity",
  parameterValue: "High"
}
const request_2 = {
  targetNode: "AI_Model",
  filterNode: "Domain",
  targetRelationship: "AI_MODEL_INTENDED_USE_DOMAIN",
  filterProperty: "domain_name",
  parameterValue: "Object Recognition"
}
const request_3 = {
  targetNode: "Software_User",
  filterNode: "Software_Component",
  targetRelationship: "HAS_ACCESS",
  filterProperty: "software_component_name",
  parameterValue: "View Record Component"
}
