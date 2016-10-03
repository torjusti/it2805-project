all: compress upload

compress:
	7z a -r Documents.zip Documents

upload:
	rsync -avzP --exclude-from='exclusions.txt' --exclude-from='.gitignore' . torjusti@login.stud.ntnu.no:~/public_html

clean:
	rm Documents.zip
