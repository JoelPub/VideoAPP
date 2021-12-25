package com.shj.code.controller;

import com.shj.code.entity.CarInfo;
import com.shj.code.util.StandardResult;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class CarInfoControllerTest {
    @Autowired
    CarInfoController carInfoController;

    @Test
    public void getCarInfoList() {
        StandardResult<List<CarInfo>> list = carInfoController.getCarInfoList();
        assert list.getStatus().equals(200);
    }
}