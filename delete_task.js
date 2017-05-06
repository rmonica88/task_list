const aws     = require('aws-sdk');
const vandium = require('vandium');
const dyno    = new aws.DynamoDB.DocumentClient();
const db      = "Task";

exports.delete = vandium.api().DELETE({
    body: {
        uuid: vandium.types.uuid().required()
    }
}, (event, context, callback) => {
    console.log(event.body);
    var uid = JSON.parse(JSON.stringify(event.body.uuid))
    var params = {
        TableName : db,
        Key: {
            "uuid": uid
        }
    };

    console.log("deleting record..");
    var delExec = (callback) => {
        dyno.delete(params, function(err, data) {
            if (err) {
                throw new Error(err);
            } else {
                callback(null, { message: 'task successfully destroyed' });
            }
        });
    };
    return {
        body: {
            message: delExec(callback)
        }
    };
});
