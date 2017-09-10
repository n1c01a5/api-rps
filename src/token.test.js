import RPSWrapper from '../contract_wrapper/RPS_wrapper'
import Web3 from 'web3'
import contract from 'truffle-contract'
import Web3Wrapper from '../util/Web3Wrapper'
import config from '../config'

let Web3WrapperInstance

beforeAll(async () => {
  // use testRPC
  const provider = await new Web3.providers.HttpProvider('http://localhost:8545')

  Web3WrapperInstance = await new Web3Wrapper(provider)

  return Web3WrapperInstance
})

describe('RPS', () => {

  let balanceAccount0Before
  let balanceAccount1Before
  let balanceAccount1After
  let balanceAccount0After

  test('get account 0 balance', async () => {
    balanceAccount0Before = await Web3WrapperInstance.getBalanceInWeiAsync()
    expect(typeof balanceAccount0Before).toBe('string')
  })

  test('get account 1 balance', async () => {
    balanceAccount1Before = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))
    expect(typeof balanceAccount1Before).toBe('string')
  })

  // deploy contract, play rock, solve
  test('play RPS', async () => {
    let RPSContractInstance = new RPSWrapper(Web3WrapperInstance)
    let RPSContractDeployed = await RPSContractInstance.deploy()
    expect(typeof RPSContractDeployed).toBe('object')

    let p2Play = await RPSContractInstance.play(2)
    expect(p2Play.tx).toBeDefined()

    let p1Solve = await RPSContractInstance.solve(1, 1)
    expect(p1Solve.tx).toBeDefined()
  })

  test('get account 0 balance', async () => {
    balanceAccount0After = await Web3WrapperInstance.getBalanceInWeiAsync()
    expect(typeof balanceAccount0After).toBe('string')

    // FIX IT
    expect(balanceAccount0After - balanceAccount0Before).toBeLessThan(0)
  })

  test('get account 1 balance', async () => {
    balanceAccount1After = await Web3WrapperInstance.getBalanceInWeiAsync(Web3WrapperInstance.getAccount(1))
    expect(typeof balanceAccount1After).toBe('string')

    expect(balanceAccount1After - balanceAccount1Before).toBeGreaterThan(0)
  })
})
