package com.shj.code.api.response;

import com.shj.code.entity.rbac.ResourceDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Data
@ToString
public class ResourceResponse extends ResourceDO {

    @ApiModelProperty("资源类型名称")
    private String resourceTypeName;

    @ApiModelProperty("创建人姓名")
    private String createName;

}
