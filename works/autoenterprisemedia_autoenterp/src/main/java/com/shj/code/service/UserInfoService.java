package com.shj.code.service;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.UserInfo;
import com.shj.code.mapper.UserInfoMapper;
@Service
public class UserInfoService {
	
	@Autowired
	private UserInfoMapper userInfoMapper;
	
	public void saveUser(UserInfo uf){
		userInfoMapper.save(uf);
	}
	
	public UserInfo findById(String id){
		return userInfoMapper.findById(id);
	}
	
	public void updateUser(UserInfo uf){
		userInfoMapper.update(uf);
	}
	
	public PageInfo<UserInfo> getUserList(int startIndex,int maxResults){
		PageHelper.startPage(startIndex, maxResults);
		List<UserInfo> list = userInfoMapper.getUserList();
		PageInfo<UserInfo> page = new PageInfo<>(list);
		return page;
	}
	
	public UserInfo regin(String disCode,String position){
		return userInfoMapper.regin(disCode,position);
	}
	
	public UserInfo logins(String accountNumber,String passWord){
		return userInfoMapper.login(accountNumber, passWord);
	}
	
	public Integer getUserCount(String disCode){
		return userInfoMapper.getUserCount(disCode);
	}
	
	public PageInfo<UserInfo> getUserInfoList(int startIndex,int maxResults,String search){
		List<UserInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = userInfoMapper.getUserInfoList(search);
			PageHelper.startPage(startIndex, maxResults);
		}else{
			PageHelper.startPage(startIndex, maxResults);
			list = userInfoMapper.getUserInfoLists();
		}
		PageInfo<UserInfo> page = new PageInfo<>(list);
		return page;
	}
	
	public Integer getUserCountInfo(){
		return userInfoMapper.getUserCountInfo();
	}
	
	public UserInfo findByAccoutCode(String accountNumber){
		return userInfoMapper.findByAccoutCode(accountNumber);
	}
	
	public List<UserInfo> getUserListLogin(String accountNumber,String passWord){
		return userInfoMapper.getUserListLogin(accountNumber, passWord);
	}
}
