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
  return this.likability
})

export const User = model("users", userSchema)
