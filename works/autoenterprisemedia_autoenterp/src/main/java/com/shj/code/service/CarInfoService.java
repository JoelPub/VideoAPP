package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.CarInfo;
import com.shj.code.mapper.CarInfoMapper;
@Service
public class CarInfoService {

	@Autowired
	private CarInfoMapper carInfoMapper;
	
	public List<CarInfo> getList(){
		return carInfoMapper.getList();
	}
}
