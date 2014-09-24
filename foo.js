/**
 * Bower module for Unicode CLDR JSON data
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-bower/blob/master/LICENSE-MIT
 */

(function( root, factory ) {

  // UMD returnExports
  if ( typeof define === "function" && define.amd ) {

    // AMD
    define([
      "cldr",
    ], factory );
  } else {

    // Extend global
    factory( root.Cldr );
  }
}(this, function( Cldr ) {

// My awesome Foo i18n library.
function Foo( locale ) {
  var defaultNumberingSystem;

  this.cldr = new Cldr( locale );

  defaultNumberingSystem = this.cldr.main( "numbers/defaultNumberingSystem" );
  this.decimalSep = this.cldr.main([
    "numbers/symbols-numberSystem-" + defaultNumberingSystem,
    "decimal"
  ]);
}

Foo.prototype.numberFormat = function(number) {

  // Convert it into a String.
  number = "" + number;

  // Localize its decimal separator.
  number = number.replace( /\./, this.decimalSep );

  return number;
}

return Foo;

}));
