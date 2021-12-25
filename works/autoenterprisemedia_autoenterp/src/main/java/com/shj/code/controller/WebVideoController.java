package com.shj.code.controller;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shj.code.service.WebVideoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.FfmpegUtils;
import com.shj.code.util.StandardResult;
import com.shj.code.util.VideoMerge;
/**
 * WebVideoController
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-视频",tags = "后台管理-视频")
public class WebVideoController {

    @Autowired
    private WebVideoService webVideoService;
    
    @Value("${bootdo.vistsPath}")
    private String host;
    
    /***
     * 合成视频
     * @param vm
     * @return
     */
    @PostMapping(value="merge")
	@ApiOperation(value = "合成视频")
    public StandardResult<Map<String, Object>> merge(@Valid @RequestBody VideoMerge vm) {
    	StandardResult msg = new StandardResult();
    	Map<String, Object> map = new HashMap<String, Object>();
    	try {
    		String path = webVideoService.merge(vm);
    		map.put("sourceUrl", host + path.substring(27));
    		map.put("absolutelyUrl", path);
    		msg.setData(map);
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
    	}catch (Exception e) {
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
    }
    
    /***
     * 视频裁切
     * @return
     */
    @GetMapping(value="cutVideoTest")
	@ApiOperation(value = "视频裁切")
    public Object cutVideoTest(){
    	Map<String, Object> map = new HashMap<>();
    	String paths = FfmpegUtils.cutVideo("/data/resources/video/2021/04/29/3186f695d6734bb9bd61fadf2ad0cb96.mp4", 1, 3);
    	String path = FfmpegUtils.cutVideo("/data/resources/video/2021/04/29/3186f695d6734bb9bd61fadf2ad0cb96.mp4", 1, 4);
    	map.put("one", paths);
    	map.put("two", path);
    	return map;
    }
}
