package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorMain;

@Mapper
public interface DistributorMainMapper {
	
	public List<DistributorMain> getList();

}
