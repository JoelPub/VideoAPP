package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Transient;
@ApiModel("经销商")
public class UserWorksInfo implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -848903524479640921L;
	@ApiModelProperty(value = "id")
	private String id;
	@ApiModelProperty(value = "文件名称")
    private String fileName;
	@ApiModelProperty(value = "类型名称")
    private String typeName;
	@ApiModelProperty(value = "用户id")
    private String userId;
	@ApiModelProperty(value = "总数")
    private String accountNumber;
	@ApiModelProperty(value = "覆盖路径")
    private String coverUrl;
	@ApiModelProperty(value = "模板json")
    private String templateJson;
	@ApiModelProperty(value = "源路径")
    private String sourceUrl;
	@ApiModelProperty(value = "角色")
    private Integer role;
	@ApiModelProperty(value = "上传时间")
    private String uploadData;
	@ApiModelProperty(value = "创建时间")
    private Date createData;
	@ApiModelProperty(value = "视频时间")
    private String videoTime;
	@ApiModelProperty(value = "绝对路径")
    private String absolutelyUrl;
	@ApiModelProperty(value = "宽度")
    private String width;
	@ApiModelProperty(value = "高度")
	private String height;
	@ApiModelProperty(value = "图片高度")
	private String pictureHeight;
	@ApiModelProperty(value = "图片宽度")
	private String pictureWidth;
	@ApiModelProperty(value = "是否分享")
	@Transient
	private String isShare;
	public String getIsShare() {
		return isShare;
	}
	public void setIsShare(String isShare) {
		this.isShare = isShare;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getPictureHeight() {
		return pictureHeight;
	}
	public void setPictureHeight(String pictureHeight) {
		this.pictureHeight = pictureHeight;
	}
	public String getPictureWidth() {
		return pictureWidth;
	}
	public void setPictureWidth(String pictureWidth) {
		this.pictureWidth = pictureWidth;
	}
	public String getAbsolutelyUrl() {
		return absolutelyUrl;
	}
	public void setAbsolutelyUrl(String absolutelyUrl) {
		this.absolutelyUrl = absolutelyUrl;
	}
	public String getVideoTime() {
		return videoTime;
	}
	public void setVideoTime(String videoTime) {
		this.videoTime = videoTime;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getCoverUrl() {
		return coverUrl;
	}
	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}
	public String getTemplateJson() {
		return templateJson;
	}
	public void setTemplateJson(String templateJson) {
		this.templateJson = templateJson;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public Integer getRole() {
		return role;
	}
	public void setRole(Integer role) {
		this.role = role;
	}
	public String getUploadData() {
		return uploadData;
	}
	public void setUploadData(String uploadData) {
		this.uploadData = uploadData;
	}
	public Date getCreateData() {
		return createData;
	}
	public void setCreateData(Date createData) {
		this.createData = createData;
	}
    
}
