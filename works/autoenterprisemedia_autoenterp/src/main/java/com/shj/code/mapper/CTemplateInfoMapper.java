package com.shj.code.mapper;

import com.shj.code.entity.TemplateInfo;
import com.shj.code.entity.UserTemplateInfo;
import com.shj.code.entity.UserWorksInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CTemplateInfoMapper {

    //时间排序
    @Select("SELECT tf.materialType,tf.id,tf.isEdit,tf.fileName,tf.typeName,tf.accountNumber,tf.coverUrl,tf.startTime,tf.endTime,tf.uploadData,tf.accountNumber,tf.sourceUrl FROM user_template_info uf LEFT JOIN template_info tf on uf.templateId=tf.id where uf.userId=#{userId} and tf.typeName=#{typeName} order by tf.createData desc")
    public List<TemplateInfo> selectTemplateInfoByTime(@Param("userId") String userId,@Param("typeName") String typeName);
    @Select("SELECT * FROM user_works_info where userId=#{userId} and typeName=#{typeName} order by createData desc")
    public List<UserWorksInfo>selectWorksInfoByTime(@Param("userId") String userId,@Param("typeName") String typeName);
//模糊搜索
    //@Select("select * from template_info  where fileName like concat('%',#{fileName},'%') and materialType=#{materialType} AND typeName=#{typeName}")
    public List<TemplateInfo> selectTemplateInfoByFileName(@Param("fileName") String fileName, @Param("materialType")String materialType,@Param("typeName")String typeName,
                                                           @Param("sTime")String sTime,@Param("eTime")String eTime,@Param("categoryName")String categoryName,@Param("userId") String userId,@Param("carModelName")String carModelName,@Param("videoTime")String videoTime);
//查询收藏
    @Select("SELECT tf.materialType,tf.id,tf.isEdit,tf.fileName,tf.typeName,tf.accountNumber,tf.coverUrl,tf.startTime,tf.endTime,tf.uploadData,tf.accountNumber,tf.sourceUrl,uf.id AS collectionId FROM user_template_info uf LEFT JOIN template_info tf on uf.templateId=tf.id where uf.userId=#{userId} and tf.typeName=#{typeName} order by tf.createData")
    public List<TemplateInfo>selectInfoByTemplateId(@Param("userId") String userId,@Param("typeName") String typeName);//
//增加收藏
    @Insert("insert into user_template_info(templateId,userId,createData) values(#{templateId},#{userId},#{createData})")
    public void insertCollect(UserTemplateInfo info);
    //查询用户id
    @Select("select userId from template_info where id=#{templateId}")
    public String selectUserId(Integer templateId);
    //查询编辑
    @Select("select * from user_works_info WHERE userId=#{userId} and typeName=#{typeName} order by createData")
    public List<UserWorksInfo>selectInfoByIsEdit(@Param("userId") String userId,@Param("typeName")String typeName);
//查询 多条件
    public List<TemplateInfo>selectVlookup(@Param("materialType")String materialType,@Param("typeName")String typeName,
                                           @Param("sTime")String sTime,@Param("eTime")String eTime,@Param("categoryName")String categoryName
                                           ,@Param("carModelName")String carModelName,@Param("videoTime")String videoTime);
    public List<TemplateInfo>selectVlookupByTime(@Param("fileName")String fileName,@Param("materialType")String materialType,@Param("typeName")String typeName,
                                           @Param("sTime")String sTime,@Param("eTime")String eTime,@Param("categoryName")String categoryName
            ,@Param("carModelName")String carModelName,@Param("videoTime")String videoTime);
    public List<TemplateInfo>selectVlookupByTimeDesc(@Param("fileName")String fileName,@Param("materialType")String materialType,@Param("typeName")String typeName,
                                                 @Param("sTime")String sTime,@Param("eTime")String eTime,@Param("categoryName")String categoryName
            ,@Param("carModelName")String carModelName,@Param("videoTime")String videoTime);
//查询收藏id
    @Select("SELECT id FROM user_template_info WHERE templateId=#{templateId} AND userId=#{userId}")
    public List<String> selectCollectId(@Param("userId") String userId,@Param("templateId")Integer templateId);
//超管删除素材
    @Delete("delete from template_info where id=#{id}")
    public void deleteMedia(@Param("id") String id);
}
