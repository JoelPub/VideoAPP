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
@Table(name = "sys_role_resource")
public class RoleResourceDO extends BaseEntity {
    private Long roleId;

    /**
     * 渠道id
     */
    private Long resourceId;

}