import { IReaction } from "src/domain/reaction/reaction.entity"

export class ReactionRepository {
  private readonly reactions: IReaction[] = [
    { id: "1", keyword: "안녕", reaction: "안녕하세요 (username)님!", reward: 1 },
    { id: "2", keyword: "안녕", reaction: "안녕하세요!", reward: 1 },
    { id: "3", keyword: "좋아해", reaction: "저도 (username)님이 좋아요!", reward: 3 },
    { id: "4", keyword: "저리가", reaction: "...그런 말 하시면 슬퍼요...", reward: -2 },
  ]

  public async findReactionByKeyword(keyword: string): Promise<IReaction | null> {
    const results = this.reactions.filter((reaction) => reaction.keyword === keyword)
    if (results.length === 0) return null

    const randomIndex = Math.floor(Math.random() * results.length)

    return results[randomIndex]
  }
}
