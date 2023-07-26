import { UniqueId } from '@/infra/crypto'

describe('UniqueId', () => {
  it('should return correct uuid', () => {
    const sut = new UniqueId(new Date(2023, 9, 3, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20231003101010')
  })

  it('should return correct uuid', () => {
    const sut = new UniqueId(new Date(2018, 2, 10, 18, 1, 0))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20180310180100')
  })
})
