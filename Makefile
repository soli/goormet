SED = gsed
CHROME = /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
VERSION = $(shell $(SED) -n -e 's/^.*"version": *"\(.*\)".*$$/\1/p' manifest.json)

goormet.crx: goormet*.png manifest.json *.html
	mkdir goormet
	cp manifest.json $$($(SED) -n -e 's/.*: [[ ]*"\([^ ]*\.\(png\|html\|js\)\)".*$$/\1/p' manifest.json) goormet
	$(CHROME) --pack-extension=goormet --pack-extension-key=goormet.pem
	rm -Rf goormet
	cp $@ $$(basename $@ .crx)_$(VERSION).crx
