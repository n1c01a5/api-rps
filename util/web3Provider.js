import * as _ from 'lodash'
import Web3 from 'web3'


let web3Provider = async () => {
  // Fallback to localhost if no web3 injection.
  const provider = await new Web3.providers.HttpProvider('http://localhost:8545')

  const web3Provider = new Web3(provider)

  console.log('No web3 instance injected, using Local web3.')

  return web3Provider
}

export default web3Provider
