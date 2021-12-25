package com.shj.code.controller;

import java.text.SimpleDateFormat;
import java.util.Date;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserTemplateInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.service.CTemplateInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;


@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-个人收藏",tags = "后台管理-个人收藏")
public class CTemplateInfoController {
    @Autowired
    private CTemplateInfoService templateInfoService;

    /***
     * 历史收藏时间排序
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @param typeName
     * @return
     */
    @GetMapping("timeSortTemplate")
    @ApiOperation(value = "历史收藏时间排序")
    public StandardResult<PageInfo<TemplateInfo>> selectTemplateInfoByTime(String pageIndex,String pageSize,String userId,String typeName) {
        int startIndex = 1, maxResult = 10;
        if (StringUtils.isNotBlank(pageIndex)) startIndex = Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize)) maxResult = Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        String uId=null;
        String cId=null;
        try {
            PageInfo<TemplateInfo>list = templateInfoService.selectTemplateInfoByTime(startIndex, maxResult,userId,typeName);
            if (list.getList().size() > 0) {
                for (int i = 0; i < list.getList().size(); i++) {
                    tf = list.getList().get(i);
                    jso = new JSONObject();
                    jso.put("id", tf.getId());
                    jso.put("fileName", tf.getFileName());
                    jso.put("sourceUrl", tf.getSourceUrl());
                    jso.put("templateJson", tf.getTemplateJson());
                    jso.put("uploadData", tf.getUploadData());
                    jso.put("typeName",tf.getTypeName());
                    jso.put("accountNumber",tf.getAccountNumber());
                    jso.put("startTime",tf.getStartTime());
                    jso.put("endTime",tf.getEndTime());
                    jso.put("coverUrl",tf.getCoverUrl());
                    jso.put("isEdit",tf.getIsEdit());
                    if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                    	long date1 = sdf.parse(time).getTime();
                    	long date2 = sdf.parse(tf.getStartTime()).getTime();
                    	long date3 = sdf.parse(tf.getEndTime()).getTime();
                    	if (date1 >= date2 && date1 <= date3) {
                    	    jso.put("isOverdue", 1);
                    	} else {
                    	    jso.put("isOverdue", 2);
                    	}}
                    uId=templateInfoService.selectUserId(tf.getId());
                    if (uId.equals(userId)){
                        jso.put("isHomemade",0);
                    }else {
                        jso.put("isHomemade",1);
                    }
                    cId=templateInfoService.selectCollectId(userId,tf.getId());
                    if (StringUtils.isEmpty(cId)){
                        jso.put("isCollect",0);
                    }else {
                        jso.put("isCollect",1);
                    }
                    jsa.element(jso);
                }
            }
            @SuppressWarnings("unchecked")
			PageInfo<TemplateInfo>pageInfo=new PageInfo<>(jsa);
            pageInfo.setTotal(list.getTotal());
            pageInfo.setPages(list.getPages());
            pageInfo.setPageNum(list.getPageNum());
            pageInfo.setPageSize(list.getPageSize());
            pageInfo.setSize(list.getSize());
            pageInfo.setStartRow(list.getStartRow());
            pageInfo.setEndRow(list.getEndRow());
            msg.setData(pageInfo);
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        } catch (Exception e) {
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }
    /***
     * 历史编辑时间排序
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @param typeName
     * @return
     */
    @GetMapping("timeSortWorks")
    @ApiOperation(value = "历史编辑时间排序")
    public StandardResult<PageInfo<UserWorksInfo>> selectWorksInfoByTime(String pageIndex,String pageSize,String userId,String typeName) {
        int startIndex = 1, maxResult = 10;
        if (StringUtils.isNotBlank(pageIndex)) startIndex = Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize)) maxResult = Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        PageInfo<UserWorksInfo> list = null;
        try {
            list = templateInfoService.selectWorksInfoByTime(startIndex, maxResult,userId,typeName);
            PageHelper.startPage(startIndex, maxResult);
           // PageInfo<UserWorksInfo> pageInfo = new PageInfo<UserWorksInfo>(list);
            msg.setData(list);
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        } catch (Exception e) {
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }
    /***
     * 区别类型的时间排序
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @param typeName
     * @param type
     * @return
     */
    @GetMapping("timeSortByType")
    @ApiOperation(value = "区别类型的时间排序")
    public StandardResult<PageInfo<TemplateInfo>> selectTimeInfoByType(String pageIndex,String pageSize,String userId,String typeName,String type){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        StandardResult msg = new StandardResult();
        String uId=null;
        String cId=null;
        try {
            if (type.equals("0")) {
				PageInfo<UserWorksInfo>list=templateInfoService.selectWorksInfoByTime(startIndex,maxResult,userId,typeName);
                msg.setData(list);
                msg.setMessage("success");
                msg.setStatus(BaseResultInterface.SUCCESS);
                return msg;
            }else {
                PageInfo<TemplateInfo>list = templateInfoService.selectTemplateInfoByTime(startIndex, maxResult,userId,typeName);
                if (list.getList().size() > 0) {
                    for (int i = 0; i < list.getList().size(); i++) {
                        tf = list.getList().get(i);
                        jso = new JSONObject();
                        jso.put("id", tf.getId());
                        jso.put("fileName", tf.getFileName());
                        jso.put("sourceUrl", tf.getSourceUrl());
                        jso.put("templateJson", tf.getTemplateJson());
                        jso.put("uploadData", tf.getUploadData());
                        jso.put("typeName",tf.getTypeName());
                        jso.put("accountNumber",tf.getAccountNumber());
                        jso.put("startTime",tf.getStartTime());
                        jso.put("endTime",tf.getEndTime());
                        jso.put("coverUrl",tf.getCoverUrl());
                        jso.put("isEdit",tf.getIsEdit());
                        if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                        	long date1 = sdf.parse(time).getTime();
                        	long date2 = sdf.parse(tf.getStartTime()).getTime();
                        	long date3 = sdf.parse(tf.getEndTime()).getTime();
                        	if (date1 >= date2 && date1 <= date3) {
                        	    jso.put("isOverdue", 1);
                        	} else {
                        	    jso.put("isOverdue", 2);
                        	}}
                        uId=templateInfoService.selectUserId(tf.getId());
                        if (uId.equals(userId)){
                            jso.put("isHomemade",0);
                        }else {
                            jso.put("isHomemade",1);
                        }
                        cId=templateInfoService.selectCollectId(userId,tf.getId());
                        if (StringUtils.isEmpty(cId)){
                            jso.put("isCollect",0);
                        }else {
                            jso.put("isCollect",1);
                        }
                        jsa.element(jso);
                    }
                }
                @SuppressWarnings("unchecked")
				PageInfo<TemplateInfo>pageInfo=new PageInfo<>(jsa);
                pageInfo.setTotal(list.getTotal());
                pageInfo.setPages(list.getPages());
                pageInfo.setPageNum(list.getPageNum());
                pageInfo.setPageSize(list.getPageSize());
                pageInfo.setSize(list.getSize());
                pageInfo.setStartRow(list.getStartRow());
                pageInfo.setEndRow(list.getEndRow());
                msg.setData(pageInfo);
                msg.setMessage("success");
                msg.setStatus(BaseResultInterface.SUCCESS);
                return msg;
            }
        }catch (Exception e){
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }
    /***
     * 模糊搜索
     * @param pageIndex
     * @param pageSize
     * @param fileName
     * @return
     */
    @GetMapping("searchTemplate")
    @ApiOperation(value = "模糊搜索")
    public StandardResult<PageInfo<TemplateInfo>> selectInfoByFileName(String pageIndex,String pageSize,String fileName,String materialType,String typeName,String sTime,String eTime,String categoryName,String userId,String carModelName,String videoTime) {
        int startIndex = 1, maxResult = 10;
        if (StringUtils.isNotBlank(pageIndex)) startIndex = Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize)) maxResult = Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        //List<TemplateInfo> list = null;
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        String uId=null;
        String cId=null;
        try {
            PageInfo<TemplateInfo>list = templateInfoService.selectTemplateInfoByFileName(startIndex,maxResult,fileName,materialType,typeName,sTime,eTime,categoryName,userId,carModelName,videoTime);
            if (list.getList().size() > 0) {
                for (int i = 0; i < list.getList().size(); i++) {
                    tf = list.getList().get(i);
                    jso = new JSONObject();
                    jso.put("id", tf.getId());
                    jso.put("fileName", tf.getFileName());
                    jso.put("sourceUrl", tf.getSourceUrl());
                    jso.put("templateJson", tf.getTemplateJson());
                    jso.put("uploadData", tf.getUploadData());
                    jso.put("typeName",tf.getTypeName());
                    jso.put("accountNumber",tf.getAccountNumber());
                    jso.put("startTime",tf.getStartTime());
                    jso.put("endTime",tf.getEndTime());
                    jso.put("coverUrl",tf.getCoverUrl());
                    jso.put("isEdit",tf.getIsEdit());
                    if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                    	long date1 = sdf.parse(time).getTime();
                    	long date2 = sdf.parse(tf.getStartTime()).getTime();
                    	long date3 = sdf.parse(tf.getEndTime()).getTime();
                    	if (date1 >= date2 && date1 <= date3) {
                    	    jso.put("isOverdue", 1);
                    	} else {
                    	    jso.put("isOverdue", 2);
                    	}}
                    uId=templateInfoService.selectUserId(tf.getId());
                    if (uId.equals(userId)){
                        jso.put("isHomemade",0);
                    }else {
                        jso.put("isHomemade",1);
                    }
                    cId=templateInfoService.selectCollectId(userId, tf.getId());
                    if(StringUtils.isEmpty(cId)){
                        jso.put("isCollect",0);
                    }else {
                        jso.put("isCollect",1);
                    }
                    jsa.element(jso);
                }
            }
            @SuppressWarnings("unchecked")
			PageInfo<TemplateInfo>pageInfo=new PageInfo<>(jsa);
            pageInfo.setTotal(list.getTotal());
            pageInfo.setPages(list.getPages());
            pageInfo.setPageNum(list.getPageNum());
            pageInfo.setPageSize(list.getPageSize());
            pageInfo.setSize(list.getSize());
            pageInfo.setStartRow(list.getStartRow());
            pageInfo.setEndRow(list.getEndRow());
            msg.setData(pageInfo);
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        } catch (Exception e) {
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }
    /***
     * 个人中心历史收藏
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @return
     */
    @GetMapping("selectUserTemplateInfo")
    @ApiOperation(value = "个人中心历史收藏")
    public StandardResult<PageInfo<TemplateInfo>> selectTemplateInfo(String pageIndex,String pageSize,String userId,String typeName){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        try {
            PageInfo<TemplateInfo>list=templateInfoService.selectInfoByTemplateId(startIndex,maxResult,userId,typeName);
            if (list.getList().size()>0){
                for (int i = 0; i <list.getList().size(); i++) {
                    tf=list.getList().get(i);
                    jso=new JSONObject();
                    jso.put("id", tf.getId());
                    jso.put("fileName", tf.getFileName());
                    jso.put("sourceUrl", tf.getSourceUrl());
                    jso.put("templateJson", tf.getTemplateJson());
                    jso.put("uploadData",tf.getUploadData());
                    jso.put("typeName",tf.getTypeName());
                    jso.put("accountNumber",tf.getAccountNumber());
                    jso.put("startTime",tf.getStartTime());
                    jso.put("endTime",tf.getEndTime());
                    jso.put("coverUrl",tf.getCoverUrl());
                    jso.put("isEdit",tf.getIsEdit());
                    jso.put("collectionId", tf.getCollectionId());
                    if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                    	long date1 = sdf.parse(time).getTime();
                    	long date2 = sdf.parse(tf.getStartTime()).getTime();
                    	long date3 = sdf.parse(tf.getEndTime()).getTime();
                    	if (date1 >= date2 && date1 <= date3) {
                    	    jso.put("isOverdue", 1);
                    	} else {
                    	    jso.put("isOverdue", 2);
                    	}}
                    jsa.element(jso);
                }
            }
            @SuppressWarnings("unchecked")
			PageInfo<TemplateInfo>pageInfo=new PageInfo<>(jsa);
            pageInfo.setTotal(list.getTotal());
            pageInfo.setPages(list.getPages());
            pageInfo.setPageNum(list.getPageNum());
            pageInfo.setPageSize(list.getPageSize());
            pageInfo.setSize(list.getSize());
            pageInfo.setStartRow(list.getStartRow());
            pageInfo.setEndRow(list.getEndRow());
            msg.setData(pageInfo);
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
     * 多条件拼接查询
     * @param pageIndex
     * @param pageSize
     * @param materialType
     * @param typeName
     * @param sTime
     * @param eTime
     * @param categoryName
     * @param carModelName
     * @return
     */
    @GetMapping("selectVlookup")
    @ApiOperation(value = "多条件拼接查询")
    public StandardResult<PageInfo<TemplateInfo>> selectVlookup(String pageIndex,String pageSize,String materialType,String typeName,String sTime,String eTime,String categoryName,String carModelName,String userId,String videoTime){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotEmpty(pageSize))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotEmpty(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        String uId=null;
        String cId=null;
        try {
            PageInfo<TemplateInfo>list=templateInfoService.selectVlookup(startIndex,maxResult,materialType,typeName,sTime,eTime,categoryName,carModelName,videoTime);
            if (list.getList().size()>0){
                for (int i = 0; i <list.getList().size(); i++) {
                    tf=list.getList().get(i);
                    jso=new JSONObject();
                    jso.put("id", tf.getId());
                    jso.put("fileName", tf.getFileName());
                    jso.put("sourceUrl", tf.getSourceUrl());
                    jso.put("templateJson", tf.getTemplateJson());
                    jso.put("uploadData",tf.getUploadData());
                    jso.put("typeName",tf.getTypeName());
                    jso.put("accountNumber",tf.getAccountNumber());
                    jso.put("startTime",tf.getStartTime());
                    jso.put("endTime",tf.getEndTime());
                    jso.put("coverUrl",tf.getCoverUrl());
                    jso.put("isEdit",tf.getIsEdit());
                    if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                    	long date1 = sdf.parse(time).getTime();
                        long date2 = 0l;
                        if (StringUtils.isNotEmpty(tf.getStartTime())) {
                            date2 = sdf.parse(tf.getStartTime()).getTime();
                        }
                        long date3 = 0l;
                        if (StringUtils.isNotEmpty(tf.getEndTime())) {
                            date3 = sdf.parse(tf.getEndTime()).getTime();
                        }

                    	if (date1 >= date2 && date1 <= date3) {
                    	    jso.put("isOverdue", 1);
                    	} else {
                    	    jso.put("isOverdue", 2);
                    	}}
                    uId=templateInfoService.selectUserId(tf.getId());
                    if (uId.equals(userId)){
                        jso.put("isHomemade",0);
                    }else {
                        jso.put("isHomemade",1);
                    }
                    cId=templateInfoService.selectCollectId(userId, tf.getId());
                    if (StringUtils.isEmpty(cId)){
                        jso.put("isCollect",0);
                    }else {
                        jso.put("isCollect",1);
                    }
                    jsa.element(jso);
                }
            }
            @SuppressWarnings("unchecked")
			PageInfo<TemplateInfo>pageInfo=new PageInfo<>(jsa);
            pageInfo.setTotal(list.getTotal());
            pageInfo.setPages(list.getPages());
            pageInfo.setPageNum(list.getPageNum());
            pageInfo.setPageSize(list.getPageSize());
            pageInfo.setSize(list.getSize());
            pageInfo.setStartRow(list.getStartRow());
            pageInfo.setEndRow(list.getEndRow());
            msg.setData(pageInfo);
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
     * 多条件拼接查询根据上传时间排序
     * @param pageIndex
     * @param pageSize
     * @param materialType
     * @param typeName
     * @param sTime
     * @param eTime
     * @param categoryName
     * @param carModelName
     * @return
     */
    @GetMapping("selectVlookupByTime")
    @ApiOperation(value = "多条件拼接查询根据上传时间排序")
    public StandardResult<PageInfo<TemplateInfo>> selectVlookupByTime(String pageIndex,String pageSize,String fileName,String materialType,String typeName,String sTime,String eTime,String categoryName,String carModelName,String userId,String sort,String videoTime){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotEmpty(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotEmpty(pageIndex))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        JSONArray jsa = new JSONArray();
        JSONObject jso = null;
        TemplateInfo tf = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());
        String uId=null;
        String cId=null;
        try {
            if (StringUtils.isNotEmpty(sort) && sort.equals("0")) {
                PageInfo<TemplateInfo> list = templateInfoService.selectVlookupByTime(startIndex, maxResult, fileName, materialType, typeName, sTime, eTime, categoryName, carModelName,videoTime);
                if (list.getList().size() > 0) {
                    for (int i = 0; i < list.getList().size(); i++) {
                        tf = list.getList().get(i);
                        jso = new JSONObject();
                        jso.put("id", tf.getId());
                        jso.put("fileName", tf.getFileName());
                        jso.put("sourceUrl", tf.getSourceUrl());
                        jso.put("templateJson", tf.getTemplateJson());
                        jso.put("uploadData", tf.getUploadData());
                        jso.put("typeName", tf.getTypeName());
                        jso.put("accountNumber", tf.getAccountNumber());
                        jso.put("startTime", tf.getStartTime());
                        jso.put("endTime", tf.getEndTime());
                        jso.put("coverUrl",tf.getCoverUrl());
                        jso.put("isEdit",tf.getIsEdit());
                        if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                        	long date1 = sdf.parse(time).getTime();
                        	long date2 = sdf.parse(tf.getStartTime()).getTime();
                        	long date3 = sdf.parse(tf.getEndTime()).getTime();
                        	if (date1 >= date2 && date1 <= date3) {
                        	    jso.put("isOverdue", 1);
                        	} else {
                        	    jso.put("isOverdue", 2);
                        	}}
                        uId=templateInfoService.selectUserId(tf.getId());
                        if (uId.equals(userId)){
                            jso.put("isHomemade",0);
                        }else {
                            jso.put("isHomemade",1);
                        }
                        cId = templateInfoService.selectCollectId(userId, tf.getId());
                        if (StringUtils.isEmpty(cId)) {
                            jso.put("isCollect", 0);
                        } else {
                            jso.put("isCollect", 1);
                        }
                        jsa.element(jso);
                    }
                }
                @SuppressWarnings("unchecked")
                PageInfo<TemplateInfo> pageInfo = new PageInfo<>(jsa);
                pageInfo.setTotal(list.getTotal());
                pageInfo.setPages(list.getPages());
                pageInfo.setPageNum(list.getPageNum());
                pageInfo.setPageSize(list.getPageSize());
                pageInfo.setSize(list.getSize());
                pageInfo.setStartRow(list.getStartRow());
                pageInfo.setEndRow(list.getEndRow());
                msg.setData(pageInfo);
                msg.setMessage("success");
                msg.setStatus(BaseResultInterface.SUCCESS);
                return msg;
            }
            else {
                PageInfo<TemplateInfo> list = templateInfoService.selectVlookupByTimeDesc(startIndex, maxResult, fileName, materialType, typeName, sTime, eTime, categoryName, carModelName,videoTime);
                if (list.getList().size() > 0) {
                    for (int i = 0; i < list.getList().size(); i++) {
                        tf = list.getList().get(i);
                        jso = new JSONObject();
                        jso.put("id", tf.getId());
                        jso.put("fileName", tf.getFileName());
                        jso.put("sourceUrl", tf.getSourceUrl());
                        jso.put("templateJson", tf.getTemplateJson());
                        jso.put("uploadData", tf.getUploadData());
                        jso.put("typeName", tf.getTypeName());
                        jso.put("accountNumber", tf.getAccountNumber());
                        jso.put("startTime", tf.getStartTime());
                        jso.put("endTime", tf.getEndTime());
                        jso.put("coverUrl",tf.getCoverUrl());
                        jso.put("isEdit",tf.getIsEdit());
                        if ((tf.getMaterialType()==1||tf.getMaterialType()==2)&tf.getStartTime()!=null){
                        	long date1 = sdf.parse(time).getTime();
                        	long date2 = sdf.parse(tf.getStartTime()).getTime();
                        	long date3 = sdf.parse(tf.getEndTime()).getTime();
                        	if (date1 >= date2 && date1 <= date3) {
                        	    jso.put("isOverdue", 1);
                        	} else {
                        	    jso.put("isOverdue", 2);
                        	}}
                        uId=templateInfoService.selectUserId(tf.getId());
                        if (uId.equals(userId)){
                            jso.put("isHomemade",0);
                        }else {
                            jso.put("isHomemade",1);
                        }
                        cId = templateInfoService.selectCollectId(userId, tf.getId());
                        if (StringUtils.isEmpty(cId)) {
                            jso.put("isCollect", 0);
                        } else {
                            jso.put("isCollect", 1);
                        }
                        jsa.element(jso);
                    }
                }
                @SuppressWarnings("unchecked")
                PageInfo<TemplateInfo> pageInfo = new PageInfo<>(jsa);
                pageInfo.setTotal(list.getTotal());
                pageInfo.setPages(list.getPages());
                pageInfo.setPageNum(list.getPageNum());
                pageInfo.setPageSize(list.getPageSize());
                pageInfo.setSize(list.getSize());
                pageInfo.setStartRow(list.getStartRow());
                pageInfo.setEndRow(list.getEndRow());
                msg.setData(pageInfo);
                msg.setMessage("success");
                msg.setStatus(BaseResultInterface.SUCCESS);
                return msg;
            }
        }catch (Exception e){
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }
    /***
     * 收藏
     * @param templateId
     * @param userId
     * @return
     */
    @GetMapping("collectTemplate")
    @ApiOperation(value = "收藏")
    public StandardResult insertCollect(Integer templateId,String userId,String materialType){
        StandardResult msg = new StandardResult();
        try {
            if (materialType.equals("3")) {
                String uid = templateInfoService.selectUserId(templateId);
                if (uid.equals(userId)) {
                    msg.setData("自制素材，无需收藏");
                    msg.setMessage("success");
                    msg.setStatus(BaseResultInterface.SUCCESS);
                    return msg;
                } else {
                    return getStandardResult(templateId, uid, msg);
                }
            }else {
                return getStandardResult(templateId, userId, msg);
            }
        }catch (Exception e){
            e.printStackTrace();
            msg.setData("error");
            msg.setMessage("系统异常");
            msg.setStatus(BaseResultInterface.FAIL);
            return msg;
        }
    }

    private StandardResult getStandardResult(Integer templateId, String userId, StandardResult msg) {
        String s = templateInfoService.selectCollectId(userId, templateId);
        if (StringUtils.isNotEmpty(s)) {
            msg.setData("已收藏，请勿重复操作");
            msg.setMessage("success");
            msg.setStatus(BaseResultInterface.SUCCESS);
            return msg;
        }
        UserTemplateInfo UTI = new UserTemplateInfo();
        UTI.setUserId(userId);
        UTI.setTemplateId(templateId);
        UTI.setCreateData(new Date());
        templateInfoService.insertCollect(UTI);
        msg.setData("ok");
        msg.setMessage("success");
        msg.setStatus(BaseResultInterface.SUCCESS);
        return msg;
    }

    /***
     * 查询自身编辑
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @return
     */
    @GetMapping("selectInfoByIsEdit")
    @ApiOperation(value = "查询自身编辑")
    public StandardResult<PageInfo<UserWorksInfo>> selectInfoByIsEdit(String pageIndex,String pageSize,String userId,String typeName){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//        String time = sdf.format(new Date());
        try {
            @SuppressWarnings("unused")
			PageInfo<UserWorksInfo>list=templateInfoService.selectInfoByIsEdit(startIndex,maxResult,userId,typeName);
            msg.setData(templateInfoService.selectInfoByIsEdit(startIndex,maxResult,userId,typeName));
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
     * 超管删除素材
     * @param id
     * @return
     */
    @GetMapping("deleteMedia")
    @ApiOperation(value = "超管删除素材")
    public StandardResult deleteMedia(String id){
        StandardResult msg = new StandardResult();
        try {
            templateInfoService.deleteMedia(id);
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
}
