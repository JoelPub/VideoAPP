package com.shj.code.util;

//@Data
//@ApiModel(description = "视频尺寸")
public class Metadata{
	
    //@ApiModelProperty(value = "裁剪后最终视频的宽度", required = false , dataType = "Integer", example = "1280")
    private Integer width;
    
    //@ApiModelProperty(value = "裁剪后最终视频的高度", required = false , dataType = "Integer", example = "720")
    private Integer height;
    
    //@ApiModelProperty(value = "总时长（秒）", required = false , dataType = "Integer", example = "120")
	private Integer duration;

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

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}
}
