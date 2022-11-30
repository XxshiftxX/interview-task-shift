import { Reaction } from "src/domain/reaction/reaction.entity"
import { User } from "src/domain/user/user.entity"
import { BusinessError } from "src/utils/business-error"

export class ConversationApplication {
  public async converse(userId: string, content: string) {
    const user = await User.findOne({ id: userId })
    if (!user) return new BusinessError("user-not-found")

    const reaction = await Reaction.findReactionByKeyword(content)
    if (!reaction) return new BusinessError("reaction-not-found")

    user.likability += reaction.reward
    user.save()

    return { user, reaction }
  }
}
