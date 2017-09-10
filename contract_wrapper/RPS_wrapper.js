import * as _ from 'lodash'
import ContractWrapper from './contract_wrapper'
import RPS from '../artifact/RPS.json'
import contract from 'truffle-contract'
import config from '../config'

/**
 * RPS API
 */
class RPSWrapper extends ContractWrapper {
  /**
   * Constructor RPS.
   * @param web3 instance
   * @param address of the contract (optionnal)
   */
  constructor(web3Provider, address) {
    super(web3Provider)
    if (!_.isUndefined(address)) {
      this.address = address
    }
    this.stake = 0
    this.contractInstance = null
  }

  /**
   * To be called by j2 and provided stake.
   * @param   account (default: accounts[0])
   * @param   value (default: 10000)
   * @param   hash commitment from player 1 (default: config.C1_HASH_DEFAULT)
   * @param   address player 2 (default: accounts[1])
   * @return  address | err The address of the contract or error deploy
   */
  deploy = async (
      account = this._web3Wrapper.getAccount(0),
      value = config.VALUE,
      c1Hash = config.C1_HASH_DEFAULT,
      addressP2 = this._web3Wrapper.getAccount(1)
    ) => {

    this.stake = value

    const addressContractDeployed = await this._deployContractAsync(
      account,
      value,
      RPS,
      c1Hash,
      addressP2
    )

    this.contractInstance = addressContractDeployed

    return this.contractInstance
  }

  play = async (
    moveC2,
    account = this._web3Wrapper.getAccount(1)
  ) => {
    try {
      const playTx = await this.contractInstance.play(
        moveC2,
        {
          from: account,
          value: this.stake,
          gas: config.GAS
        }
      )

      return playTx
    } catch (e) {
      throw new Error(e)
    }
  }

  solve = async (
    moveC1,
    salt,
    account = this._web3Wrapper.getAccount(0),
  ) => {
    try {
      const solve = await this.contractInstance.solve(
        moveC1,
        salt,
        {
          from: account,
          gas: config.GAS
        }
      )

      this.stake = 0

      return solve
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default RPSWrapper
