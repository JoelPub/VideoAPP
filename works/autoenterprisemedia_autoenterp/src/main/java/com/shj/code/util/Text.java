package com.shj.code.util;

import javax.persistence.Transient;

public class Text{
	
	//@ApiModelProperty(value = "二级标题", required = false , dataType = "String", example = "二级标题")
	@Transient
	private String title;
	
	//@ApiModelProperty(value = "二级标题", required = false , dataType = "String", example = "二级标题")
	@Transient
	private String value;
	
    //@ApiModelProperty(value = "字体大小", required = false , dataType = "String", example = "70px")
	@Transient
    private String fontSize;
    
    //@ApiModelProperty(value = "字体位置", required = false , dataType = "String", example = "100")
	@Transient
    private String textAlign;
    
    //@ApiModelProperty(value = "宽度", required = false , dataType = "String", example = "100")
	@Transient
    private String width;
    
    //@ApiModelProperty(value = "切片总时长", required = false , dataType = "String", example = "10")
	@Transient
	private Integer duration;
    
    //@ApiModelProperty(value = "UUID", required = false , dataType = "String", example = "2f9ac2c7-bd85-445c-a69d-d8e547263ae6")
	@Transient
	private String uuid;
    
    //@ApiModelProperty(value = "插入最终合成视频的时间点", required = false , dataType = "String", example = "00:00:10")
	@Transient
	private String inserTime;
    
    //@ApiModelProperty(value = "后端忽视", required = false , dataType = "String", example = "50")
	@Transient
	private String insertSertX;
	
	//@ApiModelProperty(value = "类型", required = false , dataType = "String", example = "text")
	@Transient
	private String type;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getFontSize() {
		return fontSize;
	}

	public void setFontSize(String fontSize) {
		this.fontSize = fontSize;
	}

	public String getTextAlign() {
		return textAlign;
	}

	public void setTextAlign(String textAlign) {
		this.textAlign = textAlign;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getInserTime() {
		return inserTime;
	}

	public void setInserTime(String inserTime) {
		this.inserTime = inserTime;
	}

	public String getInsertSertX() {
		return insertSertX;
	}

	public void setInsertSertX(String insertSertX) {
		this.insertSertX = insertSertX;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
    
}
