package com.shj.code.mapper.rbac;

import com.shj.code.entity.rbac.AccountRoleDO;
import com.shj.code.entity.rbac.AccountRoleSetDO;
import com.shj.code.util.TkMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AccountRoleMapper extends TkMapper<AccountRoleDO> {

    @Select("SELECT r.id,r.name,t.account_id as accountId FROM `sys_role` r " +
            "LEFT JOIN (SELECT * FROM `sys_account_role` WHERE `account_id` =#{accountId} and is_delete=0) t on t.role_id=r.`id` where r.channel_id=#{channelId} and r.is_delete=0 ORDER BY r.id ")
//    @Result(column = "parent_id", property = "parentId")
    List<AccountRoleSetDO> selectRolesByAccountId(@Param("accountId") Long accountId, @Param("channelId") Long channelId);
}