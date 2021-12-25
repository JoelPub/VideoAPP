package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorCity;

@Mapper
public interface DistributorCityMapper {
	
	public List<DistributorCity> getList(String provinceId);

}
