var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');
    
exports.executeMeetsTest = () => {
    // Instantiate a Mocha instance.
    var mocha = new Mocha();

    var testDir = __dirname + path.sep + 'test'  + path.sep ;

    // Add each .js file to the mocha instance
    fs.readdirSync(testDir).filter(function(file) {
        // Only keep the .js files
        return path.extname(file)=== '.js';

    }).forEach(function(file) {
        mocha.addFile(
            path.join(testDir, file)
        );
    });

    // Run the tests.
    mocha.run(function(failures) {
    process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
    });
}
