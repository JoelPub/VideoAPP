package com.shj.code.mapper;

import com.shj.code.entity.Disclaimer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/***
 * @author Cdl
 * @date 2021/4/25 17:11
 * @describe: TODO
 */
@Mapper
public interface DisclaimerMapper {
    @Insert("insert into disclaimer(userId,createData) values(#{userId},#{createData})")
    public void saveDisclaimer(Disclaimer disclaimer);
    @Select("select * from disclaimer where userId=#{userId}")
    public Disclaimer selectDisclaimer(String userId);
}
