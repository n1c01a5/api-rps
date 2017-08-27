import * as _ from 'lodash'
import contract from 'truffle-contract'
import {provider} from '../util/web3Instance'
import RPS from '../artifact/RPS.json'
import config from '../config'

/**
 * Contract wrapper
 */
class ContractWrapper {
  /**
   * Constructor
   * @param web3 instance
   */
  constructor(web3Instance) {
    this._web3Wrapper = web3Instance
  }

  /**
   * Instantiate contract.
   * @param   artifact
   * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
   * @return  The owner's ERC20 token balance in base units.
   */
  _instantiateContractIfExistsAsync = async (artifact, address) => {
    const c = await contract(artifact)

    const providerObj = this._web3Wrapper.getCurrentProvider()

    c.setProvider(providerObj)

    const networkIdIfExists = await this._web3Wrapper.getNetworkIdIfExistsAsync()
    const artifactNetworkConfigs = _.isUndefined(networkIdIfExists) ?
                                   undefined :
                                   artifact.networks[networkIdIfExists]
    let contractAddress

    if (!_.isUndefined(address)) {
      contractAddress = address
    } else if (!_.isUndefined(artifactNetworkConfigs)) {
      contractAddress = artifactNetworkConfigs.address
    }

    if (!_.isUndefined(contractAddress)) {
      const doesContractExist = await this._web3Wrapper.doesContractExistAtAddressAsync(contractAddress)

      if (!doesContractExist) {
        throw new Error('ContractDoesNotExist')
      }
    }

    try {
      const contractInstance = _.isUndefined(address)
                              ? await c.deployed()
                              : await c.at(address)

      return contractInstance;
    } catch (err) {
      const errMsg = `${err}`

      if (_.includes(errMsg, 'not been deployed to detected network')) {
        throw new Error('ContractDoesNotExist')
      } else {
        throw new Error('UnhandledError')
      }
    }
  }

  /**
   * Deploy contract.
   * @param   account
   * @param   value
   * @param   json artifact of the contract
   * @param   rest arguments
   * @return  address | err The owner's of the contract
   */
  _deployContractAsync = async (account, value, artifact, ...args) => {
    if (_.isUndefined(account)) {
      account = this._web3Wrapper.eth.accounts[0]
    }
    const MyContract = contract({
      abi: artifact.abi,
      unlinked_binary: artifact.unlinked_binary,
    })

    const provider = await this._web3Wrapper.currentProvider

    MyContract.setProvider(provider)

    try {
      const contractDeployed = await MyContract.new(
        ...args,
        {
          from: account,
          value: value,
          gas: config.GAS,
        }
      )
      return contractDeployed.address
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default ContractWrapper;
