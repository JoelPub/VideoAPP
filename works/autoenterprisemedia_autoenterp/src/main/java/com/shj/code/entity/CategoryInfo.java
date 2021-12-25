package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

@ApiModel("种类")
public class CategoryInfo {
	@ApiModelProperty(value = "id")
    private Integer id;
	@ApiModelProperty(value = "name")
    private String name;
	@ApiModelProperty(value = "种类名称")
    private String typeName;
	@ApiModelProperty(value = "创建时间")
    private Date createData;
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreateData() {
		return createData;
	}
	public void setCreateData(Date createData) {
		this.createData = createData;
	}
}
