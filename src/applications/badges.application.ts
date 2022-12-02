import { Badge, BadgeDocument, BadgeVirtuals } from "src/domain/badge/badge.entity"
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

  public async getBadge(badgeId: string) {
    const badge = await Badge.findOne({ _id: badgeId })
    if (!badge) return new BusinessError("badge-not-found")

    return badge
  }

  public async getBadgeRanking() {
    type Ranking = { id: string; username: string; totalBadgeCount: number; achievedAt: Date }
    const rankings = await User.aggregate<Ranking>([
      {
        $project: {
          id: 1,
          username: 1,
          totalBadgeCount: { $size: "$badges" },
          achievedAt: { $max: "$badges.createdAt" },
        },
      },
      {
        $sort: { totalBadgeCount: -1, achievedAt: 1 },
      },
      {
        $limit: 20,
      },
    ])

    return rankings
  }
}
