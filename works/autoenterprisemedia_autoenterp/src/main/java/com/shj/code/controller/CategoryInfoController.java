package com.shj.code.controller;
import com.shj.code.entity.CategoryInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.shj.code.service.CategoryInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;

import java.util.List;

/***
 * 品类板块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-种类",tags = "后台管理-种类")
public class CategoryInfoController {

	@Autowired
	private CategoryInfoService categoryInfoService;
	
	@GetMapping(value="getCategoryInfoList")
	@ApiOperation(value = "获取汽车种类列表")
	public StandardResult<List<CategoryInfo>> getCategoryInfoList(String typeName){
		StandardResult msg = new StandardResult();
		try{
			msg.setData(categoryInfoService.getList(typeName));
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
