import { NestFactory } from '@nestjs/core'
import { AppModule } from '../../app.module'
import { UserService } from '../../user/user.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const userService = app.get(UserService)

  const users = [
    { username: 'user1', password: 'pass123', parentUserId: null },
    { username: 'user2', password: 'pass1234', parentUserId: null },
    { username: 'user3', password: 'pass12345', parentUserId: null }
  ]

  const createdUsers = []
  for (const user of users) {
    const createdUser = await userService.create(user)
    createdUsers.push(createdUser)
  }

  const reversedUsers = createdUsers.reverse()
  for (let i = 0; i < reversedUsers.length; i++) {
    const user = reversedUsers[i]
    const parentUser = reversedUsers[i + 1]
    if (parentUser) {
      await userService.update(user.id, { parentUserId: parentUser.id });
    }
  }

  await app.close()
}
bootstrap()