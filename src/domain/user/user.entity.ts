export interface IUser {
  id: string
  username: string
  likability: number
  battery: number
  badges: string[]
  verifiedAt?: Date
  likeLevel: number
}
