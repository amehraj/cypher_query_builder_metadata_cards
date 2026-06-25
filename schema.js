
const graphEdges = [

  {
    from: "Organization",
    relationship: "HAS_DEVELOPED_AI_MODEL",
    to: "AI_Model"
  },

  {
    from: "Organization",
    relationship: "HAS_DEVELOPED_SOFTWARE_SYSTEM",
    to: "Software_System"
  },

  {
    from: "Organization",
    relationship: "OWNS_DATA",
    to: "Data"
  },

  {
    from: "Software_System",
    relationship: "HAS_DATA",
    to: "Data"
  },

  {
    from: "Software_System",
    relationship: "HAS_AI_MODEL",
    to: "AI_Model"
  },

  {
    from: "Software_System",
    relationship: "HAS_SOFTWARE_USER",
    to: "Software_User"
  },

  {
    from: "Software_System",
    relationship: "HAS_SOFTWARE_COMPONENT",
    to: "Software_Component"
  },



  {
    from: "Software_User",
    relationship: "SOFTWARE_USER_ROLE_TYPE_OF",
    to: "Software_User_Role_Type"
  },

  {
    from: "Software_User",
    relationship: "ASSIGNED_DOCTOR",
    to: "Software_User"
  },

  {
    from: "Software_User_Role_Type",
    relationship: "HAS_ACCESS",
    to: "Software_Component"
  },

  {
    from: "Software_Component",
    relationship: "SOFTWARE_COMPONENT_ACTION_TYPE",
    to: "Action_Type"
  },

  {
    from: "AI_Model",
    relationship: "TRAINED_ON",
    to: "Data"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_INTENDED_USE_TYPE",
    to: "Use_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_MISUSE_TYPE",
    to: "Use_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_INTENDED_USE_DOMAIN",
    to: "Domain"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_MISUSE_DOMAIN",
    to: "Domain"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_INTENDED_USER",
    to: "User_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_MISUSE_USER",
    to: "User_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_BIAS_TYPE",
    to: "Bias_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_RISK_MITIGATION_TYPE",
    to: "Mitigation_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_BIAS_MITIGATION_TYPE",
    to: "Mitigation_Type"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_RISK_SEVERITY",
    to: "Severity"
  },

  {
    from: "AI_Model",
    relationship: "AI_MODEL_RISK_FACTOR",
    to: "Factor"
  },

  {
    from: "Data",
    relationship: "DATA_INTENDED_USE_TYPE",
    to: "Use_Type"
  },

  {
    from: "Data",
    relationship: "DATA_MISUSE_TYPE",
    to: "Use_Type"
  },

  {
    from: "Data",
    relationship: "DATA_INTENDED_USE_DOMAIN",
    to: "Domain"
  },

  {
    from: "Data",
    relationship: "DATA_MISUSE_DOMAIN",
    to: "Domain"
  },

  {
    from: "Data",
    relationship: "DATA_INTENDED_USER",
    to: "User_Type"
  },

  {
    from: "Data",
    relationship: "DATA_MISUSE_USER",
    to: "User_Type"
  },

  {
    from: "Data",
    relationship: "DATA_BIAS_TYPE",
    to: "Bias_Type"
  },

  {
    from: "Data",
    relationship: "DATA_BIAS_MITIGATION_TYPE",
    to: "Mitigation_Type"
  },

  {
    from: "Data",
    relationship: "DATA_RISK_MITIGATION_TYPE",
    to: "Mitigation_Type"
  },

  {
    from: "Data",
    relationship: "DATA_RISK_SEVERITY",
    to: "Severity"
  },

  {
    from: "Data",
    relationship: "DATA_RISK_FACTOR",
    to: "Factor"
  }

];

module.exports = {
  graphEdges
};
