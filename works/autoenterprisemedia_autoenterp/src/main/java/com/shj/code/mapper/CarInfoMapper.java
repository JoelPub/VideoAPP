package com.shj.code.mapper;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.shj.code.entity.CarInfo;
@Mapper
public interface CarInfoMapper {

	public List<CarInfo> getList();
	
}
