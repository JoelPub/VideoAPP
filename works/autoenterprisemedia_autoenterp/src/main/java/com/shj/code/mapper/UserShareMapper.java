package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shj.code.entity.UserShare;

@Mapper
public interface UserShareMapper {

	public void save(UserShare entity);
	
	public List<UserShare> findById(@Param("userId")String userId,@Param("type")String type);
	
	public List<UserShare> getUserShareList(@Param("userId")String userId,@Param("search")String search);
	
	public List<UserShare> getUserShareLists(@Param("userId")String userId);
	
	public List<UserShare> getUserVideoShareList(@Param("userId")String userId,@Param("search")String search);
	
	public List<UserShare> getUserVideoShareLists(@Param("userId")String userId);
}
