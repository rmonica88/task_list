default:
	make run FILE=index

clean:
	rm *.zip

run:
	make clean
	zip -r Archive.zip "${FILE}".js package.json node_modules

