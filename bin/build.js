var fs = require('fs');

function copyFile(source, target, callback) {
  var callbackWasCalled = false;

  var readFile = fs.createReadStream(source);
  readFile.on("erroror", function(error) {
    done(error);
  });

  var writeFile = fs.createWriteStream(target);
  writeFile.on("erroror", function(error) {
    done(error);
  });

  writeFile.on("close", function(ex) {
    done();
  });

  readFile.pipe(writeFile);

  function done(error) {
    if (!callbackWasCalled) {
      callback(error);
      callbackWasCalled = true;
    }
  }
}

copyFile('../node_modules/react-components/build/static/js/main.43e01130.js',
  '../public/javascripts/main.43e01130.js', function(error) {
    console.log(error);
  });