package com.shj.code.controller;

import com.alibaba.fastjson.JSON;
import com.shj.code.entity.CategoryInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class CategoryInfoControllerTest {
    @Autowired
    CategoryInfoController categoryInfoController;

    @Test
    public void getCategoryInfoList() {
        StandardResult<List<CategoryInfo>> result = categoryInfoController.getCategoryInfoList("视频");
        // log.info("测试：{}", JSON.toJSONString(result));
        assert result.getStatus().equals(200);

        StandardResult<List<CategoryInfo>> result1 = categoryInfoController.getCategoryInfoList("test");
        // log.info("测试1：{}",JSON.toJSONString(result1));
        assert result1.getStatus().equals(200) && CollectionUtils.isEmpty(result1.getData());
    }
}