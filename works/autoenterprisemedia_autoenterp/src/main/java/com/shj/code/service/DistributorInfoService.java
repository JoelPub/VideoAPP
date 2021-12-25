package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorInfo;
import com.shj.code.mapper.DistributorInfoMapper;
@Service
public class DistributorInfoService {
	
	@Autowired
	private DistributorInfoMapper distributorInfoMapper;
	
	public List<DistributorInfo> getList(String cityId){
		return  distributorInfoMapper.getList(cityId);
	}
	
	public void save(DistributorInfo entity){
		distributorInfoMapper.save(entity);
	}
	
	public DistributorInfo findCode(String code){
		return distributorInfoMapper.findCode(code);
	}
}
