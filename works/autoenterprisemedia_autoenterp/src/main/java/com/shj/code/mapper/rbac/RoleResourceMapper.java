package com.shj.code.mapper.rbac;

import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.entity.rbac.RoleResourceDO;
import com.shj.code.entity.rbac.RoleResourceSetDO;
import com.shj.code.util.TkMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface RoleResourceMapper extends TkMapper<RoleResourceDO> {
    @Select("<script>" +
            "SELECT r.* FROM sys_resource r " +
            "LEFT JOIN (select distinct(resource_id) as rid from sys_role_resource " +
            "WHERE role_id in " +
            "<foreach collection='roleId' index='index' item='item' open='(' separator=',' close=')'> " +
            "#{item} " +
            "</foreach>" +
            " and is_delete=0) t on t.rid=r.id" +
            " where r.type&lt;=1 and t.rid is not null" +
            "</script>")
    List<ResourceDO> getMenuByRoleIds(@Param("roleId") List<Long> roleId);


    @Select("SELECT r.*,t.role_id AS roleId,t.is_delete FROM `sys_resource` r " +
            "LEFT JOIN (SELECT * FROM `sys_role_resource` WHERE `role_id` =#{roleId} and is_delete=0) t on t.resource_id=r.`id` ORDER BY r.id ")
    List<RoleResourceSetDO> queryResourcesByRoleId(@Param("roleId") Long roleId);


    @Select("<script>" +
            "select s.id,s.name,s.type,s.url,s.code from sys_resource s " +
            "LEFT JOIN (select distinct(resource_id) as rid from sys_role_resource " +
            "WHERE role_id in " +
            "<foreach collection='roleId' index='index' item='item' open='(' separator=',' close=')'> " +
            "#{item} " +
            "</foreach>" +
            " and is_delete=0) t on t.rid=s.id " +
            "where s.parent_id=#{pid} and s.type=2 and t.rid is not null" +
            "</script>")
    List<ResourceDO> getMenuByPid(@Param("roleId") List<Long> roleId, @Param("pid") Long pid);

    @Select("<script>" +
            "SELECT r.* FROM sys_resource r " +
            "LEFT JOIN (select distinct(resource_id) as rid from sys_role_resource " +
            "WHERE role_id in " +
            "<foreach collection='roleId' index='index' item='item' open='(' separator=',' close=')'> " +
            "#{item} " +
            "</foreach>" +
            " and is_delete=0) t on t.rid=r.id" +
            " where r.type&lt;=1 and t.rid is not null" +
            "</script>")
    List<ResourceDO> getMenuByUserId(@Param("roleId") List<Long> roleId);
}