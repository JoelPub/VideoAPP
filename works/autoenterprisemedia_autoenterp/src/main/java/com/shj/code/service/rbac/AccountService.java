package com.shj.code.service.rbac;

import com.shj.code.api.request.LoginRequest;
import com.shj.code.entity.rbac.AccountDO;
import com.shj.code.service.TkService;

public interface AccountService extends TkService<AccountDO> {

    AccountDO login(LoginRequest param);




}