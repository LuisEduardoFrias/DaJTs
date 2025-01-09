
export type DbType = {
  objectStructure: {
    [key: string | number | symbol]: {
      prop: string,
      value?: string[]
    }[]
  },
  data: {
    [key: string | number | symbol]: {
      [key: string | number | symbol]: any
    }[]
  }
}