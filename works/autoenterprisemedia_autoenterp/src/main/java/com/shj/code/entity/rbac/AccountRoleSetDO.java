package com.shj.code.entity.rbac;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AccountRoleSetDO extends RoleDO {
    private String accountId;
}
