package com.shj.code.controller;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserShare;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.service.TemplateInfoService;
import com.shj.code.service.UserShareService;
import com.shj.code.service.UserWorksInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;
import com.shj.code.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 作品板块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-经销商",tags = "后台管理-经销商")
public class UserWorksInfoController {

	@Autowired
	private UserWorksInfoService userWorksInfoService;
	
	@Autowired
	private TemplateInfoService templateInfoService;
	
	@Autowired
	private UserShareService userShareService;
	
	/***
	 * 批量保存-经销商
	 * @return
	 */
	@PostMapping(value="saveWorksInfo")
	@ApiOperation(value = "批量保存-经销商")
	public StandardResult saveWorksInfo(@RequestBody String userWorkJson){
		StandardResult msg = new StandardResult();
		try{
			JSONArray jsa = JSONArray.fromObject(JSONObject.fromObject(userWorkJson).get("userWorkJson"));
 			if(jsa.size()>0){
 				for(int i=0;i<jsa.size();i++){
 					String fileName = jsa.getJSONObject(i).getString("fileName");
 					String userId = jsa.getJSONObject(i).getString("userId");
 					String typeName = jsa.getJSONObject(i).getString("typeName");
 					UserWorksInfo ct = userWorksInfoService.findFileNames(fileName, userId, typeName);
 					if(ct==null){
 						ct = new UserWorksInfo();
 						ct.setId(UUIDGenerator.getUUID());
 						ct.setAbsolutelyUrl(jsa.getJSONObject(i).getString("absolutelyUrl"));
 						ct.setAccountNumber(jsa.getJSONObject(i).getString("accountNumber"));
 						ct.setCoverUrl(jsa.getJSONObject(i).getString("coverUrl"));
 						ct.setFileName(jsa.getJSONObject(i).getString("fileName"));
 						ct.setHeight(jsa.getJSONObject(i).getString("height"));
 						ct.setPictureHeight(jsa.getJSONObject(i).getString("pictureHeight"));
 						ct.setPictureWidth(jsa.getJSONObject(i).getString("pictureWidth"));
 						ct.setWidth(jsa.getJSONObject(i).getString("width"));
 						ct.setVideoTime(jsa.getJSONObject(i).getString("videoTime"));
 						ct.setUserId(jsa.getJSONObject(i).getString("userId"));
 						ct.setUploadData(jsa.getJSONObject(i).getString("uploadData"));
 						ct.setTypeName(jsa.getJSONObject(i).getString("typeName"));
 						ct.setSourceUrl(jsa.getJSONObject(i).getString("sourceUrl"));
 						ct.setRole(Integer.parseInt(jsa.getJSONObject(i).getString("role")));
 						ct.setTemplateJson(jsa.getJSONObject(i).getString("templateJson"));
 						ct.setCreateData(new Date());
 						userWorksInfoService.save(ct);
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
	@PostMapping(value="saveWorksInfos")
	@ApiOperation(value = "保存海报和视频")
	public StandardResult saveWorksInfos(@RequestBody UserWorksInfo entity){
		StandardResult msg = new StandardResult();
		try{
			UserWorksInfo ct = userWorksInfoService.findFileNames(entity.getFileName(), entity.getUserId(), entity.getTypeName());
			if(ct==null){
				ct = new UserWorksInfo();
				ct.setId(UUIDGenerator.getUUID());
				ct.setAbsolutelyUrl(entity.getAbsolutelyUrl());
				ct.setAccountNumber(entity.getAccountNumber());
				ct.setCoverUrl(entity.getCoverUrl());
				ct.setFileName(entity.getFileName());
				ct.setHeight(entity.getHeight());
				ct.setPictureHeight(entity.getPictureHeight());
				ct.setPictureWidth(entity.getPictureWidth());
				ct.setWidth(entity.getWidth());
				ct.setVideoTime(entity.getVideoTime());
				ct.setUserId(entity.getUserId());
				ct.setUploadData(entity.getUploadData());
				ct.setTypeName(entity.getTypeName());
				ct.setSourceUrl(entity.getSourceUrl());
				ct.setRole(entity.getRole());
				ct.setTemplateJson(entity.getTemplateJson());
				ct.setCreateData(new Date());
				userWorksInfoService.save(ct);
				if("1".equals(entity.getIsShare())){
					TemplateInfo tf = templateInfoService.findUserWork(ct.getId().toString());
					if(tf==null){
						tf = new TemplateInfo();
						tf.setAccountNumber(ct.getAccountNumber());
						tf.setCoverUrl(ct.getCoverUrl());
						tf.setCreateData(new Date());
						tf.setWidth(ct.getWidth());
						tf.setFileName(ct.getFileName());
						tf.setMaterialType(3);
						tf.setRole(ct.getRole());
						tf.setHeight(ct.getHeight());
						tf.setUserWorkId(ct.getId().toString());
						tf.setSourceUrl(ct.getSourceUrl());
						tf.setAbsolutelyUrl(ct.getAbsolutelyUrl());
						tf.setUserId(ct.getUserId());
						tf.setUploadData(ct.getUploadData());
						tf.setTypeName(ct.getTypeName());
						tf.setTemplateJson(ct.getTemplateJson());
						tf.setPictureHeight(ct.getPictureHeight());
						tf.setPictureWidth(ct.getPictureWidth());
						//tf.setStartTime(ct.gets);
						//tf.setCarModelName();
						//tf.setCategoryName(ct.);
						//tf.setEndTime(ct.);
						//tf.setIsEdit(ct.);
						templateInfoService.save(tf);
					}else{
						msg.setData("文件名已存在，请修改文件名");
						msg.setMessage("文件名已存在，请修改文件名");
						msg.setStatus(BaseResultInterface.FAIL);
						return msg;
					}
				}
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
	 * 编辑-经销商
	 * @return
	 */
	@PostMapping(value="updateWorksInfo")
	@ApiOperation(value = "编辑-经销商")
	public StandardResult updateWorksInfo(@RequestBody UserWorksInfo entity){
		StandardResult msg = new StandardResult();
		try{
			UserWorksInfo ct = userWorksInfoService.findById(entity.getId().toString());
			if(ct!=null){
				ct.setAbsolutelyUrl(entity.getAbsolutelyUrl());
				ct.setAccountNumber(entity.getAccountNumber());
				ct.setCoverUrl(entity.getCoverUrl());
				ct.setFileName(entity.getFileName());
				ct.setHeight(entity.getHeight());
				ct.setPictureHeight(entity.getPictureHeight());
				ct.setPictureWidth(entity.getPictureWidth());
				ct.setWidth(entity.getWidth());
				ct.setVideoTime(entity.getVideoTime());
				ct.setUserId(entity.getUserId());
				ct.setUploadData(entity.getUploadData());
				ct.setTypeName(entity.getTypeName());
				ct.setSourceUrl(entity.getSourceUrl());
				ct.setRole(entity.getRole());
				ct.setTemplateJson(entity.getTemplateJson());
				ct.setCreateData(new Date());
				userWorksInfoService.update(ct);
				if("1".equals(entity.getIsShare())){
					TemplateInfo tf = templateInfoService.findUserWork(ct.getId().toString());
					if(tf!=null){
						tf.setAccountNumber(ct.getAccountNumber());
						tf.setCoverUrl(ct.getCoverUrl());
						tf.setCreateData(new Date());
						//tf.setCustomSize(ct.getCustomSize());
						tf.setWidth(ct.getWidth());
						tf.setHeight(ct.getHeight());
						tf.setPictureHeight(ct.getPictureHeight());
						tf.setPictureWidth(ct.getPictureWidth());
						tf.setFileName(ct.getFileName());
						tf.setMaterialType(3);
						tf.setRole(ct.getRole());
						//tf.setSizeName(ct.getSizeName());
						tf.setUserWorkId(ct.getId().toString());
						tf.setSourceUrl(ct.getSourceUrl());
						tf.setUserId(ct.getUserId());
						tf.setUploadData(ct.getUploadData());
						tf.setTypeName(ct.getTypeName());
						tf.setTemplateJson(ct.getTemplateJson());
						tf.setAbsolutelyUrl(ct.getAbsolutelyUrl());
						templateInfoService.updateFileName(tf);
					}else{
						tf = new TemplateInfo();
						tf.setAccountNumber(ct.getAccountNumber());
						tf.setCoverUrl(ct.getCoverUrl());
						tf.setCreateData(new Date());
						tf.setWidth(ct.getWidth());
						tf.setFileName(ct.getFileName());
						tf.setMaterialType(3);
						tf.setRole(ct.getRole());
						tf.setHeight(ct.getHeight());
						tf.setUserWorkId(ct.getId().toString());
						tf.setSourceUrl(ct.getSourceUrl());
						tf.setAbsolutelyUrl(ct.getAbsolutelyUrl());
						tf.setUserId(ct.getUserId());
						tf.setUploadData(ct.getUploadData());
						tf.setTypeName(ct.getTypeName());
						tf.setTemplateJson(ct.getTemplateJson());
						tf.setPictureHeight(ct.getPictureHeight());
						tf.setPictureWidth(ct.getPictureWidth());
						//tf.setStartTime(ct.gets);
						//tf.setCarModelName();
						//tf.setCategoryName(ct.);
						//tf.setEndTime(ct.);
						//tf.setIsEdit(ct.);
						templateInfoService.save(tf);
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
	 * 查看
	 * @param id
	 * @return
	 */
	@GetMapping(value="findByIdWorksInfo")
	@ApiOperation(value = "查看")
	public StandardResult<UserWorksInfo> findByIdWorksInfo(String id){
		StandardResult msg = new StandardResult();
		try{
			if(StringUtils.isNotBlank(id)){
				msg.setData(userWorksInfoService.findById(id));
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
			msg.setData("参数获取不到");
			msg.setMessage("参数获取不到");
			msg.setStatus(BaseResultInterface.FAIL);
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
	 * 编辑-个人中心-我的素材
	 * @param userId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@GetMapping(value="getPictureList")
	@ApiOperation(value = "编辑-个人中心-我的素材")
	public StandardResult<PageInfo<UserWorksInfo>> getPictureList(String userId,String search,String pageIndex,String pageSize,String type){
		StandardResult msg  =  new StandardResult();
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		JSONArray jsa = new JSONArray();
		JSONObject jso = null;
		try{
			//我的素材
			if("1".equals(type)){
				PageInfo<UserWorksInfo> list = userWorksInfoService.getPictureList(userId, startIndex, maxResults, search);
				if(list.getList().size()>0){
					UserWorksInfo uf = null;
					for(int i=0;i<list.getList().size();i++){
						jso = new JSONObject();
						uf = list.getList().get(i);
						jso.put("id", uf.getId());
						jso.put("fileName", uf.getFileName());
						jso.put("sourceUrl", uf.getSourceUrl());
						jso.put("absolutelyUrl", uf.getAbsolutelyUrl());
						jso.put("pictureHeight", uf.getPictureHeight());
						jso.put("pictureWidth", uf.getPictureWidth());
						jso.put("coverUrl", uf.getCoverUrl());
						jsa.element(jso);
					}
				}
				PageInfo<UserWorksInfo> listed = new PageInfo<>(jsa);
				listed.setTotal(list.getTotal());
				listed.setPages(list.getPages());
				listed.setPageNum(list.getPageNum());
				listed.setPageSize(list.getPageSize());
				listed.setSize(list.getSize());
				listed.setStartRow(list.getStartRow());
				listed.setEndRow(list.getEndRow());
				msg.setData(listed);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else{
				//我的收藏
				PageInfo<UserShare> lists = userShareService.getUserShareList(userId, startIndex, maxResults, search);
				if(lists.getList().size()>0){
					UserShare uf = null;
					for(int i=0;i<lists.getList().size();i++){
						jso = new JSONObject();
						uf = lists.getList().get(i);
						jso.put("id", uf.getId());
						jso.put("fileName", uf.getFileName());
						jso.put("sourceUrl", uf.getSourceUrl());
						jso.put("absolutelyUrl", uf.getAbsolutelyUrl());
						jso.put("pictureHeight", uf.getPictureHeight());
						jso.put("pictureWidth", uf.getPictureWidth());
						jso.put("coverUrl", uf.getCoverUrl());
						jsa.element(jso);
					}
				}
				PageInfo<UserWorksInfo> listed = new PageInfo<>(jsa);
				listed.setTotal(lists.getTotal());
				listed.setPages(lists.getPages());
				listed.setPageNum(lists.getPageNum());
				listed.setPageSize(lists.getPageSize());
				listed.setSize(lists.getSize());
				listed.setStartRow(lists.getStartRow());
				listed.setEndRow(lists.getEndRow());
				msg.setData(listed);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	
	/***
	 * 编辑-个人中心-视频
	 * @param userId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@GetMapping(value="getVideoList")
	@ApiOperation(value = "编辑-个人中心-视频")
	public StandardResult<PageInfo<UserWorksInfo>> getVideoList(String userId,String search,String pageIndex,String pageSize,String type){
		StandardResult msg  =  new StandardResult();
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		JSONArray jsa = new JSONArray();
		JSONObject jso = null;
		try{
			//我的素材
			if("1".equals(type)){
				PageInfo<UserWorksInfo> list = userWorksInfoService.getVideoList(userId, startIndex, maxResults, search);
				if(list.getList().size()>0){
					UserWorksInfo uf = null;
					for(int i=0;i<list.getList().size();i++){
						jso = new JSONObject();
						uf = list.getList().get(i);
						jso.put("id", uf.getId());
						jso.put("fileName", uf.getFileName());
						jso.put("sourceUrl", uf.getSourceUrl());
						jso.put("absolutelyUrl", uf.getAbsolutelyUrl());
						jso.put("pictureHeight", uf.getPictureHeight());
						jso.put("pictureWidth", uf.getPictureWidth());
						jsa.element(jso);
					}
				}
				PageInfo<UserWorksInfo> listed = new PageInfo<>(jsa);
				listed.setTotal(list.getTotal());
				listed.setPages(list.getPages());
				listed.setPageNum(list.getPageNum());
				listed.setPageSize(list.getPageSize());
				listed.setSize(list.getSize());
				listed.setStartRow(list.getStartRow());
				listed.setEndRow(list.getEndRow());
				msg.setData(listed);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else{
				//我的收藏
				PageInfo<UserShare> lists = userShareService.getUserVideoShareList(userId, startIndex, maxResults, search);
				if(lists.getList().size()>0){
					UserShare uf = null;
					for(int i=0;i<lists.getList().size();i++){
						jso = new JSONObject();
						uf = lists.getList().get(i);
						jso.put("id", uf.getId());
						jso.put("fileName", uf.getFileName());
						jso.put("sourceUrl", uf.getSourceUrl());
						jso.put("absolutelyUrl", uf.getAbsolutelyUrl());
						jso.put("pictureHeight", uf.getPictureHeight());
						jso.put("pictureWidth", uf.getPictureWidth());
						jso.put("coverUrl", uf.getCoverUrl());
						jsa.element(jso);
					}
				}
				PageInfo<UserWorksInfo> listed = new PageInfo<>(jsa);
				listed.setTotal(lists.getTotal());
				listed.setPages(lists.getPages());
				listed.setPageNum(lists.getPageNum());
				listed.setPageSize(lists.getPageSize());
				listed.setSize(lists.getSize());
				listed.setStartRow(lists.getStartRow());
				listed.setEndRow(lists.getEndRow());
				msg.setData(listed);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 编辑-个人中心-音频
	 * @param userId
	 * @return
	 */
	@GetMapping(value="getAudioList")
	@ApiOperation(value = "编辑-个人中心-音频")
	public StandardResult<JSONArray> getAudioList(String userId){
		StandardResult msg = new StandardResult();
		JSONArray jsa = new JSONArray();
		JSONObject jso = null;
		try{
			List<UserWorksInfo> list = userWorksInfoService.getAudioList(userId);
			if(list.size()>0){
				UserWorksInfo uf = null;
				for(int i =0;i<list.size();i++){
					jso = new JSONObject();
					uf = list.get(i);
					jso.put("id", uf.getId());
					jso.put("fileName", uf.getFileName());
					jso.put("sourceUrl", uf.getSourceUrl());
					jso.put("absolutelyUrl", uf.getAbsolutelyUrl());
					jso.put("coverUrl", uf.getCoverUrl());
					jsa.element(jso);
				}
			}
			msg.setData(jsa);
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
	 * 个人中心删除
	 * @param id
	 * @return
	 */
	@GetMapping(value="deleteUserInfo")
	@ApiOperation(value = "个人中心删除")
	public Object deleteUserInfo(String id){
		StandardResult msg = new StandardResult();
		try{
			if(StringUtils.isNotBlank(id)){
				userWorksInfoService.delete(id);
			}else{
				msg.setData("参数获取不到");
				msg.setMessage("参数获取不到");
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
	 * 编辑-公共素材-海报
	 * @param 1、总部海报  2、总部KV
	 * @return
	 */
	@GetMapping(value="materialInfo")
	@ApiOperation(value = "编辑-公共素材-海报")
	public StandardResult<PageInfo<TemplateInfo>> materialInfo(String pageIndex,String pageSize,String search,String type){
		StandardResult msg  =  new StandardResult();
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		try{
			if("1".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getPosterList(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else if("2".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getPosterListKV(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
			return null;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 编辑-公共素材-图片-视频
	 * @param pageIndex
	 * @param pageSize
	 * @param search
	 * @param type
	 * @param status
	 * @return
	 */
	@GetMapping(value="materialVideoInfo")
	@ApiOperation(value = "编辑-公共素材-图片-视频")
	public StandardResult<PageInfo<TemplateInfo>> materialVideoInfo(String pageIndex,String pageSize,String search,String type,String status){
		StandardResult msg  =  new StandardResult();
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		try{
			//status 为1是图片   type 为1是总部海报，为2是总部KV
			//status 为2是视频   type 为1是总部视频，为2是区域视频
			if("1".equals(status)&&"1".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getPosterList(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;	
			}else if("1".equals(status)&&"2".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getPosterListKV(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else if("2".equals(status)&&"1".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getPosterVideoList(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else if("2".equals(status)&&"2".equals(type)){
				PageInfo<TemplateInfo> list = templateInfoService.getDisVideoList(startIndex, maxResults, search);
				msg.setData(list);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
			return null;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	
	/***
	 * 判断是否分享
	 * @return
	 */
	@GetMapping(value="isCheckShare")
	@ApiOperation(value = "判断是否分享")
	public StandardResult<Map<String, Object>> isCheckShare(String userId,String type){
		StandardResult msg = new StandardResult();
		Map<String, Object> map = new HashMap<String, Object>();
		try{
			List<UserShare> ud = userShareService.findById(userId, type);
			if(ud.size()>0){
				map.put("isCheck", 1);
			}else{
				map.put("isCheck", 2);
			}
			msg.setData(map);
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
	 * 分享到经销商素材库-海报-视频
	 * @param id
	 * @return
	 */
	@PostMapping(value="userShare")
	@ApiOperation(value = "分享到经销商素材库-海报-视频")
	public StandardResult userShare(@RequestBody UserWorksInfo entity){
		StandardResult msg = new StandardResult();
		String type = "";
		try{
			if("海报".equals(entity.getTypeName())){
				type = "1";
			}else{
				type = "2";
			}
			List<UserShare> ud = userShareService.findById(entity.getUserId(), type);
			if(ud.size()==0){
				UserShare us = new UserShare();
				us.setCreateData(new Date());
				us.setType(type);
				us.setUserId(entity.getUserId());
				userShareService.save(us);
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
}
