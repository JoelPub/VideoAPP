package com.shj.code.util;

//@Data
//@ApiModel(description = "图片参数")
public class Image{
	
	//@ApiModelProperty(value = "源视频绝对路径", required = false , dataType = "String", example = "/xxxxxx/xxx.jpg")
	private String path;
	
	//@ApiModelProperty(value = "源视频URL", required = false , dataType = "String", example = "https://xxxxxx/xxx.jpg")
	private String source;
	
	//@ApiModelProperty(value = "视频在时间轴上显示的起点（秒）", required = false , dataType = "Integer", example = "10.24")
    private Integer startTime;
	
	//@ApiModelProperty(value = "视频在时间轴上显示的终点（秒）", required = false , dataType = "Integer", example = "15.38")
	private Integer endTime;
    
    //@ApiModelProperty(value = "图片位置信息", required = false , dataType = "Integer", example = "100")
    private Integer left;
    
    //@ApiModelProperty(value = "图片位置信息", required = false , dataType = "Integer", example = "100")
    private Integer top;
    
    //@ApiModelProperty(value = "图片宽", required = false , dataType = "Integer", example = "200")
    private Integer width;
    
    //@ApiModelProperty(value = "图片高", required = false , dataType = "Integer", example = "200")
    private Integer height;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
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
    
    /*@ApiModelProperty(value = "水印位置(左上角:TopLeft,右上角:TopRight,左下角:LowerLeft,右下角:LowerRirht,若自定义位置[逗号分隔x,y数值]:100,200)", required = false , dataType = "String", example = "LowerRirht")
    private String position;*/
}
