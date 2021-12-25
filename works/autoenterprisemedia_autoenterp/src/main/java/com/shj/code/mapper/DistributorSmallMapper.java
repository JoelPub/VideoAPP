package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorSmall;

@Mapper
public interface DistributorSmallMapper {
	
	public List<DistributorSmall> getList(String mainId);

}
