const aws     = require('aws-sdk');
const uuidV1  = require('uuid/v1');
const vandium = require('vandium');
const dyno    = new aws.DynamoDB.DocumentClient();
const db      = "Task";

exports.create = vandium.api().POST({
    body: {
        user: vandium.types.email().min(5).max(254),
        description: vandium.types.string().min(1).required(),
        priority: vandium.types.number().integer().min(0).max(9).required()
    }
}, (event, context, callback) => {
    console.log(JSON.parse(JSON.stringify(event.body)));
    var content = JSON.parse(JSON.stringify(event.body));
    var usr = content.user === undefined ? null : JSON.parse(JSON.stringify(event.body.user));
    var complt = content.completed === undefined ? null : JSON.parse(JSON.stringify(event.body.completed));
    console.log(typeof content);
    console.log('checking if user was sent' + content.user === 'undefined');
    var params = {
        TableName: db,
        Item: {
            uuid: uuidV1(),
            user: usr,
            description: JSON.parse(JSON.stringify(event.body.description)),
            priority: JSON.parse(event.body.priority),
            completed: complt
        }
    };

    var createExec = (callback) => {
        dyno.put(params, (err, data) => {
            if(err){
                throw new Error(err);
            } else {
                console.log('ok');
                callback(null, { message: 'task successfully created', task: params.Item });
            }
        });
    };
    return {
        body: { 
            message: createExec(callback)
        }
    };
});
