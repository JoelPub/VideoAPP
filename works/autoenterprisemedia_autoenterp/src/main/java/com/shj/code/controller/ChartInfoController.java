package com.shj.code.controller;
import com.shj.code.entity.ChartInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shj.code.service.ChartInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;

import java.util.List;

/***
 * 形状版本
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-图表",tags = "后台管理-图表")
public class ChartInfoController {

	@Autowired
	private ChartInfoService chartInfoService;
	
	/***
	 * 海报形状列表
	 * @param type
	 * @return
	 */
	@GetMapping(value="iconList")
	@ApiOperation(value = "海报形状列表")
	public StandardResult<List<ChartInfo>> iconList(){
		StandardResult msg = new StandardResult();
		try{
			msg.setData(chartInfoService.getList());
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
