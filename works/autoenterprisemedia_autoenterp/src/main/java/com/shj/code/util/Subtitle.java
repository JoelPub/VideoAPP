package com.shj.code.util;

//@Data
//@ApiModel(description = "字体规格")
public class Subtitle{
	
	//@ApiModelProperty(value = "字幕内容", required = false , dataType = "String", example = "字幕内容")
	private String text;
	
	//@ApiModelProperty(value = "字幕在时间轴上显示的起点（秒）", required = false , dataType = "Integer", example = "10")
    private Integer startTime;
	
	//@ApiModelProperty(value = "字幕在时间轴上显示的终点（秒）", required = false , dataType = "Integer", example = "15")
	private Integer endTime;
	
    //@ApiModelProperty(value = "字号（像素）", required = false , dataType = "String", example = "70")
    private String fontSize;
    
    //@ApiModelProperty(value = "字重。400 为标准，700 为加粗", required = false , dataType = "String", example = "400")
    private String fontWeight;
    
    //@ApiModelProperty(value = "文本颜色", required = false , dataType = "String", example = "70px")
    private String color;
    
    //@ApiModelProperty(value = "center, 对齐方式。可选值为left,center,right", required = false , dataType = "String", example = "center")
    private String textAlign;

	//@ApiModelProperty(value = "", required = false , dataType = "String", example = "100")
    private Integer left;
    
    //@ApiModelProperty(value = "", required = false , dataType = "String", example = "100")
    private Integer top;
    
    //@ApiModelProperty(value = "", required = false , dataType = "String", example = "200")
    private Integer width;
    
    //@ApiModelProperty(value = "", required = false , dataType = "String", example = "200")
    private Integer height;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getStartTime() {
		return startTime;
	}

	public void setStartTime(Integer startTime) {
		this.startTime = startTime;
	}

	public Integer getEndTime() {
		return endTime;
	}

	public void setEndTime(Integer endTime) {
		this.endTime = endTime;
	}

	public String getFontSize() {
		return fontSize;
	}

	public void setFontSize(String fontSize) {
		this.fontSize = fontSize;
	}

	public String getFontWeight() {
		return fontWeight;
	}

	public void setFontWeight(String fontWeight) {
		this.fontWeight = fontWeight;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getTextAlign() {
		return textAlign;
	}

	public void setTextAlign(String textAlign) {
		this.textAlign = textAlign;
	}


	public Integer getLeft() {
		return left;
	}

	public void setLeft(Integer left) {
		this.left = left;
	}

	public Integer getTop() {
		return top;
	}

	public void setTop(Integer top) {
		this.top = top;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}
}
