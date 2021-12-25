package com.shj.code.controller;

import com.shj.code.entity.Disclaimer;
import com.shj.code.service.DisclaimerService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/***
 * @author Cdl
 * @date 2021/4/25 17:09
 * @describe: TODO
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-免责声明",tags = "后台管理-免责声明")
public class DisclaimerController {
    @Autowired
    private DisclaimerService disclaimerService;

    /***
     * 新增免责协议
     * @param userId
     * @return
     */
    @GetMapping("saveDisclaimer")
    @ApiOperation(value = "新增免责协议")
    public StandardResult saveDisclaimer(String userId){
        StandardResult msg=new StandardResult();
        try {
            Disclaimer disclaimer=new Disclaimer();
            disclaimer.setUserId(userId);
            disclaimer.setCreateData(new Date());
            disclaimerService.saveDisclaimer(disclaimer);
            msg.setData("ok");
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        }catch (Exception e){
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }

    /***
     * 查询免责协议
     * @param userId
     * @return
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@GetMapping("selectDisclaimer")
    @ApiOperation(value = "查询免责协议")
    public StandardResult<Map> selectDisclaimer(String userId){
        StandardResult msg=new StandardResult();
        Map map = new HashMap();
        try {
            Disclaimer al = disclaimerService.selectDisclaimer(userId);
            if(al!=null){
                map.put("isDis","1");
            }else{
                map.put("isDis","2");
            }
            msg.setData(map);
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        }catch (Exception e){
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }

}
