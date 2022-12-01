export type Empty = Record<string, any>

export type Replace<T, R> = Omit<T, keyof R> & R
