package com.shj.code.controller;

import java.util.Date;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.shj.code.entity.DistributorInfo;
import com.shj.code.entity.UserInfo;
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
public class UserInfoControllerTest {
    @Autowired
    UserInfoController controller;

    @Test
    public void regin() {
        UserInfo userInfo = new UserInfo();
        userInfo.setReadStatus(0);
        userInfo.setUpdataStatus(0);
        userInfo.setModify(0);
        userInfo.setAccountNumber("A52027021");
        userInfo.setUserName("A52027021");
        userInfo.setPassWord("A52027012");
        userInfo.setPhone("18447010111");
        userInfo.setEmail("1");
        userInfo.setPosition("1");
        userInfo.setRegion("1");
        userInfo.setVillage("1");
        userInfo.setProvince("1");
        userInfo.setCity("1");
        userInfo.setDistrName("1");
        userInfo.setDisCode("1");
        userInfo.setRole(1);
        userInfo.setStatus(0);
        StandardResult result = controller.regin(userInfo);
        // log.info("{}", JSON.toJSONString(result));
        assert !result.getStatus().equals(200);
    }

    @Test
    public void login() {
        StandardResult result = controller.login("A5202702", "Qweqwe12");
        assert result.getStatus().equals(200);

        StandardResult result1 = controller.login("11", "22");
        assert !result1.getStatus().equals(200);
    }

    @Test
    public void updateUserInfo() {
        UserInfo userInfo = new UserInfo();
        userInfo.setId("1111");
        userInfo.setReadStatus(0);
        userInfo.setUpdataStatus(0);
        userInfo.setModify(0);
        userInfo.setAccountNumber("A5202702");
        userInfo.setUserName("A5202702");
        userInfo.setPassWord("A5202702");
        userInfo.setPhone("18447010110");
        userInfo.setEmail("1");
        userInfo.setPosition("1");
        userInfo.setRegion("1");
        userInfo.setVillage("1");
        userInfo.setProvince("1");
        userInfo.setCity("1");
        userInfo.setDistrName("1");
        userInfo.setDisCode("1");
        userInfo.setRole(1);
        userInfo.setStatus(0);
        StandardResult result = controller.updateUserInfo(userInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void findUserById() {
        StandardResult<UserInfo> result = controller.findUserById("1111");
        assert result.getStatus().equals(200) && result.getData() != null;
    }

    @Test
    public void selectDistributorInfo() {
        StandardResult<UserInfo> result = controller.selectDistributorInfo("1", "1", "1", "1");
        assert result.getStatus().equals(200) && result.getData() != null;
    }

    @Test
    public void userStatus() {
        StandardResult result = controller.userStatus("1111");
        assert result.getStatus().equals(200) && result.getData() != null;
    }

    @Test
    public void saveUser() {
        DistributorInfo distributorInfo = new DistributorInfo();
        distributorInfo.setCityId(1);
        distributorInfo.setCode("1111");
        distributorInfo.setName("1111");
        StandardResult result = controller.saveUser(distributorInfo);
        assert result.getStatus().equals(200);
    }

    @Test
    public void userInfoList() {
        StandardResult<Map<String, Object>> result = controller.userInfoList("1", "10");
        assert result.getStatus().equals(200) && result.getData() != null;
    }

    @Test
    public void readList() {
        StandardResult result = controller.readList();
        assert result.getStatus().equals(200) && result.getData() != null;
    }

    @Test
    public void informationUser() {
        StandardResult<Map<String, Object>> result = controller.InformationUser("1", "10", "河南裕华");
        // log.info("test:{}", JSON.toJSONString(result));
        assert result.getStatus().equals(200) && result.getData() != null;

        StandardResult<Map<String, Object>> result1 = controller.InformationUser("1", "10", "mm");
        assert !result1.getStatus().equals(200);
    }

    @Test
    public void batchUpdata() {
//        controller.batchUpdata()
    }
}