import { Controller, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { uid } from 'uid';
import { AuthGuard } from '@nestjs/passport';
import { checkCaptcha } from 'src/common/http.exception';
import { sendEmail } from 'src/utils/email';
import { getEmailTemplate } from 'src/utils/emailTemplate.util';
import { AuthService } from '../../auth/auth.service';
import { UserService } from './users.service';
import { RequestUser } from 'src/decorators/request.decorator';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody, JoiParam } from 'src/decorators/joi.decorator';
import onlineCache from '../../caches/online.cache';
import Joi from 'src/joi';
import { PrismaClient, User } from '@prisma/client';
import { NOTIFICATION_TYPE } from 'src/common/constant';
import { UserSchema } from 'src/joi/schemas/comment.schema';

const prisma = new PrismaClient();
@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Post('/api/login')
  @UseGuards(AuthGuard('local'))
  async authLogin(@Request() req) {
    const result = await this.authService.login(req.user);
    return result;
  }

  @Post('/api/register')
  async register(@Request() req) {
    const { captcha, ...data } = req.body;
    checkCaptcha(req, captcha);
    const res = await this.userService.getUserByAccount(data?.account);
    if (res) {
      throw new HttpException('该账号已经被注册！', 400000);
    }
    const user = await this.userService.createUser({ ...data, username: data.account });
    await prisma.notification.create({
      data: {
        senderId: 0,
        receiverId: user.id,
        targetId: 0,
        type: NOTIFICATION_TYPE.huanying,
        title: "系统通知",
        content: "欢迎您，加入到积下论笔社区😀",
        read: false
      }
    });
    return await this.authService.login(user);
  }

  @Post('/api/users/send-email')
  @UseJwtAuthGuard()
  async email(@Request() req) {
    req.session.emailCode = uid(6);
    req.session.sendEmailCount = (req.session.sendEmailCount ?? 0) + 1;
    if (req.session.sendEmailCount > 3) {
      throw new HttpException('今天验证次数过多，请明天再尝试！', 401000);
    }
    await sendEmail({
      to: req.user.email,
      subject: '邮箱验证-获取验证码-积下论笔社区',
      html: getEmailTemplate({
        greeting: '欢迎您，加入积下论笔社区😀',
        description:
          '该邮件用于验证你在 积下论笔社区 中设置邮箱的正确性，请在页面填写验证码以完成验证，有效期24小时。验证码：' +
          req.session.emailCode,
      }),
    });
    return true;
  }

  @Post('/api/users/active-email')
  @UseJwtAuthGuard()
  async activeEmail(@Request() req) {
    if (req.session.emailCode === req.body.emailCode) {
      return await this.userService.updateUserById(req.user.id, {
        isActived: true,
      } as any);
    }
    return true;
  }

  @Get('/api/users/profile')
  @UseJwtAuthGuard()
  async getUserProfile(@RequestUser() user) {
    const result = await this.userService.getUser(user.id);
    return result;
  }

  @Get('/api/users/:id')
  async getUser(@JoiParam({ id: Joi.number().required() }) params: { id: number }) {
    const result = await this.userService.getUser(params.id);
    return result;
  }

  @Post('/api/users/:id')
  @UseJwtAuthGuard()
  async updateUserById(@JoiParam({ id: Joi.number().required() }) params: { id: number }, @JoiBody(UserSchema) body: User) {
    const result = await this.userService.updateUserById(params.id, body);
    return result;
  }

  @Get('/api/online-users')
  async onlineUsers() {
    return onlineCache.size;
  }
}
