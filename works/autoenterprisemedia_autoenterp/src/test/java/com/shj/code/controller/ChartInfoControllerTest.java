package com.shj.code.controller;

import com.shj.code.entity.ChartInfo;
import com.shj.code.util.StandardResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChartInfoControllerTest {
    @Autowired
    ChartInfoController chartInfoController;

    @Test
    public void iconList() {
        StandardResult<List<ChartInfo>> result = chartInfoController.iconList();
        assert result.getStatus().equals(200);
    }
}