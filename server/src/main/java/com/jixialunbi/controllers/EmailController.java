package com.jixialunbi.controllers;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.mail.MailAccount;
import cn.hutool.extra.mail.MailUtil;
import com.jixialunbi.common.R;
import com.jixialunbi.repository.UserRepository;
import com.jixialunbi.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1")
public class EmailController {

    String html = """
              <table
              border="0"
              role="presentation"
              width="100%"
              style="vertical-align: top"
            >
              <tbody>
                <tr>
                  <td
                    align="left"
                    dir="ltr"
                    style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word"
                  >
                    <div
                      style="
                        font-family: BinancePlex, Arial, PingFangSC-Regular,
                          'Microsoft YaHei', sans-serif, serif, EmojiFont;
                        font-size: 14px;
                        line-height: 20px;
                        text-align: left;
                        color: rgb(0, 0, 0);
                      "
                    >
                      您的验证码：
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    align="left"
                    dir="ltr"
                    style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word"
                  >
                    <div
                      style="
                        font-family: BinancePlex, Arial, PingFangSC-Regular,
                          'Microsoft YaHei', sans-serif, serif, EmojiFont;
                        font-size: 20px;
                        line-height: 30px;
                        text-align: left;
                        color: rgb(240, 185, 11);
                      "
                    >
                      <b>{}</b>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    align="left"
                    dir="ltr"
                    style="font-size: 0px; padding: 5px 5px 5px 5px; word-break: break-word"
                  >
                    <div
                      style="
                        font-family: BinancePlex, Arial, PingFangSC-Regular,
                          'Microsoft YaHei', sans-serif, serif, EmojiFont;
                        font-size: 14px;
                        line-height: 20px;
                        text-align: left;
                        color: rgb(0, 0, 0);
                      "
                    >
                      <div>验证码的有效期为30分钟。切勿向他人透露验证码。</div>
                      <div><br aria-hidden="true" /></div>
                      <i>&nbsp;这是一条自动发送的消息， </i><i>请勿回复 </i><i>。 </i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>""";

    @Autowired
    HttpSession session;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Value("${EMAIL_PASS}")
    private String EMAIL_PASS;

    final String EMAIL_ACTIVE_CODE_KEY = "email_active_code_key";

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/send-email")
    public R sendEmail(Principal principal) {
        var user = userService.getByAccount(principal.getName());
        String code = RandomUtil.randomString(4);
        session.setAttribute(EMAIL_ACTIVE_CODE_KEY, code);
        MailAccount account = new MailAccount();
        account.setHost("smtp.163.com");
        account.setPort(465);
        account.setAuth(true);
        account.setSslEnable(true);
        account.setFrom("jixialunbi <jixialunbi@163.com>");
        account.setUser("jixialunbi");
        account.setPass(this.EMAIL_PASS);
        MailUtil.send(account, user.getEmail(), "www.jixialunbi.com - 邮箱激活", StrUtil.format(this.html, code), true);
        return R.ok().data(true);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/active-email/{activeCode}")
    public R activeEmail(@PathVariable String activeCode, Principal principal) {
        String code = (String) session.getAttribute(EMAIL_ACTIVE_CODE_KEY);
        if (activeCode.equals(code)) {
            var user = userService.getByAccount(principal.getName());
            user.setActived(true);
            userRepository.save(user);
            return R.ok().data(true);
        }
        return R.ok().data(false);
    }
}
