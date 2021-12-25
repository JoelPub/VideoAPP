package com.shj.code.api.response;

import com.shj.code.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Table;
import java.io.Serializable;

/**
 * account
 *
 * @author
 */
@Data
public class ResourceGetResponse implements Serializable {
    private Long id;

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