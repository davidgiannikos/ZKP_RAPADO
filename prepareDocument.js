// Imports
const easaForm1 = require('./easeForm1.json');
const testJSON = require('./test.json');



// ============================
// Function: Prepare EASA Form1 json for ZoKrates input
// ============================

function prepEASA(easa, maxDocumentSize) {

    // Load EASA Form into buffer and store as hexadecimal string
    var easaHex = Buffer.from(JSON.stringify(easa)).toString('hex');

    // TargetLength=1600 hexadecimal bits --> equals 800 Bytes
    var easaHexPadded = easaHex.padStart(maxDocumentSize*4, '0');   
    
    var easaBinPadded = BigInt("0x" + easaHexPadded).toString(2).padStart(maxDocumentSize*8, '0');
    
    // Initialize array with 8bit integers
    let arrayUint8 = [];
    
    for (let i = 0; i < easaBinPadded.length; i+=8) {

        let chunk8Bit = easaBinPadded.slice(i, i+8);
        let chunkInt = parseInt(chunk8Bit, 2);     // binary to integer for 8 Bits
        arrayUint8.push(chunkInt);

    };

    return arrayUint8;
}


// ============================
// Function: Produce correct input format for witness compuation in ZoKrates
// ============================

function documentZokratesInput(EASAinBytes, maxDocumentSize) {

    const easaArray = prepEASA(EASAinBytes, maxDocumentSize);

    // Formating the EASA Form1 for witness compuation in ZoKrates
    const zokWitnessInput = easaArray.join(' ');

    return zokWitnessInput

}

module.exports = { documentZokratesInput };
