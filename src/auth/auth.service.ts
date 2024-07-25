import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { JwtPayload } from './jwt/jwtPayload.interface'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username)
    if (user && user.password == password) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: any) {
    
    const payload: JwtPayload = { username: user.username, sub: user.id }
    const accessToken = this.jwtService.sign(payload)
    return { ...user, accessToken }
  }

  async register(user: User): Promise<User> {
    return this.userService.create(user)
  }
}
