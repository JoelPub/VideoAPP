package com.shj.code.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.shj.code.entity.ChartInfo;
@Mapper
public interface ChartInfoMapper {
	
	public List<ChartInfo> getList();

}
