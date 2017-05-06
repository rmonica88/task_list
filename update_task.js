const aws     = require('aws-sdk');
const vandium = require('vandium');
const dyno    = new aws.DynamoDB.DocumentClient();
const db      = "Task";

exports.update = vandium.api().PUT({
    body: {
        uuid: vandium.types.uuid().required(),
        user: vandium.types.string().min(5).max(24).required(),
        description: vandium.types.string().min(1).required(),
        priority: vandium.types.number().integer().min(0).max(9).required(),
        completed: vandium.types.date().required()
    }
}, (event, context, callback) => {
    console.log(event.body.uuid);
    var uid = JSON.parse(JSON.stringify(event.body.uuid));
    var params = {
        TableName: db,
        Key: {
            "uuid": uid
        },
        UpdateExpression: "SET #attrName = :attrValue, #xattrName = :xattrValue, #yattrName = :yattrValue, #zattrName = :zattrValue",
        ExpressionAttributeNames: {
            "#attrName" : "user",
            "#xattrName" : "description",
            "#yattrName" : "priority",
            "#zattrName" : "completed"
        },
        ExpressionAttributeValues: {
            ":attrValue": JSON.parse(JSON.stringify(event.body.user)),
            ":xattrValue": JSON.parse(JSON.stringify(event.body.description)),
            ":yattrValue": parseInt(event.body.priority),
            ":zattrValue": JSON.parse(JSON.stringify(event.body.completed))
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("updating task..");
    var upExec = (callback) => {
        dyno.update(params, (err, data) => {
            if(err){
                throw new Error(err);
            } else {
                callback(null, { message: "update of task " + uid + " successful", task: data });
            }
        });
    };
    return {
        body:
            {
                message: upExec(callback)
            }
    };
});
