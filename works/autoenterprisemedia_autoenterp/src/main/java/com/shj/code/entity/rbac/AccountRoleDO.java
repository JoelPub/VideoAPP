package com.shj.code.entity.rbac;

import java.io.Serializable;
import java.util.Date;

import com.shj.code.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;

/**
 * account
 *
 * @author
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "sys_account_role")
public class AccountRoleDO extends BaseEntity {
    private Long accountId;
    private Long roleId;
}