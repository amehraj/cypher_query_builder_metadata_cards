
const neo4j = require("neo4j-driver");

require("dotenv").config();

const { buildQuery } = require("./queryBuilder");
const request = require("./request");

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME,
    process.env.NEO4J_PASSWORD
  )
);

async function run() {

  const cypher =
    buildQuery(request);

  console.log(
    "\nGenerated Cypher:\n"
  );

  console.log(cypher);

  try {
    const serverInfo = await driver.getServerInfo();
    console.log(`Connected to Neo4j server version: ${serverInfo.version}`);

    const result = await driver.executeQuery(cypher);
    //console.log(result);


    const jsonData = result.records.map(record => {
      const obj = {};

      record.keys.forEach(key => {
        const value = record.get(key);

        // Convert Neo4j Node to plain object
        if (value && value.properties) {
          obj[key] = {
            id: value.identity?.toString(),
            labels: value.labels,
            ...value.properties,
          };
        } else {
          obj[key] = value;
        }
      });

      return obj;
    });

    console.log(JSON.stringify(jsonData, null, 2));

  } catch (err) {
    console.error('Error querying Neo4j:', err);
  } finally {
    await driver.close();
  }  
}
run();
