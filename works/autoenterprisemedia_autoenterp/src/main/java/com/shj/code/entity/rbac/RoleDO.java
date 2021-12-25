package com.shj.code.entity.rbac;

import java.io.Serializable;
import java.util.Date;

import com.shj.code.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;

/**
 * account
 * @author 
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Table(name = "sys_role")
public class RoleDO extends BaseEntity {

    /**
     * 名称
     */
    private String name;

    private  Long channelId;
}