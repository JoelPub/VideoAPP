package com.shj.code.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class CTemplateInfoControllerTest {
    @Autowired
    CTemplateInfoController cTemplateInfoController;

    @Test
    public void selectTemplateInfoByTime() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectTemplateInfoByTime("1", "10", "1111", "海报");
        // log.info("测试：{}", JSON.toJSONString(result));
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectWorksInfoByTime() {
        StandardResult<PageInfo<UserWorksInfo>> result = cTemplateInfoController.selectWorksInfoByTime("1", "10", "1111", "海报");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectTimeInfoByType() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectTimeInfoByType("1", "10", "1111", "海报", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectInfoByFileName() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectInfoByFileName("1", "10", "福睿斯-预热视频-外观篇-15s", "2", "海报",
                "2021-05-10", "2050-12-31", "病毒视频/其他", "1111", "福睿斯", "15");
        assert result.getStatus().equals(200);

        StandardResult<PageInfo<TemplateInfo>> result1 = cTemplateInfoController.selectInfoByFileName("1", "10", "福睿斯-预热视频-外观篇-15s", "2", "海报",
                "2021-05-110", "2050-121-31", "病毒视频/其他", "1111", "福睿斯", "15");
        // log.info("ceshi:{}", JSON.toJSONString(result1));
        assert result1.getStatus().equals(200) && CollectionUtils.isEmpty(result1.getData().getList());
    }

    @Test
    public void selectTemplateInfo() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectTemplateInfo("1", "10", "1111", "海报");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectVlookup() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectVlookup("1", "10", "福睿斯-预热视频-外观篇-15s", "2", "海报",
                "2021-05-10", "2050-12-31", "病毒视频/其他", "1111", "15");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectVlookupByTime() {
        StandardResult<PageInfo<TemplateInfo>> result = cTemplateInfoController.selectVlookupByTime("1", "10", "福睿斯-预热视频-外观篇-15s", "2", "海报",
                "2021-05-10", "2050-12-31", "病毒视频/其他", "福睿斯", "1111", "0", "15");
        assert result.getStatus().equals(200);
    }

    @Test
    public void insertCollect() {
        StandardResult result = cTemplateInfoController.insertCollect(403, "1111", "2");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectInfoByIsEdit() {
        StandardResult<PageInfo<UserWorksInfo>> result = cTemplateInfoController.selectInfoByIsEdit("1", "10", "1111", "海报");
        assert result.getStatus().equals(200);
    }

    @Test
    public void deleteMedia() {
        StandardResult result = cTemplateInfoController.deleteMedia("403");
        assert result.getStatus().equals(200);
    }
}