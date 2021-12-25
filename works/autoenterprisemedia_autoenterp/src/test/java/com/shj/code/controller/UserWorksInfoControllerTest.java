package com.shj.code.controller;
import java.util.Date;
import java.util.Map;

import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;
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
public class UserWorksInfoControllerTest {
    @Autowired
    UserWorksInfoController controller;

    @Test
    public void saveWorksInfo() {
//        controller.saveWorksInfo()
    }

    @Test
    public void saveWorksInfos() {
        UserWorksInfo userWorksInfo = new UserWorksInfo();
        userWorksInfo.setIsShare("1");
        userWorksInfo.setWidth("1");
        userWorksInfo.setHeight("2");
        userWorksInfo.setPictureHeight("2");
        userWorksInfo.setPictureWidth("2");
        userWorksInfo.setAbsolutelyUrl("1");
        userWorksInfo.setVideoTime("1");
        userWorksInfo.setFileName("1");
        userWorksInfo.setTypeName("1");
        userWorksInfo.setUserId("1");
        userWorksInfo.setAccountNumber("1");
        userWorksInfo.setCoverUrl("1");
        userWorksInfo.setTemplateJson("1");
        userWorksInfo.setSourceUrl("1");
        userWorksInfo.setRole(1);

        StandardResult result = controller.saveWorksInfos(userWorksInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void updateWorksInfo() {
        UserWorksInfo userWorksInfo = new UserWorksInfo();
        userWorksInfo.setIsShare("1");
        userWorksInfo.setWidth("1");
        userWorksInfo.setHeight("2");
        userWorksInfo.setPictureHeight("2");
        userWorksInfo.setPictureWidth("2");
        userWorksInfo.setAbsolutelyUrl("1");
        userWorksInfo.setVideoTime("1");
        userWorksInfo.setFileName("1");
        userWorksInfo.setTypeName("1");
        userWorksInfo.setUserId("1");
        userWorksInfo.setAccountNumber("1");
        userWorksInfo.setCoverUrl("1");
        userWorksInfo.setTemplateJson("1");
        userWorksInfo.setSourceUrl("1");
        userWorksInfo.setRole(1);
        userWorksInfo.setId("3cbecdee675e4bb19d0c0c13e7e4ad55");
        StandardResult result = controller.updateWorksInfo(userWorksInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void findByIdWorksInfo() {
        StandardResult<UserWorksInfo> result = controller.findByIdWorksInfo("3cbecdee675e4bb19d0c0c13e7e4ad55");
        assert result.getStatus().equals(200) && result.getData()!=null;
    }

    @Test
    public void getPictureList() {
        StandardResult<PageInfo<UserWorksInfo>> result = controller.getPictureList("1111", "", "1", "10", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void getVideoList() {
        StandardResult<PageInfo<UserWorksInfo>> result = controller.getVideoList("1111", "", "1", "10", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void getAudioList() {
        StandardResult<JSONArray> result = controller.getAudioList("1111");
        assert result.getStatus().equals(200);
    }

    @Test
    public void deleteUserInfo() {
//        controller.deleteUserInfo("3cbecdee675e4bb19d0c0c13e7e4ad55")
    }

    @Test
    public void materialInfo() {
        StandardResult<PageInfo<TemplateInfo>> result = controller.materialInfo("1", "10", "", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void materialVideoInfo() {
        StandardResult<PageInfo<TemplateInfo>> result = controller.materialVideoInfo("1", "10", "", "2","1");
        assert result.getStatus().equals(200);
    }

    @Test
    public void isCheckShare() {
        StandardResult<Map<String, Object>> result = controller.isCheckShare("1111", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void userShare() {
        UserWorksInfo userWorksInfo = new UserWorksInfo();
        userWorksInfo.setTypeName("海报");
        userWorksInfo.setUserId("1111");

        StandardResult result = controller.userShare(userWorksInfo);
        assert result.getStatus().equals(200);
    }
}