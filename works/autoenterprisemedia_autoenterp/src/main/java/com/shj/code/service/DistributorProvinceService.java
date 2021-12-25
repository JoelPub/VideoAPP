package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorProvince;
import com.shj.code.mapper.DistributorProvinceMapper;
@Service
public class DistributorProvinceService {
	
	@Autowired
	private DistributorProvinceMapper distributorProvinceMapper;
	
	public List<DistributorProvince> getList(String smallId){
		return  distributorProvinceMapper.getList(smallId);
	}
}
