package com.shj.code.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author wenliluo
 */
@Data
public class RoleRequest {

    private Long id;

    @NotNull
    private String name;

    @ApiModelProperty(hidden = true)
    private Long channelId;

}
