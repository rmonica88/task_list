const aws  = require('aws-sdk');
const dyno = new aws.DynamoDB.DocumentClient();
const db   = "Task";

exports.update = (event, context, callback) => {
  console.log(event.task);
  var uuid = JSON.parse(JSON.stringify(event.task.uuid))
    var params = {
      TableName: db,
      Key: {
        "uuid": uuid
      },
      UpdateExpression: "SET #attrName = :attrValue, #nattrName = :nattrValue",
      ExpressionAttributeNames: {
        "#attrName" : "description",
        "#nattrName" : "priority"
      },
      ExpressionAttributeValues: {
        ":attrValue": JSON.parse(JSON.stringify(event.task.description)),
        ":nattrValue": parseInt(event.task.priority)
      },
      ReturnValues:"UPDATED_NEW"
    };

  console.log("updating task..");
  dyno.update(params, (err, data) => {
    if(err){
      callback(JSON.stringify(err, null, 2), null);
    } else {
      callback(null, { message: "update of task " + uuid + " successful", task: JSON.stringify(data, null, 2) });
    }
  });
};
