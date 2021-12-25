package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorSmall;
import com.shj.code.mapper.DistributorSmallMapper;
@Service
public class DistributorSmallService {
	
	@Autowired
	private DistributorSmallMapper distributorSmallMapper;
	
	public List<DistributorSmall> getList(String mainId){
		return distributorSmallMapper.getList(mainId);
	}
}
