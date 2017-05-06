FILE="${1}.js"

default:
	make run

clean:
	rm Archive.zip

run:
	make clean
	zip -r Archive.zip "${FILE}".js package.json node_modules

