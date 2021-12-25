package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel("经营商")
public class DistributorInfo {
	@ApiModelProperty(value = "id")
	private Integer id;
	@ApiModelProperty(value = "城市id")
	private Integer cityId;
	@ApiModelProperty(value = "代码")
	private String code;
	@ApiModelProperty(value = "名称")
	private String name;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
