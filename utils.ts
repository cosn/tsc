type Keys<T> = keyof T
type DistributiveKeys<T> = T extends unknown ? Keys<T> : never

type Pick_<T, K> = Pick<T, Extract<keyof T, K>>
export type DistributivePick<
  T,
  K extends DistributiveKeys<T>,
> = T extends unknown
  ? keyof Pick_<T, K> extends never
    ? never
    : { [P in keyof Pick_<T, K>]: Pick_<T, K>[P] }
  : never

type Omit_<T, K> = Omit<T, Extract<keyof T, K>>
export type DistributiveOmit<
  T,
  K extends DistributiveKeys<T>,
> = T extends unknown
  ? keyof Omit_<T, K> extends never
    ? never
    : { [P in keyof Omit_<T, K>]: Omit_<T, K>[P] }
  : never
