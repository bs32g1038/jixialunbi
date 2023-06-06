package com.jixialunbi.common.utils;

import org.springframework.boot.system.ApplicationHome;

import java.io.File;

public class Common {
    public static String getJarFilePath() {
        ApplicationHome home = new ApplicationHome(Common.class);
        File jarFile = home.getSource();
        return jarFile.getParentFile().toString();
    }
}
