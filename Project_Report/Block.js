// Blockchain Technologies Final Demo
/**
 * This is the beginning of our final demstrateble
 * production of our blockchain technology final project. In this project
 * we focus on the use of blockchain and the need for a decentralized
 * database that implemented for the healthcare field.
 */

const SHA256 = require('crypto-js/sha256');

/**
 * Our Block class
 */
class Block {

    /**
     * Constructor for our individual block
     * 
     * @param index the index position of the block
     * @param timestamp the exact time that the block was created
     * @param files the theoretical healthcare personal files that would need to be stored
     * @param previousHash the previouse hash of the previous block so we can track and make suer there is no tampering
     */
    constructor(index, timestamp, files, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.files = files;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }
    
    /**
     * Hash creator for the individual blocks
     * 
     * @returns The the calculated hash
     */
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.files)).toString(); 
    }
}

/**
 * Class that will form out basic blockchain for this demonstration
 */
class Blockchain{

    /**
     * Constructs our array that has the genesis block
     */
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }


    /**
     * creation of the first block
     * @returns the original block
     */
    createGenesisBlock(){
        return new Block(0, "The timestamp", "No Info", "0");
    }



    /**
     * Getter for the most recent block
     * @returns the most recent block created
     */
    getRecentBlock(){
        return this.chain[this.chain.length-1];
    }


    /**
     * Adds blocks to the chain
     * @param newBlock the block to be added
     */
    addBlock(newBlock){
        newBlock.previousHash = this.getRecentBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }


    /**
     * Checks the blocks valididty (Smart contracts will be implemented later in the poroduction)
     * @returns true if they are valid and false if not
     */
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            } 
            if(currentBlock.previousHash != previousBlock.hash){
                return true;
            }
        }
        return true;
    }
}


let medField = new Blockchain();

medField.addBlock(new Block(1, "Current Time", { MedicalFiles: 10}));
console.log(JSON.stringify(medField, null, 4));

