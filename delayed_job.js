const api_key   = process.env.MG_API_KEY;
const domain    = 'mg.tasklist.com';
const aws       = require('aws-sdk');
const mg        = require('mailgun-js')({apiKey: api_key, domain: domain});
const dyno      = new aws.DynamoDB.DocumentClient();
const fromEmail = 'bot@tasklist.com';
const subject   = 'You have yet to complete your task!';
const db        = 'Task';

exports.emailer = (event, context, callback) => {
    var params = {
        TableName : db,
        ProjectionExpression: "#usr, completed, description",
        FilterExpression: "attribute_exists(completed) AND completed = :empty",
        ExpressionAttributeNames: {
            "#usr": "user"
        },
        ExpressionAttributeValues: {
            ":empty": null
        }
    };

    dyno.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log('ok');
            console.log(data.Items);
            data.Items.forEach(function(task) {
                console.log(task.user);
                var data = {
                    from: fromEmail,
                    to: task.user,
                    subject: subject,
                    text: "You have yet to complete your task! Task: " + task.description
                };

                mg.messages().send(data, function (error, body) {
                    if(err) {
                        console.log(error);
                    } else {
                        console.log(body);
                    }
                });
            });
        }
    }
};
