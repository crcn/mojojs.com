docs:
	md-doc-generator ./docs.json

update:
	make docs; git add -A; git commit -m "update docs"; git push origin master; git push heroku master;
