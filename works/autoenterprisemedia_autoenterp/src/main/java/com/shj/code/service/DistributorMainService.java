package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorMain;
import com.shj.code.mapper.DistributorMainMapper;
@Service
public class DistributorMainService {
	
	@Autowired
	private DistributorMainMapper distributorMainMapper;
	
	public List<DistributorMain> getList(){
		return distributorMainMapper.getList();
	}
}
