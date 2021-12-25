package com.shj.code.service;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.TemplateInfo;
import com.shj.code.mapper.TemplateInfoMapper;
@Service
public class TemplateInfoService {
	
	@Autowired
	private TemplateInfoMapper templateInfoMapper;
	
	public void save(TemplateInfo entity){
		templateInfoMapper.save(entity);
	}
	
	public void update(TemplateInfo entity){
		templateInfoMapper.update(entity);
	}
	
	public TemplateInfo findById(String id){
		return templateInfoMapper.findById(id);
	}
	
	//总部海报
	public PageInfo<TemplateInfo> getPosterList(int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<TemplateInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = templateInfoMapper.getPosterList(search);
		}else{
			list = templateInfoMapper.getPosterListed();
		}
		PageInfo<TemplateInfo> page = new PageInfo<>(list);
		return page;
	}
	
	//总部KV
	public PageInfo<TemplateInfo> getPosterListKV(int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<TemplateInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = templateInfoMapper.getPosterListKV(search);
		}else{
			list = templateInfoMapper.getPosterListedKV();
		}
		PageInfo<TemplateInfo> page = new PageInfo<>(list);
		return page;
	}
	
	//总部视频
	public PageInfo<TemplateInfo> getPosterVideoList(int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<TemplateInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = templateInfoMapper.getPosterVideoList(search);
		}else{
			list = templateInfoMapper.getPosterVideoListed();
		}
		PageInfo<TemplateInfo> page = new PageInfo<>(list);
		return page;
	}
	
	//区域视频
	public PageInfo<TemplateInfo> getDisVideoList(int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<TemplateInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = templateInfoMapper.getDisVideoList(search);
		}else{
			list = templateInfoMapper.getDisVideoListed();
		}
		PageInfo<TemplateInfo> page = new PageInfo<>(list);
		return page;
	}
	
	public TemplateInfo findFileName(String fileName,String typeName,String userId){
		return templateInfoMapper.findFileName(fileName, typeName, userId);
	}
	
	public void updateFileName(TemplateInfo entity){
		templateInfoMapper.updateFileName(entity);
	}
	
	public TemplateInfo findUserWork(String userWorkId){
		return templateInfoMapper.findUserWork(userWorkId);
	}
	
}
