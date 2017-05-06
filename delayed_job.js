const mailer    = require('sendgrid').mail;
const sg        = require('sendgrid')(process.env.SENDGRID_API_KEY);
const aws       = require('aws-sdk');
const dyno      = new aws.DynamoDB.DocumentClient();
const fromEmail = new mailer.Email('test@example.com');
const subject   = 'You have yet to complete your task!';
const db        = "Task";

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

  console.log("Scanning task table.");
  dyno.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded.");
      console.log(data.Items);
      data.Items.forEach(function(task) {
        console.log(task.user);
        var toEmail = new mailer.Email("lenguti@gmail.com");
        var content = new mailer.Content('text/plain', "You did not complete your task yet " + "blah");
        var mail    = new mailer.Mail(fromEmail, subject, toEmail, content);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function (error, response) {
          if (error) {
            console.log('Error response received');
          }
          console.log(response.statusCode);
        });

      });
    }
  }
};

