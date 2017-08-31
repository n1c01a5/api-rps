import RPSWrapper from '../contract_wrapper/RPS_wrapper'
import Web3 from 'web3'
import contract from 'truffle-contract'
import Web3Wrapper from '../util/Web3Wrapper'

let Web3WrapperInstance

beforeAll(async () => {
  // use testRPC
  const provider = await new Web3.providers.HttpProvider('http://localhost:8545')

  Web3WrapperInstance = await new Web3Wrapper(provider)

  return Web3WrapperInstance
})

describe('RPS', () => {

  let balanceAccount0
  let balanceAccount1

  test('get account 0 balance', async () => {
    balanceAccount0 = await Web3WrapperInstance.getBalanceInWeiAsync()
    expect(typeof balanceAccount0).toBe('string');
  })

  test('get account 1 balance', async () => {
    balanceAccount1 = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))
    expect(typeof balanceAccount1).toBe('string');
  })

  // deploy contract, play rock
  test('play RPS', async () => {
    let RPSContractInstance = new RPSWrapper(Web3WrapperInstance)
    let RPSContractDeployed = await RPSContractInstance.deploy()
    expect(typeof RPSContractDeployed).toBe('object')

    let p2Play = await RPSContractInstance.play(RPSContractDeployed)
    expect(p2Play.tx).toBeDefined()
  })
})
