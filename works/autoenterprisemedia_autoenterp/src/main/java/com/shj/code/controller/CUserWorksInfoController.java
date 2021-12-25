package com.shj.code.controller;

import java.util.HashMap;
import java.util.Map;

import com.shj.code.entity.UserWorksInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.shj.code.service.CUserWorksInfoService;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;

@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-用户作品",tags = "后台管理-用户作品")
public class CUserWorksInfoController {
   

    @Autowired
    private CUserWorksInfoService userWorksInfoService;

    /***
     * 个人中心自制素材
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @return
     */
    @GetMapping("selectUserWorksInfo")
    @ApiOperation(value = "个人中心自制素材")
    public StandardResult<PageInfo<UserWorksInfo>> selectWorksInfo(String pageIndex, String pageSize, String userId){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        try {
            msg.setData(userWorksInfoService.selectWorksInfo(startIndex,maxResult,userId));
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
     * 文件名搜索素材
     * @param pageIndex
     * @param pageSize
     * @param fileName
     * @param userId
     * @return
     */
    @SuppressWarnings("rawtypes")
	@GetMapping("searchUserTemplate")
    @ApiOperation(value = "文件名搜索素材")
    public StandardResult<Map<String,PageInfo>> selectInfoByFileName(String pageIndex,String pageSize,String fileName,String userId,String typeName){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        Map<String,PageInfo>map=new HashMap<>();
            try {
                map.put("historyEdit",userWorksInfoService.selectInfoByFileName(startIndex, maxResult, fileName, userId, typeName));
                map.put("historyCollect",userWorksInfoService.selectTemplateByFileName(startIndex, maxResult, fileName, userId, typeName));
                map.put("historyMedia",userWorksInfoService.selectPictureByFileName(startIndex, maxResult, fileName, userId));
                msg.setData(map);
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
     * 自制素材根据创建时间排序
     * @param pageIndex
     * @param pageSize
     * @param userId
     * @return
     */
    @GetMapping("timeSort")
    @ApiOperation(value = "自制素材根据创建时间排序")
    public StandardResult<PageInfo<UserWorksInfo>> selectInfoByTime(String pageIndex,String pageSize,String userId,String typeName){
        int startIndex=1,maxResult=10;
        if (StringUtils.isNotBlank(pageIndex))startIndex=Integer.valueOf(pageIndex);
        if (StringUtils.isNotBlank(pageSize))maxResult=Integer.valueOf(pageSize);
        StandardResult msg = new StandardResult();
        try {
            msg.setData(userWorksInfoService.selectInfoByTime(startIndex,maxResult,userId,typeName));
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
     * 删除自制素材
     * @param id
     * @return
     */
    @GetMapping("deleteTemplate")
    @ApiOperation(value = "删除自制素材")
    public StandardResult deleteTemplate(String id){
        StandardResult msg = new StandardResult();
        try {
            userWorksInfoService.deleteTemplate(id);
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
