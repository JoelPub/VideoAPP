package com.shj.code.controller;

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
public class DisclaimerControllerTest {
    @Autowired
    DisclaimerController controller;

    @Test
    public void saveDisclaimer() {
        StandardResult result = controller.saveDisclaimer("1111");
        assert result.getStatus().equals(200);
    }

    @Test
    public void selectDisclaimer() {
        StandardResult result = controller.selectDisclaimer("1111");
        assert result.getStatus().equals(200);
    }
}