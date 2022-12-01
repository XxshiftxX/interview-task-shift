import { BadgeDocument, BadgeVirtuals } from "src/domain/badge/badge.entity"
import { User, UserDocument } from "src/domain/user/user.entity"
import { BusinessError } from "src/utils/business-error"
import { Replace } from "src/utils/util-types"

export class BadgeApplication {
  public async getUserBadges(userId: string) {
    const user = await User.findOne({ id: userId }).populate<{
      badges: Replace<UserDocument["badges"][number], { badge: BadgeDocument & BadgeVirtuals }>[]
    }>("badges.badge")
    if (!user) return new BusinessError("user-not-found")

    return user.badges.map((badge) => badge.badge)
  }
}
