CC    = curl -H "Content-Type: application/json"
BASE  = https://10udnqa929.execute-api.us-east-1.amazonaws.com/dev
CPOST = -X POST
CGET  = -X GET
CPUT  = -X PUT
CDEL  = -X DELETE

default:
	make run FILE=index

clean:
	rm *.zip

tests:
	make test.get
	make test.update
	make test.post
	make test.delete

run:
	make clean
	zip -r Archive.zip "${FILE}".js package.json node_modules

test.get:
	echo "now testing get request"
	${CC} ${CGET} ${BASE}/list-tasks?user=lenguti@gmail.com

test.update:
	echo "now testing update request"
	${CC} ${CPUT} ${BASE}/update-task -d '{"uuid": "ae3fa140-332d-11e7-8ac6-63f6d1cb599a", "user": "gerbs@doggie.com", "description": "changed this", "priority": 2, "completed": "2016-07-06T12:22:46-04:00"}'

test.post:
	echo "now testing post request"
	${CC} ${CPOST} ${BASE}/new-task -d '{"user": "gerbs@doggie.com", "description": "worked", "priority": 2, "completed": "2016-07-06T12:22:46-04:00"}'

test.delete:
	echo "now testing delete request"
	${CC} ${CDEL} ${BASE}/delete-task -d '{"uuid": "e8e2c150-321b-11e7-a6f3-6bfde052e698"}'
