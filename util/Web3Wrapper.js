import * as _ from 'lodash'
import Web3 from 'web3'

class Web3Wrapper {
  /**
   * Constructor Web3 wrapper.
   * @param web3Provider web3 instance
   */
  constructor(web3Provider) {
    this._web3 = new Web3(web3Provider)
  }

  isAddress = address => this._web3.isAddress(address)

  getAccount = index => this._web3.eth.accounts[index]

  getProvider = () => this._web3.currentProvider

  getCoinbase = () => this._web3.eth.coinbase

  doesContractExistAtAddressAsync = async (address) => {
    const code = await this._web3.eth.getCode(address)
    // Regex matches 0x0, 0x00, 0x in order to accommodate poorly implemented clients
    const codeIsEmpty = /^0x0{0,40}$/i.test(code)

    return !codeIsEmpty
  }

  _getNetworkIdIfExistsAsync = async () => {
    if (!_.isUndefined(this.networkIdIfExists)) {
      return this.networkIdIfExists
    }

    try {
      const networkId = await this._getNetworkAsync()

      this.networkIdIfExists = Number(networkId)
      return this.networkIdIfExists
    } catch (err) {
      return undefined
    }
  }

  _getNetworkAsync = async () => {
    const networkId = await this._web3.version.network

    return networkId
  }

  getBalanceInWeiAsync = owner => {

    if (_.isUndefined(owner)) {
      owner = this._web3.eth.accounts[0]
    }

    let balanceInWei = this._web3.eth.getBalance(owner)

    return balanceInWei.toString()
  }
}

export default Web3Wrapper
