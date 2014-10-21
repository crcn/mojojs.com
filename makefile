
docs:
	md-doc-generator ./docs.json

update:
	make docs; git add -A; git commit -m "update docs"; git push origin master; git push heroku master;


count-words:
	TOTAL_COUNT=1;\
	for FILE in content/docs/*/*.md; \
		do COUNT=`cat "$$FILE" | node scripts/countWords.js`; \
		let "TOTAL_COUNT+=COUNT";\
	done; \
	echo $$TOTAL_COUNT;