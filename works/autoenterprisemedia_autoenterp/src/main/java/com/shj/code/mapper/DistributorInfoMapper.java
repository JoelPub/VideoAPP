package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorInfo;

@Mapper
public interface DistributorInfoMapper {
	
	public  List<DistributorInfo> getList(String cityId);
	
	public void save(DistributorInfo entity);

	public DistributorInfo findCode(String code);
}
