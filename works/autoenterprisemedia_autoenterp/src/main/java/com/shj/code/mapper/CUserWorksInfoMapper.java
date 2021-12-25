package com.shj.code.mapper;

import java.util.List;

import com.shj.code.entity.TemplateInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.shj.code.entity.UserWorksInfo;

@Mapper
public interface CUserWorksInfoMapper {
    //查询用户自制素材
    @Select("select * from user_works_info where typeName = '图片' and userId=#{userId} order by createData desc")
    public List<UserWorksInfo> selectInfoByTypeName(@Param("userId") String userId);
    //搜索
    @Select("select * from  user_works_info where fileName like concat('%',#{fileName},'%') and userId=#{userId} and typeName=#{typeName} ")
    public List<UserWorksInfo> selectInfoByFileName(@Param("fileName") String fileName,@Param("userId") String userId,@Param("typeName")String typeName);
    //时间排序
    @Select("select * from user_works_info where userId=#{userId} and typeName=#{typeName} order by createData")
    public List<UserWorksInfo> selectInfoByTime(@Param("userId") String userId,@Param("typeName") String typeName);

//    @Select("select isEdit from user_template_info uf left join template_info tf on uf.templateId=tf.id where uf.id=#{id}")
//    public String selectIsEditById(String id);


    @Delete("delete from user_template_info where id=#{id}")
    public void deleteTemplate(String id);

    @Select("SELECT uf.id,tf.fileName,tf.isEdit,tf.typeName,tf.accountNumber,tf.coverUrl,tf.startTime,tf.endTime,tf.uploadData,tf.accountNumber,tf.sourceUrl FROM user_template_info uf LEFT JOIN template_info tf on uf.templateId=tf.id where uf.userId=#{userId} and tf.typeName=#{typeName} and tf.fileName like concat('%',#{fileName},'%')")
    public List<TemplateInfo> selectTemplateByFileName(@Param("fileName")String fileName,@Param("userId")String userId,@Param("typeName")String typeName);

    @Select("select * from  user_works_info where fileName like concat('%',#{fileName},'%') and userId=#{userId} and typeName='图片'")
    public List<UserWorksInfo> selectPictureByFileName(@Param("fileName")String fileName,@Param("userId")String userId);
}
