package com.shj.code.entity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import javax.persistence.Transient;
@ApiModel("用户模板")
public class UserTemplateInfo {
	@ApiModelProperty(value = "id")
    private Integer id;
	@ApiModelProperty(value = "模板id")
	private Integer templateId;
	@ApiModelProperty(value = "用户id")
	private String userId;
	@ApiModelProperty(value = "创建时间")
	private Date createData;
	@ApiModelProperty(value = "文件名称")
	@Transient
	private String fileName;
	@ApiModelProperty(value = "源路径")
	@Transient
	private String sourceUrl;

	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getTemplateId() {
		return templateId;
	}
	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getCreateData() {
		return createData;
	}
	public void setCreateData(Date createData) {
		this.createData = createData;
	}
}
