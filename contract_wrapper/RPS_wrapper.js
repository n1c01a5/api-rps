import * as _ from 'lodash'
import ContractWrapper from './contract_wrapper'
import RPS from '../artifact/RPS.json'
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
  constructor(web3Instance, address) {
    super(web3Instance)
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
      account = this._web3Wrapper.eth.accounts[0],
      value = 10000,
      c1Hash = config.C1_HASH_DEFAULT,
      addressP2 = this._web3Wrapper.eth.accounts[1]
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
}

export default RPSWrapper
