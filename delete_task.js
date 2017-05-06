const aws  = require('aws-sdk');
const dyno = new aws.DynamoDB.DocumentClient();
const db   = "Task";

exports.delete = (event, context, callback) => {
  var params = {
    TableName : db,
    Key: {
      "uuid": JSON.parse(JSON.stringify(event.task.uuid))
    }
  };

  console.log("deleting record..");
  dyno.delete(params, function(err, data) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      callback(null, { message: "successfully deleted task", task: JSON.stringify(data, null, 2) });
    }
  });
};
