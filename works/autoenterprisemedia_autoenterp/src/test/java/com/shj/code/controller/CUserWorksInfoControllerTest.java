package com.shj.code.controller;

import com.github.pagehelper.PageInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class CUserWorksInfoControllerTest {
    @Autowired
    CUserWorksInfoController controller;

    @Test
    public void selectWorksInfo() {
        StandardResult<PageInfo<UserWorksInfo>> result = controller.selectWorksInfo("1", "10", "1111");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectInfoByFileName() {
        StandardResult<Map<String, PageInfo>> result = controller.selectInfoByFileName("1", "10", "全车系-2020年3月促销kv-竖版","1111","海报");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectInfoByTime() {
        StandardResult<PageInfo<UserWorksInfo>> result = controller.selectInfoByTime("1", "10", "1111","海报");
        assert result.getStatus().equals(200);
    }

    @Test
    public void deleteTemplate() {
        StandardResult<PageInfo<UserWorksInfo>> result = controller.deleteTemplate("1");
        assert result.getStatus().equals(200);
    }
}