package com.shj.code.controller;
import com.shj.code.entity.CarInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shj.code.service.CarInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;

import java.util.List;

/***
 * 车型板块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-汽车类型",tags = "后台管理-汽车类型")
public class CarInfoController {
	
	@Autowired
	private CarInfoService carInfoService;
	
	/***
	 * 查询车型List
	 * @return
	 */
	@GetMapping(value="getCarInfoList")
	@ApiOperation(value = "查询车型List")
	public StandardResult<List<CarInfo>> getCarInfoList(){
		StandardResult msg = new StandardResult();
		try{
			msg.setData(carInfoService.getList());
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
}
