import { HttpException } from '@nestjs/common';
import { check } from 'prettier';

export default class HTTP_EXCEPTION {
  static REGISTERED = new HttpException('该账号已经被注册！', 400000);
  static ACCOUNT_OR_PASSWORD = new HttpException('账号或者密码错误！', 400000);
  static USER_NOT_ACTIVED = new HttpException('当前用户还没有激活！', 400000);
  static CAPTCHA_ERROR = new HttpException('验证码输入有误！请点击图片重新获取验证码！', 400001);
}

export const checkCaptcha = (req, captcha) => {
  if (req.session.captcha !== captcha) {
    throw HTTP_EXCEPTION.CAPTCHA_ERROR;
  }
  req.session.captcha = '';
};
