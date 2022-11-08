import React from "react";
import { Image } from 'antd';
import style from './index.module.scss';

export default function CImage(props) {
    const { src } = props;
    return <Image rootClassName={style.wrap} src={src} alt="" onLoad={(res: any) => {
        const oImg = new window.Image();
        oImg.src = res.target.src;
        if (oImg.height / oImg.width >= 1.2) {
            res.currentTarget.style.height = 'auto'
        }
    }} />
}