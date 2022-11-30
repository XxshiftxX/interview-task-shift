import { model, Model, Schema, Types } from "mongoose"
import { Empty } from "src/utils/empty"

export interface UserDocument extends Document {
  id: string
  username: string
  likability: number
  battery: number
  badges: string[]
  verifiedAt?: Date
}

export interface UserVirtuals {
  likeLevel: number
}

const userSchema = new Schema<UserDocument, Model<UserDocument>, Empty, Empty, UserVirtuals>(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    likability: { type: Number, required: true, default: 0 },
    battery: { type: Number, required: true, default: 100 },
    badges: { type: [Types.ObjectId], required: true, default: [] },
  },
  {
    virtuals: {
      likeLevel: {
        get: function (): number {
          const { likability } = this

          if (likability >= 1500) return 5
          if (likability >= 700) return 4
          if (likability >= 200) return 3
          if (likability >= 30) return 2
          if (likability >= -5) return 1

          return 0
        },
      },
    },
  }
)

export const User = model("users", userSchema)
