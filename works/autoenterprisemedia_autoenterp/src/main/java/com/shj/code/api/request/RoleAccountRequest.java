package com.shj.code.api.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class RoleAccountRequest {
    /**
     * 角色id
     */
    @NotNull
    private List<Long> roleIdList;

    /**
     * 用户或部门id
     */
    @NotNull
    private Long accountId;
}
