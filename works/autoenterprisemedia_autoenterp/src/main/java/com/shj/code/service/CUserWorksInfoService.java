package com.shj.code.service;
import java.util.List;

import com.shj.code.entity.TemplateInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.mapper.CUserWorksInfoMapper;
@Service
public class CUserWorksInfoService {
    @Autowired
    private CUserWorksInfoMapper userWorksInfoMapper;

    public PageInfo<UserWorksInfo>selectWorksInfo(int startIndex,int maxResult,String userId){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo>list=userWorksInfoMapper.selectInfoByTypeName(userId);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public PageInfo<UserWorksInfo>selectInfoByFileName(int startIndex,int maxResult,String fileName,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo>list=userWorksInfoMapper.selectInfoByFileName(fileName,userId,typeName);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public PageInfo<TemplateInfo>selectTemplateByFileName(int startIndex,int maxResult,String fileName,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<TemplateInfo>list=userWorksInfoMapper.selectTemplateByFileName(fileName,userId,typeName);
        PageInfo<TemplateInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public PageInfo<UserWorksInfo>selectPictureByFileName(int startIndex,int maxResult,String fileName,String userId){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo>list=userWorksInfoMapper.selectPictureByFileName(fileName,userId);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }



    public PageInfo<UserWorksInfo>selectInfoByTime(int startIndex,int maxResult,String userId,String typeName){
        PageHelper.startPage(startIndex,maxResult);
        List<UserWorksInfo>list=userWorksInfoMapper.selectInfoByTime(userId,typeName);
        PageInfo<UserWorksInfo>pageInfo=new PageInfo<>(list);
        return pageInfo;
    }

    public void deleteTemplate(String id){
        userWorksInfoMapper.deleteTemplate(id);
    }



}
