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
      value = 100000,
      c1Hash = config.C1_HASH_DEFAULT,
      addressP2 = this._web3Wrapper.getAccount(1)
    ) => {
    const addressContractDeployed = await this._deployContractAsync(
      account,
      value,
      RPS,
      c1Hash,
      addressP2,
    )

    return addressContractDeployed
  }

  /**
   * To be called by j2 and provided stake.
   * @param _c2 The move submitted by j2.
   * @param value stake.
   */
  play = async (c) => {
    //const RPSinstance = await this._instantiateContractIfExistsAsync(RPS,address)





    return d
  }

}

export default RPSWrapper
