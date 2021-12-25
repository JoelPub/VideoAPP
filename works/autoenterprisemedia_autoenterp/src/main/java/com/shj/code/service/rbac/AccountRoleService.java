package com.shj.code.service.rbac;

import com.shj.code.entity.rbac.AccountRoleDO;
import com.shj.code.entity.rbac.AccountRoleSetDO;
import com.shj.code.service.TkService;

import java.util.List;

public interface AccountRoleService extends TkService<AccountRoleDO> {
    List<AccountRoleDO> getRolesByAccount(Long accountId);

    public void updateAccountRole(Long accountId, List<Long> roleIdList);

    public List<AccountRoleSetDO> selectRolesByAccountId(Long accountId, Long channelId);

    public List<AccountRoleDO> selectByAccount(Long accountId);


}