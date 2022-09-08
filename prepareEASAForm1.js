// Imports
const easaForm1 = require('./easeForm1_filled.json');


// ============================
// Function: Prepare EASA Form1 json for ZoKrates input
// ============================

function prepEASA(easa) {

    // load EASA Form into buffer and store as hexadecimal string
    var easaHex = Buffer.from(JSON.stringify(easa)).toString('hex');
    var easaHexPadded = easaHex.padStart(1600, '0');    // targetLength=1600 hexadecimal bits equal 800 Bytes
    
    
    var easaBinPadded = BigInt("0x" + easaHexPadded).toString(2).padStart(6400, '0');

    // initialize array with 8bit integers
    let arrayUint8 = [];
    
    for (let i = 0; i < easaBinPadded.length; i+=8) {

        let chunk8Bit = easaBinPadded.slice(i, i+8);
        let chunkInt = parseInt(chunk8Bit, 2);     // binary to integer for 32Bits
        arrayUint8.push(chunkInt);

    };

    return arrayUint8;

}

console.log('easa buffer binary', prepEASA(easaForm1));



// Create input for computing ZoKrates witness
const easaArray = prepEASA(easaForm1);
const zokWitnessInput = easaArray.join(' ');
console.log('zokWitnessInput', zokWitnessInput);