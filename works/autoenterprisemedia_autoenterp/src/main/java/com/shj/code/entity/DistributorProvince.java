package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel("经营商省份")
public class DistributorProvince {
	@ApiModelProperty(value = "id")
	private Integer id;
	@ApiModelProperty(value = "smallId")
	private Integer smallId;
	@ApiModelProperty(value = "名称")
	private String name;
	@ApiModelProperty(value = "创建时间")
	private Date creatData;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSmallId() {
		return smallId;
	}

	public void setSmallId(Integer smallId) {
		this.smallId = smallId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatData() {
		return creatData;
	}

	public void setCreatData(Date creatData) {
		this.creatData = creatData;
	}
}
