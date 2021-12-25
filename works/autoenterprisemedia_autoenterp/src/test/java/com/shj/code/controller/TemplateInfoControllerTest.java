package com.shj.code.controller;

import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class TemplateInfoControllerTest {
    @Autowired
    TemplateInfoController controller;

    @Test
    public void savaPoster() {
//        StandardResult result = controller.savaPoster("{\"absolutelyUrl\":\"/data/resources/posterPSDKV/2021/05/07/36cbb66de43d4859a71b98037d230e8b.psd\",\"accountNumber\":\"CF775\",\"carModelName\":\"全车系\",\"categoryName\":\"\",\"coverUrl\":\"https://iit.axiwenhua.cn/gtb/files/posterPictureKV/2021/05/07/e96b396aace846259b9f61746a1f5430.jpg\",\"createData\":1620375271000,\"endTime\":\"2021-05-31\",\"fileName\":\"全车系-2020年3月促销kv-竖版\",\"height\":\"\",\"id\":391,\"isEdit\":\"是\",\"materialType\":2,\"pictureHeight\":\"1057\",\"pictureWidth\":\"750\",\"role\":2,\"sourceUrl\":\"https://iit.axiwenhua.cn/gtb/files/posterPSDKV/2021/05/07/36cbb66de43d4859a71b98037d230e8b.psd\",\"startTime\":\"2021-05-01\",\"templateJson\":\"{\\\"elements\\\":[{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"图层 1\\\",\\\"left\\\":0,\\\"right\\\":750,\\\"top\\\":0,\\\"bottom\\\":1057,\\\"height\\\":1057,\\\"width\\\":750,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/0.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"绿色字\\\",\\\"left\\\":81,\\\"right\\\":246,\\\"top\\\":159,\\\"bottom\\\":360,\\\"height\\\":201,\\\"width\\\":165,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/1.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"新一代性能中级车\\\",\\\"left\\\":200,\\\"right\\\":295,\\\"top\\\":469,\\\"bottom\\\":480,\\\"height\\\":11,\\\"width\\\":95,\\\"mask\\\":{},\\\"text\\\":{\\\"value\\\":\\\"新一代性能中级车\\\",\\\"font\\\":{\\\"name\\\":\\\"MHeiPRC-Heavy\\\",\\\"sizes\\\":[40.19196],\\\"colors\\\":[[75,73,72,255]],\\\"alignment\\\":[\\\"left\\\"]},\\\"left\\\":0,\\\"top\\\":0,\\\"right\\\":0,\\\"bottom\\\":0,\\\"transform\\\":{\\\"xx\\\":0.27180892,\\\"xy\\\":0,\\\"yx\\\":0,\\\"yy\\\":0.2716649,\\\"tx\\\":200.05025,\\\"ty\\\":478.79706}},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/2.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"福克斯\\\",\\\"left\\\":200,\\\"right\\\":245,\\\"top\\\":451,\\\"bottom\\\":466,\\\"height\\\":15,\\\"width\\\":45,\\\"mask\\\":{},\\\"text\\\":{\\\"value\\\":\\\"福克斯\\\",\\\"font\\\":{\\\"name\\\":\\\"MHeiPRC-Heavy\\\",\\\"sizes\\\":[40.19196],\\\"colors\\\":[[75,73,72,255]],\\\"alignment\\\":[\\\"left\\\"]},\\\"left\\\":0,\\\"top\\\":0,\\\"right\\\":0,\\\"bottom\\\":0,\\\"transform\\\":{\\\"xx\\\":0.35616395,\\\"xy\\\":0,\\\"yx\\\":0,\\\"yy\\\":0.3559752,\\\"tx\\\":200.24623,\\\"ty\\\":463.58624}},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/3.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"蒙迪欧\\\",\\\"left\\\":7,\\\"right\\\":141,\\\"top\\\":347,\\\"bottom\\\":400,\\\"height\\\":53,\\\"width\\\":134,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/4.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"翼虎60\\\",\\\"left\\\":66,\\\"right\\\":206,\\\"top\\\":331,\\\"bottom\\\":426,\\\"height\\\":95,\\\"width\\\":140,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/5.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"金牛座NEW\\\",\\\"left\\\":629,\\\"right\\\":744,\\\"top\\\":356,\\\"bottom\\\":420,\\\"height\\\":64,\\\"width\\\":115,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/6.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"福睿斯 NEW\\\",\\\"left\\\":527,\\\"right\\\":661,\\\"top\\\":348,\\\"bottom\\\":412,\\\"height\\\":64,\\\"width\\\":134,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/7.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"锐界\\\",\\\"left\\\":410,\\\"right\\\":584,\\\"top\\\":340,\\\"bottom\\\":428,\\\"height\\\":88,\\\"width\\\":174,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/8.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"福克斯\\\",\\\"left\\\":183,\\\"right\\\":498,\\\"top\\\":323,\\\"bottom\\\":460,\\\"height\\\":137,\\\"width\\\":315,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/9.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"曲线 195 拷贝\\\",\\\"left\\\":30,\\\"right\\\":697,\\\"top\\\":211,\\\"bottom\\\":911,\\\"height\\\":700,\\\"width\\\":667,\\\"mask\\\":{},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/10.png\\\"},{\\\"type\\\":\\\"picture\\\",\\\"visible\\\":true,\\\"opacity\\\":1,\\\"blendingMode\\\":\\\"normal\\\",\\\"name\\\":\\\"长安福特全系焕新购\\\",\\\"left\\\":257,\\\"right\\\":574,\\\"top\\\":270,\\\"bottom\\\":301,\\\"height\\\":31,\\\"width\\\":317,\\\"mask\\\":{},\\\"text\\\":{\\\"value\\\":\\\"长安福特全系焕新购\\\",\\\"font\\\":{\\\"name\\\":\\\"MHeiPRC-Heavy\\\",\\\"sizes\\\":[40.19197],\\\"colors\\\":[[75,73,72,255]],\\\"alignment\\\":[\\\"left\\\"]},\\\"left\\\":0,\\\"top\\\":0,\\\"right\\\":0,\\\"bottom\\\":0,\\\"transform\\\":{\\\"xx\\\":0.8151404,\\\"xy\\\":0,\\\"yx\\\":0,\\\"yy\\\":0.8147084,\\\"tx\\\":254.84451,\\\"ty\\\":297.70392}},\\\"image\\\":{},\\\"imageSrc\\\":\\\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375229826/11.png\\\"}],\\\"document\\\":{\\\"width\\\":750,\\\"height\\\":1057,\\\"resources\\\":{\\\"layerComps\\\":[],\\\"guides\\\":[],\\\"slices\\\":[]}}}\",\"typeName\":\"海报\",\"uploadData\":\"2021-05-07\",\"userId\":\"01f8e8b4ee7e4247bf7a3823c9e47625\",\"videoTime\":\"\",\"width\":\"\"}");
//        assert result.getStatus().equals(200);
    }

    @Test
    public void savaPosters() {
        TemplateInfo templateInfo = new TemplateInfo();
        templateInfo.setCollectionId("1");
        templateInfo.setWidth("200");
        templateInfo.setHeight("100");
        templateInfo.setPictureHeight("200");
        templateInfo.setPictureWidth("100");
        templateInfo.setAbsolutelyUrl("data/source");
        templateInfo.setUserWorkId("1");
        templateInfo.setVideoTime("15");
        templateInfo.setId(12);
        templateInfo.setFileName("test");
        templateInfo.setTypeName("海报");
        templateInfo.setUserId("1111");
        templateInfo.setAccountNumber("CF775");
        templateInfo.setCoverUrl("https://iit.axiwenhua.cn/gtb/files/posterPictureKV/2021/05/07/abf287a27b5844c3873be6782481c55f.jpg");
        templateInfo.setTemplateJson("{\"elements\":[{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"图层 2\",\"left\":0,\"right\":750,\"top\":0,\"bottom\":995,\"height\":995,\"width\":750,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/0.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"组 63\",\"left\":258,\"right\":318,\"top\":442,\"bottom\":474,\"height\":32,\"width\":60,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/1.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"蒙迪欧67\",\"left\":100,\"right\":156,\"top\":444,\"bottom\":465,\"height\":21,\"width\":56,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/2.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"金牛座NEW\",\"left\":129,\"right\":192,\"top\":441,\"bottom\":470,\"height\":29,\"width\":63,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/3.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"福克斯\",\"left\":419,\"right\":481,\"top\":442,\"bottom\":472,\"height\":30,\"width\":62,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/4.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"福克斯猎装版\",\"left\":603,\"right\":647,\"top\":445,\"bottom\":464,\"height\":19,\"width\":44,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/5.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"翼虎\",\"left\":557,\"right\":616,\"top\":443,\"bottom\":470,\"height\":27,\"width\":59,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/6.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"锐际\",\"left\":470,\"right\":594,\"top\":429,\"bottom\":489,\"height\":60,\"width\":124,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/7.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"625\",\"left\":276,\"right\":450,\"top\":415,\"bottom\":493,\"height\":78,\"width\":174,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/8.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"soft_light\",\"name\":\"图层 1\",\"left\":384,\"right\":388,\"top\":423,\"bottom\":427,\"height\":4,\"width\":4,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/9.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"组 1\",\"left\":156,\"right\":284,\"top\":431,\"bottom\":488,\"height\":57,\"width\":128,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/10.png\"}],\"document\":{\"width\":750,\"height\":995,\"resources\":{\"layerComps\":[],\"guides\":[],\"slices\":[]}}}");
        templateInfo.setSourceUrl("https://iit.axiwenhua.cn/gtb/files/posterPSDKV/2021/05/07/93efeb3589b846c6a5757fabb0fadd47.psd");
        templateInfo.setIsEdit("1");
        templateInfo.setStartTime("2021-05-01");
        templateInfo.setEndTime("2021-05-01");
        templateInfo.setCarModelName("全车系");
        templateInfo.setCategoryName("全部");
        templateInfo.setUploadData("2021-05-07");
        templateInfo.setMaterialType(2);
        templateInfo.setRole(2);
        templateInfo.setCreateData(new Date());

        StandardResult result = controller.savaPosters(templateInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void updatePoster() {
        TemplateInfo templateInfo = new TemplateInfo();
        templateInfo.setCollectionId("1");
        templateInfo.setWidth("200");
        templateInfo.setHeight("100");
        templateInfo.setPictureHeight("200");
        templateInfo.setPictureWidth("100");
        templateInfo.setAbsolutelyUrl("data/source");
        templateInfo.setUserWorkId("1");
        templateInfo.setVideoTime("15");
        templateInfo.setId(12);
        templateInfo.setFileName("test");
        templateInfo.setTypeName("海报");
        templateInfo.setUserId("1111");
        templateInfo.setAccountNumber("CF775");
        templateInfo.setCoverUrl("https://iit.axiwenhua.cn/gtb/files/posterPictureKV/2021/05/07/abf287a27b5844c3873be6782481c55f.jpg");
        templateInfo.setTemplateJson("{\"elements\":[{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"图层 2\",\"left\":0,\"right\":750,\"top\":0,\"bottom\":995,\"height\":995,\"width\":750,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/0.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"组 63\",\"left\":258,\"right\":318,\"top\":442,\"bottom\":474,\"height\":32,\"width\":60,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/1.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"蒙迪欧67\",\"left\":100,\"right\":156,\"top\":444,\"bottom\":465,\"height\":21,\"width\":56,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/2.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"金牛座NEW\",\"left\":129,\"right\":192,\"top\":441,\"bottom\":470,\"height\":29,\"width\":63,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/3.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"福克斯\",\"left\":419,\"right\":481,\"top\":442,\"bottom\":472,\"height\":30,\"width\":62,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/4.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"福克斯猎装版\",\"left\":603,\"right\":647,\"top\":445,\"bottom\":464,\"height\":19,\"width\":44,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/5.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"翼虎\",\"left\":557,\"right\":616,\"top\":443,\"bottom\":470,\"height\":27,\"width\":59,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/6.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"锐际\",\"left\":470,\"right\":594,\"top\":429,\"bottom\":489,\"height\":60,\"width\":124,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/7.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"625\",\"left\":276,\"right\":450,\"top\":415,\"bottom\":493,\"height\":78,\"width\":174,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/8.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"soft_light\",\"name\":\"图层 1\",\"left\":384,\"right\":388,\"top\":423,\"bottom\":427,\"height\":4,\"width\":4,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/9.png\"},{\"type\":\"picture\",\"visible\":true,\"opacity\":1,\"blendingMode\":\"normal\",\"name\":\"组 1\",\"left\":156,\"right\":284,\"top\":431,\"bottom\":488,\"height\":57,\"width\":128,\"mask\":{},\"image\":{},\"imageSrc\":\"https://iit.axiwenhua.cn/gtb/files/upload_psd/1620375415402/10.png\"}],\"document\":{\"width\":750,\"height\":995,\"resources\":{\"layerComps\":[],\"guides\":[],\"slices\":[]}}}");
        templateInfo.setSourceUrl("https://iit.axiwenhua.cn/gtb/files/posterPSDKV/2021/05/07/93efeb3589b846c6a5757fabb0fadd47.psd");
        templateInfo.setIsEdit("1");
        templateInfo.setStartTime("2021-05-01");
        templateInfo.setEndTime("2021-05-01");
        templateInfo.setCarModelName("全车系");
        templateInfo.setCategoryName("全部");
        templateInfo.setUploadData("2021-05-07");
        templateInfo.setMaterialType(2);
        templateInfo.setRole(2);
        templateInfo.setCreateData(new Date());
        StandardResult result = controller.updatePoster(templateInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void findByIdTemplateInfo() {
        StandardResult<TemplateInfo> result = controller.findByIdTemplateInfo("391");
        // log.info("test:{}", JSON.toJSONString(result));
        assert result.getStatus().equals(200) && result.getData()!=null;
    }
}