# Task List Application

Task list API created with NodeJS and Amazon web services which include Lambda, DynamoDB, and API Gateway.

### Workflow
------------------------

Basic CRUD application built for serverless architecture, users will be able to create, update, list, and destroy tasks. Daily emails will be sent out to users who have taks which have yet been completed.

Task structure:
```JSON
{
    "uuid": "string",
    "user": "string",
    "description": "string",
    "priority": "integer",
    "completed": "string"
}
```

#### API USE

Base URL API:
```
https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev
```

List Tasks:
```JSON
/list-tasks

https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev/list-tasks

query string paramater required:
user: "string (email)"

e.x.
https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev/list-tasks?user=lenguti@gmail.com

sample return values:
[
  {
    "completed": null,
    "priority": 2,
    "user": "lenguti@gmail.com",
    "uuid": "261c58b0-3294-11e7-adf8-a7ee96292be9",
    "description": "Do something even better"
  }
]
```

Create Task:
```JSON
/new-task

https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev/new-task

POST body requiremnets:
description: "string",
priority: "integer"

sample post data:
{
    "user": "lenlen@beemail.com",
    "description": "sweet new task",
    "priority": 2,
    "completed": "2016-07-06T12:22:46-04:00"
}

sample return values:
{
  "message": "task successfully created",
  "task": {
    "uuid": "5a34f520-3380-11e7-881e-d52fdf65ee25",
    "user": "jonbee@beemail.com",
    "description": "sweet new task",
    "priority": 2,
    "completed": "2016-07-06T12:22:46-04:00"
  }
}
```

Update Task:
```JSON
/update-task

https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev/update-task

POST body requiremnets:
uuid: "string",
user: "string",
description: "string",
priority: "integer",
completed: "string"

sample post data:
{
    "uuid": "330d67a0-3292-11e7-947d-6f909c7560d1",
	  "user": "replaced@beemail.com",
    "description": "sweet replacement task",
    "priority": 2,
    "completed": "2016-07-06T12:22:46-04:00"
}

sample return values:
{
  "message": "update of task 330d67a0-3292-11e7-947d-6f909c7560d1 successful",
  "task": {
    "Attributes": {
      "completed": "2016-07-06T16:22:46.000Z",
      "priority": 2,
      "user": "replaced@beemail.com",
      "description": "sweet replacement task"
    }
  }
}
```

Delete Task:
```JSON
/delete-task

https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev/delete-task

POST body requiremnets:
uuid: "string"

sample post data:
{
    "uuid": "330d67a0-3292-11e7-947d-6f909c7560d1"
}

sample return values:
{}
```

POSTMAN Collection available at:
`https://drive.google.com/file/d/0B8ZUWcJkl_npOE1PNnRUNmNHaXc/view?usp=sharing`
