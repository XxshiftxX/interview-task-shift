import { ReactionRepository } from "src/repository/reaction/reaction.repository"
import { UserRepository } from "src/repository/user/user.repository"
import { BusinessError } from "src/utils/business-error"

export class ConversationApplication {
  private readonly userRepository = new UserRepository()
  private readonly reactionRepository = new ReactionRepository()

  public async converse(userId: string, content: string) {
    const user = await this.userRepository.findUser(userId)
    if (!user) return new BusinessError("user-not-found")

    const reaction = await this.reactionRepository.findReactionByKeyword(content)
    console.log(reaction)
    if (!reaction) return new BusinessError("reaction-not-found")

    user.likability += reaction.reward

    await this.userRepository.saveUser(user)

    return { user, reaction }
  }
}
