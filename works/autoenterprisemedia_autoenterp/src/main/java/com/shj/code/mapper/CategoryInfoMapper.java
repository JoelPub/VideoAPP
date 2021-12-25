package com.shj.code.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.shj.code.entity.CategoryInfo;
@Mapper
public interface CategoryInfoMapper {

	public List<CategoryInfo> getList(String typeName);
	
}
