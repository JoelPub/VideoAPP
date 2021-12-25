package com.shj.code.service.rbac.impl;

import com.shj.code.entity.rbac.AccountRoleDO;
import com.shj.code.entity.rbac.AccountRoleSetDO;
import com.shj.code.mapper.rbac.AccountRoleMapper;
import com.shj.code.service.TkServiceImpl;
import com.shj.code.service.rbac.AccountRoleService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountRoleServiceImpl extends TkServiceImpl<AccountRoleMapper, AccountRoleDO> implements AccountRoleService {


    @Override
    public List<AccountRoleDO> getRolesByAccount(Long accountId) {
        Example example = createExample();
        example.createCriteria().andEqualTo("accountId", accountId)
                .andEqualTo("isDelete", 0);
        return getMapper().selectByExample(example);
    }

    @Override
    public void updateAccountRole(Long accountId, List<Long> roleIdList) {
        Example example = createExample();
        example.createCriteria()
                .andEqualTo("accountId", accountId)
                .andEqualTo("isDelete", false);
        List<AccountRoleDO> userResourcesList = getMapper().selectByExample(example);
        List<Long> userResourceIdList = userResourcesList.stream().map(AccountRoleDO::getRoleId).collect(Collectors.toList());
        List<Long> addList = new ArrayList<>();
        roleIdList.forEach(resourceId -> {
            if (!userResourceIdList.contains(resourceId)) {
                addList.add(resourceId);
            }
            userResourceIdList.remove(resourceId);
        });
        if (!CollectionUtils.isEmpty(addList)) {
            addList.forEach(aLong -> {
                AccountRoleDO userRoleDO = new AccountRoleDO();
                userRoleDO.setRoleId(aLong);
                userRoleDO.setAccountId(accountId);
                insertSelective(userRoleDO);
            });
        }
        if (!CollectionUtils.isEmpty(userResourceIdList)) {
            userResourcesList.forEach(userResourcesDO -> {
                if (userResourceIdList.contains(userResourcesDO.getRoleId())) {
                    userResourcesDO.setIsDelete(true);
                    getMapper().updateByPrimaryKey(userResourcesDO);
                }
            });
        }
    }

    @Override
    public List<AccountRoleSetDO> selectRolesByAccountId(Long accountId, Long channelId) {
        return getMapper().selectRolesByAccountId(accountId, channelId);
    }

    @Override
    public List<AccountRoleDO> selectByAccount(Long accountId) {
        AccountRoleDO roleDO = new AccountRoleDO();
        roleDO.setAccountId(accountId);
        roleDO.setIsDelete(false);
        return getMapper().select(roleDO);
    }
}
