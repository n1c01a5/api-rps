/* global describe, it, before */
import RPSWrapper from '../contract_wrapper/RPS_wrapper'
import Web3 from 'web3'
import contract from 'truffle-contract'
import web3Provider from '../util/web3Provider'
import Web3Wrapper from '../util/Web3Wrapper'

test('RPS', async () => {
  let provider = await web3Provider()

  let Web3WrapperInstance = await new Web3Wrapper(provider)

  let RPSContract = new RPSWrapper(Web3WrapperInstance)

  let balance1 = await Web3WrapperInstance.getBalanceInWeiAsync()

  console.log('balance1', balance1)

  let balance10 = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))

  console.log('balance10', balance10)

  let t = await RPSContract.deploy()

  console.log('t',t)

  let p = await RPSContract.play()

  console.log('p',p)


});
