request = {
  targetNode: "Software_System",
  filterNode: "Severity",
  targetRelationship: "DATA_RISK_SEVERITY",
  filterProperty: "severity",
  parameterValue: "High"
}
request = {
  targetNode: "AI_Model",
  filterNode: "Domain",
  targetRelationship: "AI_MODEL_INTENDED_USE_DOMAIN",
  filterProperty: "domain_name",
  parameterValue: "Object Recognition"
}
request = {
  targetNode: "Software_User",
  filterNode: "Software_Component",
  targetRelationship: "HAS_ACCESS",
  filterProperty: "software_component_name",
  parameterValue: "View Record Component"
}
