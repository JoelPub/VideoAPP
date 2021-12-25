package com.shj.code.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shj.code.entity.ChartInfo;
import com.shj.code.mapper.ChartInfoMapper;
@Service
public class ChartInfoService {
	
	@Autowired
	private ChartInfoMapper chartInfoMapper;
	
	public List<ChartInfo> getList(){
		return chartInfoMapper.getList();
		
	}
}
