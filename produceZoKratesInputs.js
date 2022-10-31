// Imports
const easaForm1 = require('./easeForm1.json');
// const testJSON = require('./test.json');
const simulateCID = require('./simulateCID.js');
const prepareDocument = require('./prepareDocument.js')


// ============================
// Function: Produce inputs for witness compuation in ZoKrates
// ============================  

function zokratesInput(document, maxDocumentSize, privateKey, publicKey1, publicKey2) {

    const zokratesInputDocument = prepareDocument.documentZokratesInput(document, maxDocumentSize);

    const zokratesInputCID = simulateCID.cidZokratesInput(document, maxDocumentSize);

    const outputString = zokratesInputDocument + ' ' + privateKey + ' ' + zokratesInputCID + ' ' + publicKey1 + ' ' + publicKey2;

    return outputString;
}


console.log('zokrates compute-witness -a ', zokratesInput(easaForm1, 896, 123456789, 5406141598975088696144699008760408187583441857012693422636262514979414131332, 1877902466313726057948460290452275215682741354751472712487045846146965080374))