package com.shj.code.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shj.code.entity.TemplateInfo;
@Mapper
public interface TemplateInfoMapper {
	
	public void save(TemplateInfo entity);
	
	public void update(TemplateInfo entity);
	
	public TemplateInfo findById(String id);
	
	public List<TemplateInfo> getPosterList(@Param("search")String search);
	
	public List<TemplateInfo> getPosterListed();
	
	public List<TemplateInfo> getPosterListKV(@Param("search")String search);
	
	public List<TemplateInfo> getPosterListedKV();
	
	public List<TemplateInfo> getVideoListsed();
	
	public TemplateInfo findFileName(@Param("fileName")String fileName,@Param("typeName")String typeName,@Param("userId")String userId);
	
	public void updateFileName(TemplateInfo entity);
	
	public TemplateInfo findUserWork(String userWorkId);
	
	//总部视频
	public List<TemplateInfo> getPosterVideoList(@Param("search")String search);
	public List<TemplateInfo> getPosterVideoListed();
	
	//区域视频
	public List<TemplateInfo> getDisVideoList(@Param("search")String search);
	public List<TemplateInfo> getDisVideoListed();
}
