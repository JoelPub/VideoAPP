package com.shj.code.session;

import com.shj.code.entity.rbac.ResourceDO;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 保存在session中的用户信息
 */
@Data
public class UserToken implements Serializable {
    private Long userId;
    private Long channelId;
    private String name;
    private Integer admin;
    private List<ResourceDO> resourceList;
}
