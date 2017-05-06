const aws  = require('aws-sdk');
const dyno = new aws.DynamoDB.DocumentClient();
const db   = "Task";

exports.create = (event, context, callback) => {
  console.log(event.task);

  var params = {
    TableName: db,
    Item: {
      user: JSON.parse(JSON.stringify(event.task.user)),
      description: JSON.parse(JSON.stringify(event.task.description)),
      priority: JSON.parse(event.task.priority),
      completed: JSON.parse(JSON.stringify(event.task.completed))
    }
  };

  dyno.put(params, (err, data) => {
    if(err){
      callback(err, null);
    } else {
      callback(null, { message: "Task successfully created", task: params.Item });
    }
  });
};
