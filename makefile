all:
	./node_modules/.bin/coffee -o lib -c src

all-watch:
	./node_modules/.bin/coffee -o lib -cw src

clean:
	rm -rf lib