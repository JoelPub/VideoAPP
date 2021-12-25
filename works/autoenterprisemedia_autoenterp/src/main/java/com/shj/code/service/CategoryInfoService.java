package com.shj.code.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shj.code.entity.CategoryInfo;
import com.shj.code.mapper.CategoryInfoMapper;
@Service
public class CategoryInfoService {

	@Autowired
	private CategoryInfoMapper categoryInfoMapper;
	
	public List<CategoryInfo> getList(String typeName){
		return categoryInfoMapper.getList(typeName);
	}
}
