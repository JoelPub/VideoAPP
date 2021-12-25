package com.shj.code.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.DistributorCode;

@Mapper
public interface DistributorCodeMapper {
	
	public List<DistributorCode> getList();

}
