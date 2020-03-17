install:
	npm install

start:
	npx babel src --out-dir dist

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npx jest --coverage