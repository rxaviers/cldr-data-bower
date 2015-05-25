/**
 * An AMD loader plugin for loading CLDR JSON data
 *
 * Copyright Rafael Xavier de Souza
 * Released under the MIT license
 * https://github.com/rxaviers/cldr-data-requirejs-plugin/blob/master/LICENSE-MIT
 *
 * Excerpts from millermedeiros/requirejs-plugins/json.
 */

define(["text"], function(text) {

  var buildMap = {};
  var MAIN_FILES = ["ca-buddhist", "ca-chinese", "ca-coptic", "ca-dangi",
    "ca-ethiopic-amete-alem", "ca-ethiopic", "ca-generic", "ca-gregorian",
    "ca-hebrew", "ca-indian", "ca-islamic-civil", "ca-islamic", "ca-islamic-rgsa",
    "ca-islamic-tbla", "ca-islamic-umalqura", "ca-japanese", "ca-persian", "ca-roc",
    "characters", "currencies", "dateFields", "delimiters", "languages", "layout",
    "listPatterns", "localeDisplayNames", "measurementSystemNames", "numbers",
    "posix", "scripts", "territories", "timeZoneNames", "units", "variants"
  ];
  var SUPPLEMENTAL_FILES = ["aliases", "calendarData", "calendarPreferenceData",
    "characterFallbacks", "codeMappings", "currencyData", "gender",
    "languageData", "languageMatching", "likelySubtags", "measurementData",
    "metaZones", "numberingSystems", "ordinals", "parentLocales", "plurals",
    "postalCodeData", "primaryZones", "references", "telephoneCodeData",
    "territoryContainment", "territoryInfo", "timeData", "weekData",
    "windowsZones"
  ];

  // Expand "main/{en,zh}/numbers" into ["main/en/numbers", "main/zh/numbers"].
  function braceExpansion(path) {
    var preAndPost;
    var match = path.match(/{[^}]*}/);

    if (!match) {
      return [path];
    }

    match = match[0].slice(1,-1);
    preAndPost = path.replace(/{[^}]*}/, "!").split("!");

    path = match.split(",").map(function(part) {
      return preAndPost[0] + part.trim() + preAndPost[1];
    });

    if (path[0].indexOf("{") !== -1) {
      path = path.reduce(function(ret, path) {
        [].push.apply(ret, braceExpansion(path));
        return ret;
      }, []);
    }

    return path;
  }

  // Borrowed from caolan/async.
  // FIXME: I"ve added ret to the final callback. Something is buggy. Try
  // jshinting all that.
  var root = this;
  function each(array, iterator, callback) {
    var completed = 0;
    var ret = [];
    function done(error) {
      if (error) {
        callback(error);
        callback = noop;
        return;
      }
      completed += 1;
      // ret is an array of iterators 2nd arguments (except error (1st one)).
      ret.push(arguments[1]);
      if (completed >= array.length) {
        return callback(null, ret);
      }
    }
    function _each(array, iterator) {
      var index = -1;
      var length = array.length;
      while (++index < length) {
        iterator(array[index], index, array);
      }
    }
    function onlyOnce(fn) {
      var called = false;
      return function() {
        if (called) {
          throw new Error("Callback was already called.");
        }
        called = true;
        fn.apply(root, arguments);
      };
    }
    function noop() {}
    _each(array, function(x) {
      iterator(x, onlyOnce(done));
    });
  }

  function getJson(url, callback, options) {
    text.get(
      url,
      function(data) {
        if (options.performParsing) {
          try {
            data = JSON.parse(data);
          } catch (error) {
            return callback(error);
          }
        }
        callback(null, data);
      },
      callback,
      {
        accept: "application/json"
      }
    );
  }

  function mainPathsFor(locales) {
    return locales.reduce(function(sum, locale) {
      MAIN_FILES.forEach(function(mainFile) {
        sum.push("main/" + locale + "/" + mainFile);
      });
      return sum;
    }, []);
  }

  function supplementalPaths() {
    return SUPPLEMENTAL_FILES.map(function(supplementalFile) {
      return "supplemental/" + supplementalFile;
    });
  }

  function load(name, require, onLoad, config) {
    var locales, names;
    var isBuild = config.isBuild;

    // Avoid inlining if {inlineCldrData: false} and don't inline files marked as empty.
    if ((isBuild && config.inlineCldrData === false) || require.toUrl(name).indexOf("empty:") === 0) {
      return onLoad(null);
    }

    locales = config["cldr-data"].locales;

    if (name.indexOf("entireSupplemental") !== -1) {
      names = supplementalPaths();

    // Given `cldr-data!entireMain` and config.locales = ["en", "pt", "zh"],
    // load `main/en/*.json`, `main/pt/*.json`, and // `main/zh/*.json`.
    } else if (name.indexOf("entireMain") !== -1) {
      names = mainPathsFor(locales);

    } else if (name.indexOf("main/") !== -1) {

      // Given `cldr-data!main/numbers` and config.locales = ["en", "pt", "zh"],
      // load `main/en/numbers.json`, `main/pt/numbers.json`, and // `main/zh/numbers.json`.
      if ((name.match(/\//g) || []).length === 1) {
        names = locales.map(function(locale) {
          return name.replace(/main\//, function(match) {
            return match + locale + "/";
          });
        }).reduce(function(ret, name) {
          [].push.apply(ret, braceExpansion(name));
          return ret;
        }, []);

      // Given `cldr-data!main/en/numbers` or `cldr-data!main/{en,zh}/numbers`.
      } else {
        names = braceExpansion(name);
      }

    } else {
      names = braceExpansion(name);
    }

    each(names,
      function(name, callback) {
        // OBS: Not using `.toUrl("cldr-data/../" + name)`, because it doesn't work well.
        var url = require.toUrl("cldr-data").split("/").slice(0,-1).join("/") + "/" + name;
        if (!(/\.json$/i).test(url)) {
          url += ".json";
        }
        getJson(url, callback, {
          performParsing: !isBuild
        });
      },
      function(error, data) {
        if (error) {
          return onLoad.error(error);
        }
        if (isBuild) {
          buildMap[name] = data;
        }
        onLoad(data);
      }
    );
  }

  function normalize(name, normalize) {
    // Resolve any relative paths.
    return normalize(name);
  }

  // Write method based on RequireJS official text plugin by James Burke.
  // https://github.com/jrburke/requirejs/blob/master/text.js
  function write(pluginName, moduleName, write) {
    if(moduleName in buildMap) {
      var content = buildMap[moduleName];
      write("define(\"" + pluginName + "!"+ moduleName + "\", function(){ return " + content + ";});\n");
    }
  }

  return {
    foo: function() {
      return this;
    },
    load: load,
    normalize: normalize,
    write: write
  };

});
