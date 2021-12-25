package com.shj.code.service.rbac;

import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.entity.rbac.RoleResourceSetDO;
import com.shj.code.service.TkService;

import java.util.List;

public interface ResourceService extends TkService<ResourceDO> {
    List<ResourceDO> getResourceByAccount(Long accountId);

    List<ResourceDO> getAllMenus();

    public List<RoleResourceSetDO> queryResourcesByRoleId(Long roleId);

    public void updateRoleResource(Long roleId, List<Long> resourceIdList);

    public List<ResourceDO> getMenuByRoleId(List<Long> roleId);

    public List<ResourceDO> getRoleResourceByPage(List<Long> roleId, String pageCode);

}