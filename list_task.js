const aws     = require('aws-sdk');
const vandium = require('vandium');
const dyno    = new aws.DynamoDB.DocumentClient();
const db      = "Task";

exports.list = vandium.api().GET({
    queryStringParameters: {
        user: vandium.types.string().required()
    }
}, (event, context, callback) => {
    console.log(event.queryStringParameters.user);
    var user = JSON.parse(JSON.stringify(event.queryStringParameters.user))
    var params = {
        TableName : db,
        ProjectionExpression: "#usr, #uid, completed, description, priority",
        FilterExpression: "#usr = :usr",
        ExpressionAttributeNames: {
            "#usr": "user",
            "#uid": "uuid"
        },
        ExpressionAttributeValues: {
            ":usr": user
        }
    };


    console.log("scanning task table..");
    var items = []

    var scanExec = (callback) => {
        dyno.scan(params, (err, result) => {
            if(err) {
                throw new Error(err);
            } else {
                console.log('ok');
                items = items.concat(result.Items);
                callback(null, items);
            }
        });
    };
    return {
        body: {
            tasks: scanExec(callback)
        }
    };
});
