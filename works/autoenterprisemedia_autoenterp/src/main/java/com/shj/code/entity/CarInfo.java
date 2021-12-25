package com.shj.code.entity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel(value="汽车类型对象")
public class CarInfo {

	@ApiModelProperty(value = "主键ID")
    private Integer id;
	@ApiModelProperty(value = "名称")
    private String name;
	@ApiModelProperty(value = "创建时间")
    private Date createData;
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
