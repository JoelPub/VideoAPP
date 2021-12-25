package com.shj.code.mapper.rbac;

import com.alibaba.fastjson.JSONObject;
import com.shj.code.entity.rbac.AccountDO;
import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.session.UserToken;
import com.shj.code.util.TkMapper;
import org.apache.ibatis.annotations.*;

public interface AccountMapper extends TkMapper<AccountDO> {
    JSONObject checkUser(@Param("username") String username, @Param("password") String password);

    @Select("<script>" +
            " SELECT a.id as userId,a.name,a.admin,a.channel_id as channelId " +
            // " re.code" +
            " FROM sys_account a" +
            // " LEFT JOIN sys_account_role ar on a.id = ar.account_id" +
            // " LEFT JOIN sys_role_resource rr ON ar.role_id = rr.role_id" +
            // " LEFT JOIN sys_resource re ON rr.resource_id = re.id AND rr.is_delete = 0" +
            " WHERE a.id = ${userId} AND a.is_delete = 0" +
            "</script>")

        // @Results({
        //         @Result(column="code", property="codeList",many = @Many(select = "getAllMenu"))
        // })
    UserToken getUserInfo(@Param("userId") Long userId);

    @Select("select * from sys_resource " +
            "<when test='$channelId'>" +
            "" +
            "")
    ResourceDO getMenu(@Param("channelId") Long channelId, @Param("type") Integer type);
}