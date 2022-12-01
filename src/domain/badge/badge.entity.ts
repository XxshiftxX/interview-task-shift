import { model, Model, Schema } from "mongoose"
import { Empty } from "src/utils/empty"

export interface BadgeDocument extends Document {
  title: string
  requirements: string
}

export interface BadgeVirtuals {
  id: string
}

const badgeSchema = new Schema<BadgeDocument, Model<BadgeDocument>, Empty, Empty, BadgeVirtuals>(
  {
    title: { type: String, required: true },
    requirements: { type: String, required: true },
  },
  {
    virtuals: {
      id: {
        get: function (): string {
          return this._id
        },
      },
    },
  }
)

export const Badge = model("badges", badgeSchema)
