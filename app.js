/**
 * Bower module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-bower/blob/master/LICENSE-MIT
 */

require.config({
  paths: {
    // cldr.js is a Foo dependency.
    cldr: "./bower_components/cldrjs/dist/cldr",

    // Unicode CLDR JSON data.
    cldrData: "./bower_components/cldr-data",

    // require.js plugin we'll use to fetch CLDR JSON content.
    json: "./bower_components/requirejs-plugins/src/json",

    // text is json's dependency.
    text: "./bower_components/requirejs-text/text",

    // Foo path.
    foo: "./bower_components/foo/foo"
  }
});


/**
 * 2. Require dependencies and run your code.
 */
require([
  "cldr",
  "foo",

  // CLDR content.
  "json!cldrData/main/ar/numbers.json",
  "json!cldrData/main/en/numbers.json",
  "json!cldrData/main/pt/numbers.json",
  "json!cldrData/supplemental/likelySubtags.json"
], function( Cldr, Foo, arNumbers, enNumbers, ptNumbers, likelySubtags ) {

  var ar, en, pt;

  // At this point, we have Cldr, Foo and the CLDR JSON data loaded.
  Cldr.load( arNumbers );
  Cldr.load( enNumbers );
  Cldr.load( ptNumbers );
  Cldr.load( likelySubtags );

  ar = new Foo( "ar" );
  en = new Foo( "en" );
  pt = new Foo( "pt" );

  document.getElementById( "requirements" ).style.display = "none";
  document.getElementById( "demo" ).style.display = "block";

  document.getElementById( "ar" ).innerHTML = ar.numberFormat( 3.1415 );
  document.getElementById( "en" ).innerHTML = en.numberFormat( 3.1415 );
  document.getElementById( "pt" ).innerHTML = pt.numberFormat( 3.1415 );

});
