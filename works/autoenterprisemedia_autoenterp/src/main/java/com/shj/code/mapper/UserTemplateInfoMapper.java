package com.shj.code.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.shj.code.entity.UserTemplateInfo;
@Mapper
public interface UserTemplateInfoMapper {
	public List<UserTemplateInfo> getUserList(@Param("userId")String userId,@Param("search")String search);
}
