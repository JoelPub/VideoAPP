package com.shj.code.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shj.code.entity.UserWorksInfo;
@Mapper
public interface UserWorksInfoMapper {

	public void save(UserWorksInfo entity);
	
	public void update(UserWorksInfo entity);
	
	public UserWorksInfo findById(String id);
	
	public List<UserWorksInfo> getPictureList(@Param("userId")String userId,@Param("search")String search);
	
	public List<UserWorksInfo> getPictureLists(String userId);
	
	public List<UserWorksInfo> getVideoList(@Param("userId")String userId,@Param("search")String search);
	
	public List<UserWorksInfo> getVideoLists(String userId);
	
	public List<UserWorksInfo> getAudioList(String userId);
	
	public void delete(String id);
	
	public UserWorksInfo findFileNames(@Param("fileName")String fileName,@Param("userId")String userId,@Param("typeName")String typeName);
	
	public void updateFileName(UserWorksInfo entity);
}
