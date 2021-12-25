package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.UserTemplateInfo;
import com.shj.code.mapper.UserTemplateInfoMapper;
@Service
public class UserTemplateInfoService {

	@Autowired
	private UserTemplateInfoMapper userTemplateInfoMapper;
	
	public List<UserTemplateInfo> getUserList(String userId,String search){
		return userTemplateInfoMapper.getUserList(userId,search);
	}
}
