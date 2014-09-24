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

Browse `index.html` (locally, not via github) to try this demo out.

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)
