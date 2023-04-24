package com.jixialunbi.controllers;

import cn.hutool.crypto.digest.DigestUtil;
import com.jixialunbi.common.R;
import com.jixialunbi.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import static com.jixialunbi.common.utils.Common.getJarFilePath;

@Controller
public class UploadController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);
    private static final String NULL_FILE = "";

    @Autowired
    private FileService fileService;

    @PostMapping("/api/v1/files/upload")
    @ResponseBody
    public R singleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            var nginxPath = getJarFilePath() + "/static/images/";
            var fileName = DigestUtil.md5Hex(file.getOriginalFilename()) + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            fileService.saveFile(file.getBytes(), nginxPath, fileName);
            return R.ok().data("/static/images/" + fileName);
        } catch (Exception e) {
            return R.error().data(e);
        }
    }

    @PostMapping("/uploadFiles")
    @ResponseBody
    public String multiFileUpload(@RequestParam("file") MultipartFile[] files) {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("fileName = {}", files[0].getOriginalFilename());
        }
        try {

            for (int i = 0; i < files.length; i++) {
                //check file
                if (NULL_FILE.equals(files[i].getOriginalFilename())) {
                    continue;
                }
                var nginxPath = ClassUtils.getDefaultClassLoader().getResource("static").getPath();
                fileService.saveFile(files[i].getBytes(), nginxPath, files[i].getOriginalFilename());
            }
        } catch (Exception e) {
            return "upload failure";
        }
        return "upload success";
    }

}