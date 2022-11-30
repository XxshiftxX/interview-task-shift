import { model, Schema, Types } from "mongoose"
import { IUser } from "src/domain/user/user.entity"

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  likability: { type: Number, required: true, default: 0 },
  battery: { type: Number, required: true, default: 100 },
  badges: { type: [Types.ObjectId], required: true, default: [] },
})

userSchema.virtual("getLikeLevel").get(function (): number {
  const { likability } = this

  if (likability >= 1500) return 5
  if (likability >= 700) return 4
  if (likability >= 200) return 3
  if (likability >= 30) return 2
  if (likability >= -5) return 1

  return 0
})

export const User = model("users", userSchema)
