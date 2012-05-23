SED = gsed
CHROME = /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
VERSION = $(shell $(SED) -n -e 's/^.*"version": *"\(.*\)".*$$/\1/p' manifest.json)

goormet.zip: goormet*.png manifest.json *.html
	rm -Rf goormet
	mkdir goormet
	cp $$($(SED) -n -e 's/.*: [[ ]*"\([^ ]*\.\(png\|html\|js\)\)".*$$/\1/p' manifest.json) goormet
	grep -v '// ' manifest.json > goormet/manifest.json
	zip $@ goormet/*

goormet.crx: goormet.zip
	$(CHROME) --pack-extension=goormet --pack-extension-key=goormet.pem
	cp $@ $$(basename $@ .crx)_$(VERSION).crx
