export interface IUser {
  id: string
  username: string
  likability: number
  battery: number
  badges: string[]
  verifiedAt?: Date
  likeLevel: number
}

export function getLikeLevel(this: IUser): number {
  const { likability } = this

  if (likability >= 1500) return 5
  if (likability >= 700) return 4
  if (likability >= 200) return 3
  if (likability >= 30) return 2
  if (likability >= -5) return 1

  return 0
}
