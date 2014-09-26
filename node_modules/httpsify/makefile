ALL_TESTS = $(shell find  ./test-name "*-test.js")
REPORTER = dot
ONLY = "."
TIMEOUT=100

test-watch:
	./node_modules/.bin/_mocha $(ALL_TESTS) --timeout $(TIMEOUT) --reporter $(REPORTER) -g $(ONLY) --watch ./test

test-node:
	./node_modules/.bin/_mocha  $(ALL_TESTS) --timeout $(TIMEOUT) --reporter $(REPORTER) -g $(ONLY) 
