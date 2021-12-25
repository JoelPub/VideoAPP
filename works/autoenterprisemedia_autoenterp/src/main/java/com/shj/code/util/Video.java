package com.shj.code.util;

public class Video{
	
	//@ApiModelProperty(value = "源视频绝对路径", required = false , dataType = "String", example = "/xxxxxx/xxx.mp4")
	private String path;
	
	//@ApiModelProperty(value = "源视频URL", required = false , dataType = "String", example = "https://xxxxxx/xxx.mp4")
	private String source;
	
	//@ApiModelProperty(value = "视频在时间轴上显示的起点（秒）", required = false , dataType = "Integer", example = "10.24")
    private Integer startTime;
	
	//@ApiModelProperty(value = "视频在时间轴上显示的终点（秒）", required = false , dataType = "Integer", example = "15.38")
	private Integer endTime;
	
	//@ApiModelProperty(value = "在源音频中截取的起点位置", required = false , dataType = "Integer", example = "10.24")
	private Integer clipStartTime;
	
	//@ApiModelProperty(value = "在源音频中截取的终点位置", required = false , dataType = "Integer", example = "15.38")
	private Integer clipEndTime;
	
	//@ApiModelProperty(value = "视频片段是否静音", required = false , dataType = "boolean", example = "false")
	private boolean mute;
	
	//@ApiModelProperty(value = "原视频宽", required = false , dataType = "Integer", example = "1280")
	private Integer originalWidth;
	
	//@ApiModelProperty(value = "原视频高", required = false , dataType = "Integer", example = "720")
	private Integer originalHeight;

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

	public Integer getClipStartTime() {
		return clipStartTime;
	}

	public void setClipStartTime(Integer clipStartTime) {
		this.clipStartTime = clipStartTime;
	}

	public Integer getClipEndTime() {
		return clipEndTime;
	}

	public void setClipEndTime(Integer clipEndTime) {
		this.clipEndTime = clipEndTime;
	}

	public boolean isMute() {
		return mute;
	}

	public void setMute(boolean mute) {
		this.mute = mute;
	}

	public Integer getOriginalWidth() {
		return originalWidth;
	}

	public void setOriginalWidth(Integer originalWidth) {
		this.originalWidth = originalWidth;
	}

	public Integer getOriginalHeight() {
		return originalHeight;
	}

	public void setOriginalHeight(Integer originalHeight) {
		this.originalHeight = originalHeight;
	}
    
}
