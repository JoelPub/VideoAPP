package com.shj.code.entity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel("海报形状")
public class ChartInfo {
	@ApiModelProperty(value = "id")
    private Integer id;
	@ApiModelProperty(value = "名称路径")
    private String nameUrl;
	@ApiModelProperty(value = "类型")
    private String type;
	@ApiModelProperty(value = "创建时间")
    private Date createData;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNameUrl() {
		return nameUrl;
	}
	public void setNameUrl(String nameUrl) {
		this.nameUrl = nameUrl;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getCreateData() {
		return createData;
	}
	public void setCreateData(Date createData) {
		this.createData = createData;
	}
}
