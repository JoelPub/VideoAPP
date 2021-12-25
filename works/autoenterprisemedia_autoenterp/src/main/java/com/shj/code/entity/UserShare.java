package com.shj.code.entity;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

import javax.persistence.Transient;
@ApiModel("用户收藏")
public class UserShare {
	@ApiModelProperty(value = "id")
    private Integer id;
	@ApiModelProperty(value = "类型")
    private String type;
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
	@ApiModelProperty(value = "绝对路径")
    @Transient
    private String absolutelyUrl;
	@ApiModelProperty(value = "图片高度")
    @Transient
    private String pictureHeight;
	@ApiModelProperty(value = "图片宽度")
    @Transient
    private String pictureWidth;
	@ApiModelProperty(value = "覆盖路径")
    @Transient
    private String coverUrl;

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

	public String getAbsolutelyUrl() {
		return absolutelyUrl;
	}

	public void setAbsolutelyUrl(String absolutelyUrl) {
		this.absolutelyUrl = absolutelyUrl;
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

	public String getCoverUrl() {
		return coverUrl;
	}

	public void setCoverUrl(String coverUrl) {
		this.coverUrl = coverUrl;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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
