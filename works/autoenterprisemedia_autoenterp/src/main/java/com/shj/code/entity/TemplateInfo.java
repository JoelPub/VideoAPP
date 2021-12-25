package com.shj.code.entity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Transient;
@ApiModel("模板")
public class TemplateInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1242493306307174690L;
	@ApiModelProperty(value = "id")
	private Integer id;
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
	@ApiModelProperty(value = "是否编辑")
	private String isEdit;
	@ApiModelProperty(value = "开始时间")
	private String startTime;
	@ApiModelProperty(value = "结束时间")
	private String endTime;
	@ApiModelProperty(value = "汽车模型名称")
	private String carModelName;
	@ApiModelProperty(value = "种类名称")
	private String categoryName;
	@ApiModelProperty(value = "上传时间")
	private String uploadData;
	@ApiModelProperty(value = "材料类型")
	private Integer materialType;
	@ApiModelProperty(value = "角色")
	private Integer role;
	@ApiModelProperty(value = "创建时间")
	private Date createData;
	@ApiModelProperty(value = "用户作品id")
	private String userWorkId;
	@ApiModelProperty(value = "绝对路路径")
	private String absolutelyUrl;
	@ApiModelProperty(value = "宽度")
	private String width;
	@ApiModelProperty(value = "高度")
	private String height;
	@ApiModelProperty(value = "图片高度")
	private String pictureHeight;
	@ApiModelProperty(value = "图片宽度")
	private String pictureWidth;
	@ApiModelProperty(value = "收藏品id")
	@Transient
	private String collectionId;
	
	public String getCollectionId() {
		return collectionId;
	}

	public void setCollectionId(String collectionId) {
		this.collectionId = collectionId;
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

	public String getUserWorkId() {
		return userWorkId;
	}

	public void setUserWorkId(String userWorkId) {
		this.userWorkId = userWorkId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	private String videoTime;

	public String getVideoTime() {
		return videoTime;
	}

	public void setVideoTime(String videoTime) {
		this.videoTime = videoTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getIsEdit() {
		return isEdit;
	}

	public void setIsEdit(String isEdit) {
		this.isEdit = isEdit;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getCarModelName() {
		return carModelName;
	}

	public void setCarModelName(String carModelName) {
		this.carModelName = carModelName;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getUploadData() {
		return uploadData;
	}

	public void setUploadData(String uploadData) {
		this.uploadData = uploadData;
	}

	public Integer getMaterialType() {
		return materialType;
	}

	public void setMaterialType(Integer materialType) {
		this.materialType = materialType;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public Date getCreateData() {
		return createData;
	}

	public void setCreateData(Date createData) {
		this.createData = createData;
	}
}
