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
@Table(name = "sys_account")
public class AccountDO extends BaseEntity {
    /**
     * 渠道id
     */
    private Long channelId;

    /**
     * 名称
     */
    private String name;

    /**
     * 账号
     */
    private String account;

    /**
     * 密码
     */
    private String password;

    /**
     * 是否管理员
     */
    private Integer admin;

}