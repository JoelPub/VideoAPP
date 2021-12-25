package com.shj.code.service.rbac.impl;

import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.entity.rbac.RoleResourceDO;
import com.shj.code.mapper.rbac.RoleResourceMapper;
import com.shj.code.service.TkServiceImpl;
import com.shj.code.service.rbac.RoleResourceService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;

@Service
public class RoleResourceServiceImpl extends TkServiceImpl<RoleResourceMapper, RoleResourceDO> implements RoleResourceService {


    @Override
    public List<ResourceDO> getMenuByRoleIds(List<Long> roleId) {
        if (CollectionUtils.isEmpty(roleId)){
            return Collections.emptyList();
        }
        return getMapper().getMenuByRoleIds(roleId);
    }



}
