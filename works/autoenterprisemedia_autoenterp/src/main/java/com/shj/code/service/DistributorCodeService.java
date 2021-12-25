package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.DistributorCode;
import com.shj.code.mapper.DistributorCodeMapper;
@Service
public class DistributorCodeService {
	
	@Autowired
	private DistributorCodeMapper distributorCodeMapper;
	
	public List<DistributorCode> getList(){
		return distributorCodeMapper.getList();
	}

}
