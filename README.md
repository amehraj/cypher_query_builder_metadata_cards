# Cypher Query Builder for Metadata Card Analysis

**Author:** Ali Mehraj  
**Organization:** Tampere University  
**Version:** 1.0

## Overview

This application supports knowledge-graph-based analysis of software metadata by generating Cypher queries for a Neo4j database. It is designed for scenarios where users need to explore relationships between software systems, AI models, data assets, components, users, and related risk or use metadata cards for analysis.

The system transforms an analysis request into a tailored Cypher query, traverses the graph schema to find the required paths between nodes, and executes the query against a Neo4j instance. The output is returned as structured JSON data that can be used for further analysis or integration into downstream tools.

## Key Functionalities

The application provides the following core capabilities:

- Generates Cypher queries dynamically from analysis requirements.
- Builds traversal paths across a predefined graph schema of software and AI-related entities.
- Supports one or more target conditions in a single request.
- Resolves relationships such as data risk, intended use, domain relevance, and access paths.
- Connects to a Neo4j database, executes the generated query, and returns the results in a readable JSON format.
- Enables analysis of metadata cards through a graph-based representation rather than static tables.

## Application Workflow

1. The application reads an analysis request from the request configuration.
2. The query builder inspects the graph schema and determines the shortest valid traversal path between the analysis node and each target node.
3. The generated MATCH and WHERE clauses are assembled into a complete Cypher query.
4. The query is executed against Neo4j using the configured database credentials.
5. The returned records are transformed into plain JSON objects for easy inspection.

## Project Structure

- index.js — entry point of the application.
- queryBuilder.js — constructs the Cypher query from the supplied request.
- pathFinder.js — resolves graph paths between nodes based on the schema.
- schema.js — defines the available graph relationships used by the query builder.
- request.js — example analysis request used by the application.
- analysis_requirement_list.js — additional sample analysis requirements.
- neo4j_data_importer/ — contains a Neo4j import package for loading the graph model and data into Neo4j Aura.

## Prerequisites

- Node.js
- A running Neo4j instance or Neo4j Aura deployment
- Access credentials for the target database

## Installation and Execution

Follow these steps from start to finish to run the application with Neo4j:

1. Install dependencies:
   npm install

2. Create a .env file in the project root and configure the Neo4j connection details:
   NEO4J_URI
   NEO4J_USERNAME
   NEO4J_PASSWORD

3. Import the sample graph data into Neo4j Aura:
   - Open your Neo4j Aura instance.
   - Go to the Import tab.
   - Upload the zip file from the neo4j_data_importer folder.
   - Choose the Open model with data option to load the graph model and example data.

4. Define the analysis request in request.js or analysis_requirement_list.js according to the use case you want to test. A sample is already provided in the file. The request object should include:
   - analysisNode: the starting node for the query.
   - targets: an array of one or more target conditions.
   - Each target condition should contain:
     - targetNode: the node you want to reach.
     - targetRelationship: targetNode's final relationship that originates from the analysisNode
     - targetProperty: the property to compare.
     - targetValue: the value to match.


   Example structure:
   ```js
   const request = {
     analysisNode: "Software_System",
     targets: [
       {
         targetNode: "Severity",
         targetRelationship: "DATA_RISK_SEVERITY",
         targetProperty: "severity",
         targetValue: "High"
       }
     ]
   };
   ```

   In this example, the application starts from the Software_System node, then looks for a path to the Severity node using the relationship DATA_RISK_SEVERITY. It then filters the result so that the severity property equals High. You can extend the targets array with additional conditions if you want to combine multiple constraints in one query.

5. Start the application:
   npm start

The application will generate the Cypher query, connect to Neo4j, and print the results to the console.

## Example Use Case

The application can be used to answer questions such as:

- Which software systems are associated with high-severity data risks?
- Which AI models are linked to a specific use type or domain?
- Which software components are connected to a given user role or access pattern?

To use the application for a specific analysis scenario, the user must define the corresponding use case in the request configuration file manually. At present, automated conversion from natural language to machine-interpretable requests is not supported.

Before running the application, the graph model and data should first be imported into Neo4j Aura if the user wishes to test the provided example. The zip file in the neo4j_data_importer folder is therefore intended as a sample import package for evaluation purposes. Users are free to define their own graph models and datasets instead, and in that case the schema definition in schema.js should be updated to match the corresponding graph database model and structure.


## Disclaimer

Part of the coding for this project was assisted by AI.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.