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
@Table(name = "sys_resource")
public class ResourceDO extends BaseEntity {

    /**
     * 名称
     */
    private String name;

    /**
     * 类型 1：菜单，2：按钮
     */
    private Integer type;

    /**
     * 链接地址
     */
    private String url;

    /**
     * 父节点
     */
    private Long parentId;

    private String code;
}