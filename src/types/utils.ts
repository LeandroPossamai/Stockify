export type Timer = ReturnType<typeof setTimeout>
export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type LiteralUnion<T extends U, U extends Primitive> = T | (U & { _?: never })
export type LiteralIntersection<T extends U, U extends Primitive> = T & (U & { _?: never })
