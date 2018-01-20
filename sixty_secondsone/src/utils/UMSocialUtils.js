/**
 * Created by aj on 2017/10/12.
 */
//import UMSocialInstance from 'react-native-umsocial';

export  default  class UMSocialUtils{
    /**
     * 初始化分享参数
     * @param appkey
     */
    static init(){
        // 第二个参数决定在分享界面的排序1_、2_、3_为前缀
       /* UMSocialInstance.initShare("59ec974af43e4842bc00024c",
            {
                "1_weixin": {
                    appKey: "wx99a63c20cce7c723",
                    appSecret: "66de16631ce1fcc54644290f752343ca",
                    redirectURL: "",
                },
                "2_qq": {
                    appKey: "1106494358",
                    appSecret: "2wE4yosnGMv6oFwI",
                    redirectURL: "",
                },
                "3_sina": {
                    appKey: "1973901989",
                    appSecret: "e1d4e84470534a148bba6a5f5a44dc7b",
                    redirectURL: "",
                },
            },
            true);*/
    };

    static login(platform:string){
        //return UMSocialInstance.login(platform);
    }

    static checkInstall(platform){
        return UMSocialInstance.checkInstall(platform);
    }
}

