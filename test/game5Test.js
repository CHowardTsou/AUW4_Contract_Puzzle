const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { Wallet } = require('ethers');
const { ethers, hardhatArguments, network } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    
    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    
    const num = parseInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");
    console.log(num);
    // good luck
    for(let i = 0; i < 1000; i++){
      const owner = await ethers.getSigner(i);
      const addr = await owner.getAddress();
      if(parseInt(addr) < num){
        //console.log(parseInt(addr));
          await game.connect(owner).win();
          break;
      }
    }
    // not a good solution, change hardhat account limit to 1000 

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
