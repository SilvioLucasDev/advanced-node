export interface TokenGenerator {
  generateToken: (param: TokenGenerator.Params) => Promise<void>
}

export namespace TokenGenerator {
  export type Params = {
    key: string
  }
}
