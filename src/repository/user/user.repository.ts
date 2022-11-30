import { IUser } from "src/domain/user/user.entity"
import { User } from "./user.datamodel"

export class UserRepository {
  public async findUser(id: string): Promise<IUser | null> {
    return User.findOne({ id })
  }

  public async createUser(id: string, username: string): Promise<IUser> {
    return User.create({ id, username })
  }

  public async saveUser(user: IUser) {
    return User.update({ id: user.id }, user)
  }
}
