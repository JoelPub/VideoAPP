package com.shj.code.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shj.code.entity.UserInfo;
@Mapper
public interface UserInfoMapper {
	
	void save(UserInfo entity);
	
	void update(UserInfo entity);
	
	UserInfo findById(String id);

	public List<UserInfo> getUserList();
	
	public UserInfo regin(@Param("disCode") String disCode,@Param("position")String position);
	
	public UserInfo login(@Param("accountNumber") String accountNumber,@Param("passWord") String passWord);
	
	public Integer getUserCount(@Param("disCode")String disCode);
	
	public List<UserInfo> getUserInfoLists();
	
	public List<UserInfo> getUserInfoList(@Param("search")String search);
	
	public Integer getUserCountInfo();
	
	public UserInfo findByAccoutCode(String accountNumber);
	
	public List<UserInfo> getUserListLogin(@Param("accountNumber")String accountNumber,@Param("passWord")String passWord);
	
}
