package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel("经营商代码")
public class DistributorCode {
	@ApiModelProperty(value = "id")
	private Integer id;
	@ApiModelProperty(value = "代码")
	private String code;
	@ApiModelProperty(value = "创建时间")
	private Date creatData;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Date getCreatData() {
		return creatData;
	}

	public void setCreatData(Date creatData) {
		this.creatData = creatData;
	}
}
