package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorProvince;

@Mapper
public interface DistributorProvinceMapper {
	
	public List<DistributorProvince> getList(String smallId);

}
