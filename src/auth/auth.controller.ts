import { Response, Request } from 'express';
import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwtAuth.guard';
import { LocalAuthGuard } from './local/localAuth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user1' },
        password: { type: 'string', example: 'pass123' }
      },
      required: ['username', 'password']
    }
  })
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req)
    const jwt = await this.authService.login(req.user)
    res.cookie('jwt', jwt.accessToken, { httpOnly: true })
    return jwt
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'user4' },
        password: { type: 'string', example: 'pass12345' },
        parentUserId: { type: 'string', example: 'ADD_USER_ID' }
      },
      required: ['username', 'password']
    }
  })
  async register(@Body() user: any) {
    return this.authService.register(user)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt')
    return { message: 'Logged out successfully' }
  }
}
