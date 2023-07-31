import { Controller } from '@/application/controllers'
import { type DbTransaction } from '@/application/contracts'
import { DbTransactionController } from '@/application/decorators'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('DbTransactionController', () => {
  let decoratee: MockProxy<Controller>
  let db: MockProxy<DbTransaction>
  let sut: DbTransactionController

  beforeAll(() => {
    decoratee = mock()
    db = mock()
    decoratee.perform.mockResolvedValue({
      statusCode: 204,
      data: null
    })
  })

  beforeEach(() => {
    sut = new DbTransactionController(decoratee, db)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should open transaction', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('should execute decoratee', async () => {
    await sut.perform({ any: 'any' })

    expect(decoratee.perform).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  it('should call commit and close transaction on success', async () => {
    await sut.perform({ any: 'any' })

    expect(db.rollback).not.toHaveBeenCalled()
    expect(db.commit).toHaveBeenCalledWith()
    expect(db.commit).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('should call rollback and close transaction on failure', async () => {
    decoratee.perform.mockRejectedValueOnce(new Error('decoratee_error'))

    sut.perform({ any: 'any' }).catch(() => {
      expect(db.commit).not.toHaveBeenCalled()
      expect(db.rollback).toHaveBeenCalledWith()
      expect(db.rollback).toHaveBeenCalledTimes(1)
      expect(db.closeTransaction).toHaveBeenCalledWith()
      expect(db.closeTransaction).toHaveBeenCalledTimes(1)
    })
  })

  it('should return same result as decoratee on success', async () => {
    const httpResponse = await sut.perform({ any: 'any' })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })

  it('should rethrow if decoratee throws', async () => {
    const error = new Error('decoratee_error')
    decoratee.perform.mockRejectedValueOnce(error)

    const promise = sut.perform({ any: 'any' })

    await expect(promise).rejects.toThrow(error)
  })
})
