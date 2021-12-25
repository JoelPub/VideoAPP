package com.shj.code.service.rbac.impl;

import com.shj.code.api.request.LoginRequest;
import com.shj.code.entity.rbac.AccountDO;
import com.shj.code.mapper.rbac.AccountMapper;
import com.shj.code.service.TkServiceImpl;
import com.shj.code.service.rbac.AccountService;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

@Service
public class AccountServiceImpl extends TkServiceImpl<AccountMapper, AccountDO> implements AccountService {



    @Override
    public AccountDO login(LoginRequest param) {
        Example example = createExample();
        example.createCriteria().andEqualTo("account", param.getAccount())
                .andEqualTo("password", param.getPassword())
                .andEqualTo("isDelete", 0);
        return getMapper().selectOneByExample(example);
    }

}
