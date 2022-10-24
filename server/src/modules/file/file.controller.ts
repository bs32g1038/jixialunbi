import { Controller, Get, Post, UploadedFile, UseInterceptors, Request, Response } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Canvas } from 'skia-canvas/lib';

// prettier-ignore
const aCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function getColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (r == 255 && g == 255 && b == 255) {
    r = 0;
    g = 0;
    b = 0;
  }
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

@Controller('/api')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/files/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    return await this.fileService.uploadFile(file);
  }

  @Get('/files/captcha')
  async captcha(@Request() req, @Response() res) {
    const canvas = new Canvas(120, 40);
    canvas.gpu = false;
    const ctx = canvas.getContext('2d');
    let code = '';
    for (var i = 0; i < 4; i++) {
      var x = 20 + i * 20;
      var y = 20 + Math.random() * 10;
      var index = Math.floor(Math.random() * aCode.length); //获取到一个随机的索引值
      const txt = aCode[index].toString(); //获取到数组里面的随机的内容
      code += txt;
      ctx.font = 'bold 20px 微软雅黑'; //设置文字样式
      ctx.fillStyle = getColor();
      ctx.fillText(txt, x, y);
    }
    req.session.captcha = code;
    for (var i = 0; i < 20; i++) {
      var x = Math.random() * 120;
      var y = Math.random() * 40;
      ctx.strokeStyle = getColor();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y + 1);
      ctx.stroke();
    }
    res.type('png');
    return res.send(await canvas.toBuffer('png'));
  }
}
