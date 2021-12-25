package com.shj.code.service.rbac;

import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.entity.rbac.RoleResourceDO;
import com.shj.code.service.TkService;

import java.util.List;

public interface RoleResourceService extends TkService<RoleResourceDO> {
    List<ResourceDO> getMenuByRoleIds(List<Long> roleId);



}