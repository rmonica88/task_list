const aws       = require('aws-sdk');
const dyno      = new aws.DynamoDB.DocumentClient();
const db        = "Task";

exports.list = (event, context, callback) => {
  var params = {
    TableName : db,
    ProjectionExpression: "#usr, completed, description, priority",
    FilterExpression: "#usr = :usr",
    ExpressionAttributeNames: {
      "#usr": "user"
    },
    ExpressionAttributeValues: {
      ":usr": JSON.parse(JSON.stringify(event.task.user))
    }
  };

  console.log("Scanning task table..");
  dyno.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("scan succeeded..");
      console.log(data.Items);
      callback(null, { tasks: JSON.stringify(data.Items) });
    }
  }
};
