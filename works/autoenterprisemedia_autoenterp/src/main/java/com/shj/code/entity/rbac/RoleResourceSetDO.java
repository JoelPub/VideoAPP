package com.shj.code.entity.rbac;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RoleResourceSetDO extends ResourceDO {

    /**
     * 用户或部门id
     */
    private Long roleId;

    /**
     * 是否标记删除
     */
    private Boolean isDelete;
}
