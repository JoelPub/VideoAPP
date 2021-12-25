package com.shj.code.service.rbac.impl;

import com.shj.code.entity.rbac.*;
import com.shj.code.mapper.rbac.ResourceMapper;
import com.shj.code.mapper.rbac.RoleResourceMapper;
import com.shj.code.service.TkServiceImpl;
import com.shj.code.service.rbac.AccountRoleService;
import com.shj.code.service.rbac.AccountService;
import com.shj.code.service.rbac.ResourceService;
import com.shj.code.service.rbac.RoleResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceServiceImpl extends TkServiceImpl<ResourceMapper, ResourceDO> implements ResourceService {
    @Autowired
    AccountService accountService;

    @Autowired
    private AccountRoleService accountRoleService;

    @Autowired
    private RoleResourceService roleResourceService;

    @Autowired
    private RoleResourceMapper roleResourceMapper;


    @Override
    public List<ResourceDO> getResourceByAccount(Long accountId) {
        List<ResourceDO> resources = null;
        AccountDO account = accountService.selectById(accountId);
        if (account.getAdmin() == 1) {
            resources = getAllMenus();
        } else {
            List<AccountRoleDO> roles = accountRoleService.getRolesByAccount(accountId);
            List<Long> roleIds = roles.stream().map(AccountRoleDO::getRoleId).collect(Collectors.toList());
            resources = roleResourceService.getMenuByRoleIds(roleIds);
        }

        return resources;
    }

    @Override
    public List<ResourceDO> getAllMenus() {
        ResourceDO resource = new ResourceDO();
        resource.setIsDelete(false);
        return getMapper().select(resource);
    }

    @Override
    public List<RoleResourceSetDO> queryResourcesByRoleId(Long roleId) {
        return roleResourceMapper.queryResourcesByRoleId(roleId);
    }

    @Override
    public void updateRoleResource(Long roleId, List<Long> resourceIdList) {
        Example example = new Example(RoleResourceDO.class);
        example.createCriteria()
                .andEqualTo("roleId", roleId)
                .andEqualTo("isDelete", false);
        List<RoleResourceDO> userResourcesList = roleResourceMapper.selectByExample(example);
        List<Long> userResourceIdList = userResourcesList.stream().map(RoleResourceDO::getResourceId).collect(Collectors.toList());
        List<Long> addList = new ArrayList<>();
        resourceIdList.forEach(resourceId -> {
            if (!userResourceIdList.contains(resourceId)) {
                addList.add(resourceId);
            }
            userResourceIdList.remove(resourceId);
        });
        if (!CollectionUtils.isEmpty(addList)) {
            addList.forEach(aLong -> {
                RoleResourceDO userRoleDO = new RoleResourceDO();
                userRoleDO.setIsDelete(false);
                userRoleDO.setResourceId(aLong);
                userRoleDO.setRoleId(roleId);
                roleResourceMapper.insert(userRoleDO);
            });
        }
        if (!CollectionUtils.isEmpty(userResourceIdList)) {
            userResourcesList.forEach(userResourcesDO -> {
                if (userResourceIdList.contains(userResourcesDO.getResourceId())) {
                    userResourcesDO.setIsDelete(false);
                    roleResourceMapper.updateByPrimaryKey(userResourcesDO);
                }
            });
        }
    }

    @Override
    public List<ResourceDO> getMenuByRoleId(List<Long> roleId) {
        return roleResourceMapper.getMenuByUserId(roleId);
    }

    @Override
    public List<ResourceDO> getRoleResourceByPage(List<Long> roleId, String pageCode) {
        Example example = new Example(ResourceDO.class);
        example.createCriteria().andEqualTo("code", pageCode);
        ResourceDO resourceDO = getMapper().selectOneByExample(example);

        if (resourceDO != null) {
            return roleResourceMapper.getMenuByPid(roleId, resourceDO.getId());
        }

        return Collections.EMPTY_LIST;
    }


}
