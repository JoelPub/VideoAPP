package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorCity;
import com.shj.code.mapper.DistributorCityMapper;
@Service
public class DistributorCityService {
	
	@Autowired
	private DistributorCityMapper distributorCityMapper;

	public List<DistributorCity> getList(String provinceId){
		return distributorCityMapper.getList(provinceId);
	}
}
