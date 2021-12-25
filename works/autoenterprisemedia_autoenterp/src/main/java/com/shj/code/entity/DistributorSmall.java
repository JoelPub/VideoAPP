package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel("经营商小")
public class DistributorSmall {
	@ApiModelProperty(value = "id")
	private Integer id;
	@ApiModelProperty(value = "主体id")
	private Integer mainId;
	@ApiModelProperty(value = "名称")
	private String name;
	@ApiModelProperty(value = "排序")
	private Integer sort;
	@ApiModelProperty(value = "创建时间")
	private Date creatData;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMainId() {
		return mainId;
	}

	public void setMainId(Integer mainId) {
		this.mainId = mainId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public Date getCreatData() {
		return creatData;
	}

	public void setCreatData(Date creatData) {
		this.creatData = creatData;
	}
}
