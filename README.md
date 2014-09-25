# Bower's cldr-data My Application Example

In this example, `app.js` uses Foo Number Format Library.

On `bower.json`, it defines its dependency on Foo Number Format Library,
requirejs and two requirejs plugins.

    "dependencies": {
      "foo": "rxaviers/cldr-data-bower#example-library-foo",
      "requirejs": "2.1.14",
      "requirejs-plugins": "1.0.2" ,
      "requirejs-text": "2.0.12"
    }

On `.bowerrc`, it sets the postinstall hook (and use preinstall hook to actually
install the postinstall script). See `.bowerrc`.

To run the demo:
- `bower install`.
- Browse `index.html` (locally, not via github) to try this demo out.

Expected output:

    $ bower install

    bower not-cached    git://github.com/rxaviers/cldr-data-bower.git#example-library-foo
    bower resolve       git://github.com/rxaviers/cldr-data-bower.git#example-library-foo
    bower cached        git://github.com/jrburke/requirejs-bower.git#2.1.14
    bower validate      2.1.14 against git://github.com/jrburke/requirejs-bower.git#2.1.14
    bower cached        git://github.com/millermedeiros/requirejs-plugins.git#1.0.2
    bower validate      1.0.2 against git://github.com/millermedeiros/requirejs-plugins.git#1.0.2
    bower cached        git://github.com/requirejs/text.git#2.0.12
    bower validate      2.0.12 against git://github.com/requirejs/text.git#2.0.12
    bower checkout      foo#example-library-foo
    bower invalid-meta  cldr-data-example-library-foo is missing "ignore" entry in bower.json
    bower resolved      git://github.com/rxaviers/cldr-data-bower.git#4fdae08e91
    bower cached        git://github.com/rxaviers/cldr-data-bower.git#26.0.0
    bower validate      26.0.0 against git://github.com/rxaviers/cldr-data-bower.git#>=25
    bower new           version for git://github.com/rxaviers/cldr-data-bower.git#>=25
    bower resolve       git://github.com/rxaviers/cldr-data-bower.git#>=25
    bower cached        git://github.com/rxaviers/cldrjs.git#0.3.8
    bower validate      0.3.8 against git://github.com/rxaviers/cldrjs.git#*
    bower download      https://github.com/rxaviers/cldr-data-bower/archive/26.0.1.tar.gz
    bower extract       cldr-data#>=25 archive.tar.gz
    bower invalid-meta  cldr-data is missing "ignore" entry in bower.json
    bower resolved      git://github.com/rxaviers/cldr-data-bower.git#26.0.1
    bower preinstall    npm install cldr-data-downloader
    bower install       requirejs#2.1.14
    bower install       requirejs-plugins#1.0.2
    bower install       foo#4fdae08e91
    bower install       cldrjs#0.3.8
    bower install       requirejs-text#2.0.12
    bower install       cldr-data#26.0.1
    bower postinstall   ./node_modules/cldr-data-downloader/bin/download.js -i bower_components/cldr-data/index.json -o bower_components/cldr-data/

    requirejs#2.1.14 bower_components/requirejs

    requirejs-plugins#1.0.2 bower_components/requirejs-plugins

    foo#4fdae08e91 bower_components/foo
    ├── cldr-data#26.0.1
    └── cldrjs#0.3.8

    cldrjs#0.3.8 bower_components/cldrjs

    requirejs-text#2.0.12 bower_components/requirejs-text

    cldr-data#26.0.1 bower_components/cldr-data


Browsing `index.html`:


    Follow `3.1415` formatted by our Foo library.

    In Arabic: 3٫1415

    In English: 3.1415

    In Portuguese: 3,1415


## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
