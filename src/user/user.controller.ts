import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { JwtAuthGuard } from '../auth/jwt/jwtAuth.guard'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const { password, ...userData } = user
    return userData
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: 'pass1234' }
      },
      required: ['password']
    }
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<void> {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    await this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.userService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    await this.userService.remove(id)
  }

  @Get(':id/tree')
  @ApiOperation({ summary: 'Get users tree' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async findUserTree() {
    return await this.userService.findUserTree()
  }
}
