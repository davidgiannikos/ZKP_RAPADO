const { initialize } = require('zokrates-js');
const fs = require("fs");
const path = require("path");


initialize().then((zokratesProvider) => {

    const source = fs.readFileSync("./docOwnership_sigVerifier.zok").toString();

    const fileSystemResolver = (from, to) => {
        const location = path.resolve(path.dirname(path.resolve(from)), to);
        const source = fs.readFileSync(location).toString();
        return { source, location };
      };
  

    const options = {
        location: "./docOwnership_sigVerifier.zok", // location of the root module
        resolveCallback: fileSystemResolver("./docOwnership_sigVerifier.zok", "./keypairVerifierEddsa.zok")
    };      

    console.log("options", options);

    // compilation
    const artifacts = zokratesProvider.compile(source, options);
});