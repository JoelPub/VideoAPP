package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

/***
 * @author Cdl
 * @date 2021/4/25 17:06
 * @describe: TODO
 */
@ApiModel("免责声明")
public class Disclaimer {
    @ApiModelProperty(value = "id")
    private Integer id;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    @ApiModelProperty(value = "userId")
    private String userId;
    @ApiModelProperty(value = "创建时间")
    private Date createData;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreateData() {
        return createData;
    }
    public void setCreateData(Date createData) {
        this.createData = createData;
    }
}
