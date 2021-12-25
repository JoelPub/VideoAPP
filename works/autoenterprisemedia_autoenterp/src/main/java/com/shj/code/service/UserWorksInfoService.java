package com.shj.code.service;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shj.code.entity.UserWorksInfo;
import com.shj.code.mapper.UserWorksInfoMapper;
@Service
public class UserWorksInfoService {

	@Autowired
	private UserWorksInfoMapper userWorksInfoMapper;
	
	public void save(UserWorksInfo entity){
		userWorksInfoMapper.save(entity);
	}
	
	public void update(UserWorksInfo entity){
		userWorksInfoMapper.update(entity);
	}
	
	public UserWorksInfo findById(String id){
		return userWorksInfoMapper.findById(id);
	}
	
	public PageInfo<UserWorksInfo> getPictureList(String userId,int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<UserWorksInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = userWorksInfoMapper.getPictureList(userId, search);
		}else{
			list = userWorksInfoMapper.getPictureLists(userId);
		}
		PageInfo<UserWorksInfo> page = new PageInfo<>(list);
		return page;
	}
	
	public PageInfo<UserWorksInfo> getVideoList(String userId,int startIndex,int maxResults,String search){
		PageHelper.startPage(startIndex, maxResults);
		List<UserWorksInfo> list = null;
		if(StringUtils.isNotBlank(search)){
			list = userWorksInfoMapper.getVideoList(userId, search);
		}else{
			list = userWorksInfoMapper.getVideoLists(userId);
		}
		PageInfo<UserWorksInfo> page = new PageInfo<>(list);
		return page;
	}
	
	public List<UserWorksInfo> getAudioList(String userId){
		return userWorksInfoMapper.getAudioList(userId);
	}
	
	public void delete(String id){
		userWorksInfoMapper.delete(id);
	}
	
	public UserWorksInfo findFileNames(String fileName,String userId,String typeName){
		return userWorksInfoMapper.findFileNames(fileName,userId,typeName);
	}
	
	public void updateFileName(UserWorksInfo entity){
		userWorksInfoMapper.updateFileName(entity);
	}
}
