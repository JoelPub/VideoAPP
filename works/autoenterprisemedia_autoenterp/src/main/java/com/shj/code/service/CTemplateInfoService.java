package com.shj.code.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserTemplateInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.mapper.CTemplateInfoMapper;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CTemplateInfoService {
    @Autowired
    private CTemplateInfoMapper templateInfoMapper;


    public PageInfo<TemplateInfo> selectTemplateInfoByTime(int startIndex,int maxResult,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo> list=templateInfoMapper.selectTemplateInfoByTime(userId,typeName);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    public PageInfo<UserWorksInfo> selectWorksInfoByTime(int startIndex,int maxResult,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo> list=templateInfoMapper.selectWorksInfoByTime(userId,typeName);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    public PageInfo<TemplateInfo>selectTemplateInfoByFileName(int startIndex,int maxResult,String fileName,String materialType,String typeName,String sTime,String eTime,String categoryName,String userId,String carModelName,String videoTime){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo> list=templateInfoMapper.selectTemplateInfoByFileName(fileName,materialType,typeName,sTime,eTime,categoryName,userId,carModelName,videoTime);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    public PageInfo<TemplateInfo>selectInfoByTemplateId(int startIndex,int maxResult,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo> list=templateInfoMapper.selectInfoByTemplateId(userId,typeName);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    //收藏
    public void insertCollect(UserTemplateInfo info){
        templateInfoMapper.insertCollect(info);
    }

    public String selectUserId(Integer templateId){
        String uid=templateInfoMapper.selectUserId(templateId);
    return uid;}
    //查询个人编辑
    public PageInfo<UserWorksInfo>selectInfoByIsEdit(int startIndex,int maxResult,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo>list=templateInfoMapper.selectInfoByIsEdit(userId,typeName);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    public PageInfo<TemplateInfo>selectVlookup(int startIndex,int maxResult,String materialType,String typeName,String sTime,String eTime,String categoryName,String carModelName,String videoTime){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo>list=templateInfoMapper.selectVlookup(materialType,typeName,sTime,eTime,categoryName,carModelName,videoTime);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public PageInfo<TemplateInfo>selectVlookupByTime(int startIndex,int maxResult,String fileName,String materialType,String typeName,String sTime,String eTime,String categoryName,String carModelName,String videoTime){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo>list=templateInfoMapper.selectVlookupByTime(fileName,materialType,typeName,sTime,eTime,categoryName,carModelName,videoTime);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }
    public PageInfo<TemplateInfo>selectVlookupByTimeDesc(int startIndex,int maxResult,String fileName,String materialType,String typeName,String sTime,String eTime,String categoryName,String carModelName,String videoTime){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo>list=templateInfoMapper.selectVlookupByTimeDesc(fileName,materialType,typeName,sTime,eTime,categoryName,carModelName,videoTime);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public String selectCollectId(String userId,Integer templateId){
        List<String> CIds=templateInfoMapper.selectCollectId(userId,templateId);
        if (CollectionUtils.isNotEmpty(CIds)) {
            return CIds.get(0);
        }
        return null;
    }

    public void deleteMedia(String id) {
        templateInfoMapper.deleteMedia(id);
    }
}
