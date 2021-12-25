package com.shj.code.api.request;

import lombok.Data;

import java.util.List;

@Data
public class UserResourceRequest {

    private List<Long> resourceIds;

    private Integer userId;

    private Long roleId;

}
