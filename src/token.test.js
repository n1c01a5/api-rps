/* global describe, it, before */
import RPSWrapper from '../contract_wrapper/RPS_wrapper'
import Web3 from 'web3'
import contract from 'truffle-contract'
import web3Provider from '../util/web3Provider'
import Web3Wrapper from '../util/Web3Wrapper'

test('RPS', async () => {
  let provider = await web3Provider()

  let Web3WrapperInstance = await new Web3Wrapper(provider)

  console.log(await Web3WrapperInstance.getAccount(0))

  let RPSContract = new RPSWrapper(Web3WrapperInstance)

  // let addressRPSContract = await RPSContract.deploy()
  let t = await RPSContract.deploy()

  let balance1 = await Web3WrapperInstance.getBalanceInWeiAsync()

  console.log('balance1', balance1)

  let balance10 = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))

  console.log('balance10', balance10)

  console.log(t)

  let balance11 = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))

  console.log('balance11', balance11)

  let balance2 = await Web3WrapperInstance.getBalanceInWeiAsync()

  console.log('balance2', balance2)


  //
  //
  //
  // console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())
  //
  // console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())
  // console.log(tokenWeb3.getWeb3Wrapper().getBalanceInWeiAsync())

  // console.log(test1.getBalanceInWeiAsync())
  // console.log(test1.getCoinbase())
  // console.log(test1.getWeb3Wrapper)
});
