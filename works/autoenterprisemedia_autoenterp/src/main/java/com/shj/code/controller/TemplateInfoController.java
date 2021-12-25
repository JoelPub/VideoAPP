package com.shj.code.controller;
import java.util.Date;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.shj.code.entity.TemplateInfo;
import com.shj.code.service.TemplateInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/***
 * 模板模块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-模板",tags = "后台管理-模板")
public class TemplateInfoController {

	@Autowired
	private TemplateInfoService templateInfoService;
	
	/***
	 * 保存模板-总部区域
	 * @param templateJson
	 * @return
	 */
	@PostMapping(value="savaPoster")
	@ApiOperation(value = "保存模板-总部区域")
	public StandardResult savaPoster(@RequestBody String templateJson){
		StandardResult msg = new StandardResult();
		try{
			JSONArray jsa = JSONArray.fromObject(JSONObject.fromObject(templateJson).get("templateJson"));
 			if(jsa.size()>0){
 				for(int i=0;i<jsa.size();i++){
 					String fileName = jsa.getJSONObject(i).getString("fileName");
 					String typeName = jsa.getJSONObject(i).getString("typeName");
 					String userId = jsa.getJSONObject(i).getString("userId");
 					String templateJsons = jsa.getJSONObject(i).getString("templateJson");
 					String accountNumber = jsa.getJSONObject(i).getString("accountNumber");
 					String sourceUrl = jsa.getJSONObject(i).getString("sourceUrl");
 					String absolutelyUrl = jsa.getJSONObject(i).getString("absolutelyUrl");
 					String isEdit = jsa.getJSONObject(i).getString("isEdit");
 					String startTime = jsa.getJSONObject(i).getString("startTime");
 					String carModelName = jsa.getJSONObject(i).getString("carModelName");
 					String categoryName = jsa.getJSONObject(i).getString("categoryName");
 					String videoTime = jsa.getJSONObject(i).getString("videoTime");
 					String pictureHeight = jsa.getJSONObject(i).getString("pictureHeight");
 					String pictureWidth = jsa.getJSONObject(i).getString("pictureWidth");
 					String width = jsa.getJSONObject(i).getString("width");
 					String height = jsa.getJSONObject(i).getString("height");
 					String role = jsa.getJSONObject(i).getString("role");
 					String materialType = jsa.getJSONObject(i).getString("materialType");
 					String uploadData = jsa.getJSONObject(i).getString("uploadData");
 					String endTime = jsa.getJSONObject(i).getString("endTime");
 					String coverUrl = jsa.getJSONObject(i).getString("coverUrl");;
 					TemplateInfo ct = templateInfoService.findFileName(fileName,typeName,userId);
 					if(ct==null){
 						ct = new TemplateInfo();
 						ct.setAbsolutelyUrl(absolutelyUrl);
 						ct.setAccountNumber(accountNumber);
 						ct.setCarModelName(carModelName);
 						ct.setCategoryName(categoryName);
 						ct.setCoverUrl(coverUrl);
 						ct.setEndTime(endTime);
 						ct.setFileName(fileName);
 						ct.setHeight(height);
 						ct.setIsEdit(isEdit);
 						ct.setMaterialType(Integer.parseInt(materialType));
 						ct.setPictureHeight(pictureHeight);
 						ct.setPictureWidth(pictureWidth);
 						ct.setWidth(width);
 						ct.setVideoTime(videoTime);
 						ct.setUserId(userId);
 						ct.setUploadData(uploadData);
 						ct.setTypeName(typeName);
 						ct.setStartTime(startTime);
 						ct.setSourceUrl(sourceUrl);
 						ct.setRole(Integer.parseInt(role));
 						ct.setTemplateJson(templateJsons);
 						ct.setCreateData(new Date());
 	 					templateInfoService.save(ct);
 					}else{
 						msg.setData("文件名已存在，请修改文件名");
 						msg.setMessage("文件名已存在，请修改文件名");
 						msg.setStatus(BaseResultInterface.FAIL);
 						return msg;
 					}
 				}
 			}
			msg.setData("ok");
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
	
	/***
	 * 保存海报和视频
	 * @return
	 */
	@PostMapping(value="savaPosters")
	@ApiOperation(value = "保存海报和视频")
	public StandardResult savaPosters(@RequestBody TemplateInfo entity){
		StandardResult msg = new StandardResult();
		try{
			String fileName = entity.getFileName();
			String typeName = entity.getTypeName();
			String userId = entity.getUserId();
			String accountNumber = entity.getAccountNumber();
			String coverUrl = entity.getCoverUrl();
			String sourceUrl = entity.getSourceUrl();
			String absolutelyUrl = entity.getAbsolutelyUrl();
			String isEdit = entity.getIsEdit();
			String startTime = entity.getStartTime();
			String carModelName = entity.getCarModelName();
			String categoryName = entity.getCategoryName();
			String videoTime = entity.getVideoTime();
			String pictureHeight = entity.getPictureHeight();
			String pictureWidth = entity.getPictureWidth();
			String width = entity.getWidth();
			String height = entity.getHeight();
			String role = entity.getRole().toString();
			String materialType = entity.getMaterialType().toString();
			String uploadData = entity.getUploadData();
			String endTime = entity.getEndTime();
			TemplateInfo ct = templateInfoService.findFileName(entity.getFileName(),entity.getTypeName(),entity.getUserId());
			if(ct==null){
				ct = new TemplateInfo();
				ct.setAbsolutelyUrl(absolutelyUrl);
				ct.setAccountNumber(accountNumber);
				ct.setCarModelName(carModelName);
				ct.setCategoryName(categoryName);
				ct.setCoverUrl(coverUrl);
				ct.setEndTime(endTime);
				ct.setFileName(fileName);
				ct.setHeight(height);
				ct.setIsEdit(isEdit);
				ct.setMaterialType(Integer.parseInt(materialType));
				ct.setPictureHeight(pictureHeight);
				ct.setPictureWidth(pictureWidth);
				ct.setWidth(width);
				ct.setVideoTime(videoTime);
				ct.setUserId(userId);
				ct.setUploadData(uploadData);
				ct.setTypeName(typeName);
				ct.setStartTime(startTime);
				ct.setSourceUrl(sourceUrl);
				ct.setRole(Integer.parseInt(role));
				ct.setTemplateJson(entity.getTemplateJson());
				ct.setCreateData(new Date());
				templateInfoService.save(ct);
			}else{
				msg.setData("文件名已存在，请修改文件名");
				msg.setMessage("文件名已存在，请修改文件名");
				msg.setStatus(BaseResultInterface.FAIL);
				return msg;
			}
			msg.setData("ok");
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
	
	/***
	 * 编辑模板-总部区域
	 * @param entity
	 * @return
	 */
	@PostMapping(value="updatePoster")
	@ApiOperation(value = "编辑模板-总部区域")
	public StandardResult updatePoster(@RequestBody TemplateInfo entity){
			StandardResult msg = new StandardResult();
			String fileName = entity.getFileName();
			String typeName = entity.getTypeName();
			String userId = entity.getUserId();
			String accountNumber = entity.getAccountNumber();
			String coverUrl = entity.getCoverUrl();
			String sourceUrl = entity.getSourceUrl();
			String absolutelyUrl = entity.getAbsolutelyUrl();
			String isEdit = entity.getIsEdit();
			String startTime = entity.getStartTime();
			String carModelName = entity.getCarModelName();
			String categoryName = entity.getCategoryName();
			String videoTime = entity.getVideoTime();
			String pictureHeight = entity.getPictureHeight();
			String pictureWidth = entity.getPictureWidth();
			String width = entity.getWidth();
			String height = entity.getHeight();
			String role = entity.getRole().toString();
			String materialType = entity.getMaterialType().toString();
			String uploadData = entity.getUploadData();
			String endTime = entity.getEndTime();
		try{
			TemplateInfo ct = templateInfoService.findById(entity.getId().toString());
			if(ct!=null){
				ct.setAbsolutelyUrl(absolutelyUrl);
				ct.setAccountNumber(accountNumber);
				ct.setCarModelName(carModelName);
				ct.setCategoryName(categoryName);
				ct.setCoverUrl(coverUrl);
				ct.setEndTime(endTime);
				ct.setFileName(fileName);
				ct.setHeight(height);
				ct.setIsEdit(isEdit);
				ct.setMaterialType(Integer.parseInt(materialType));
				ct.setPictureHeight(pictureHeight);
				ct.setPictureWidth(pictureWidth);
				ct.setWidth(width);
				ct.setVideoTime(videoTime);
				ct.setUserId(userId);
				ct.setUploadData(uploadData);
				ct.setTypeName(typeName);
				ct.setStartTime(startTime);
				ct.setSourceUrl(sourceUrl);
				ct.setRole(Integer.parseInt(role));
				ct.setTemplateJson(entity.getTemplateJson());
				ct.setCreateData(new Date());
				templateInfoService.update(ct);
			}
			msg.setData("ok");
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
	
	/***
	 * 查看-总部区域
	 * @return
	 */
	@GetMapping(value="findByIdTemplateInfo")
	@ApiOperation(value = "查看-总部区域")
	public StandardResult<TemplateInfo> findByIdTemplateInfo(String id){
		StandardResult msg = new StandardResult();
		try{
			msg.setData(templateInfoService.findById(id));
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