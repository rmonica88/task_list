const aws  = require('aws-sdk');
const dyno = new aws.DynamoDB.DocumentClient();
const db   = "Task";

exports.list = (event, context, callback) => {
  var params = {
    TableName : db,
    ProjectionExpression: "#usr, #uid, completed, description, priority",
    FilterExpression: "#usr = :usr",
    ExpressionAttributeNames: {
      "#usr": "user",
      "#uid": "uuid"
    },
    ExpressionAttributeValues: {
      ":usr": JSON.parse(JSON.stringify(event.params.querystring.user))
    }
  };

  console.log("Scanning task table..");
  var items = []
  var scanExecute = function(callback) {
    dyno.scan(params, (err, result) => {
      if(err) {
        callback(err);
      } else {
        items = items.concat(result.Items);

        if(result.LastEvaluatedKey) {
          params.ExclusiveStartKey = result.LastEvaluatedKey;
          scanExecute(callback);              
        } else {
          callback(err, items);
        }   
      }
    });
  };
  scanExecute(callback);
};
