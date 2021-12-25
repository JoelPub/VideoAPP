package com.shj.code.service;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.UserShare;
import com.shj.code.mapper.UserShareMapper;
@Service
public class UserShareService {
	
	@Autowired
	private UserShareMapper userShareMapper;
	
	public void save(UserShare entity){
		userShareMapper.save(entity);
	}
	
	public List<UserShare> findById(String userId,String type){
		return userShareMapper.findById(userId,type);
	}
	
	public PageInfo<UserShare> getUserShareList(String userId,int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<UserShare> list = null;
		if(StringUtils.isNotBlank(search)){
			list = userShareMapper.getUserShareList(userId, search);
		}else{
			list = userShareMapper.getUserShareLists(userId);
		}
		PageInfo<UserShare> page = new PageInfo<>(list);
		return page;
	}
	
	public PageInfo<UserShare> getUserVideoShareList(String userId,int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<UserShare> list = null;
		if(StringUtils.isNotBlank(search)){
			list = userShareMapper.getUserVideoShareList(userId, search);
		}else{
			list = userShareMapper.getUserVideoShareLists(userId);
		}
		PageInfo<UserShare> page = new PageInfo<>(list);
		return page;
	}
}
