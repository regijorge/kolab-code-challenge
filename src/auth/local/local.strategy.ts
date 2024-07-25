import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service' 
import { User } from '../../user/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    })
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password)
    console.log({user})
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }
}