package com.shj.code.util;

import java.util.List;

public class VideoMerge{
    
	//@ApiModelProperty(value = "视频集合", required = false , dataType = "List", example = "")
    private List<Video> videos;
    
    //@ApiModelProperty(value = "音频集合", required = false , dataType = "List", example = "")
    private List<Audio> audios;
    
    //@ApiModelProperty(value = "字体集合", required = false , dataType = "List", example = "")
    private List<Subtitle> subtitles;
    
    //@ApiModelProperty(value = "图片集合", required = false , dataType = "List", example = "")
    private List<Image> images;
    
    //@ApiModelProperty(value = "最终生成文件的视频尺寸", required = false , dataType = "Object", example = "metadata")
    private Metadata metadata;

	public List<Video> getVideos() {
		return videos;
	}

	public void setVideos(List<Video> videos) {
		this.videos = videos;
	}

	public List<Audio> getAudios() {
		return audios;
	}

	public void setAudios(List<Audio> audios) {
		this.audios = audios;
	}

	public List<Subtitle> getSubtitles() {
		return subtitles;
	}

	public void setSubtitles(List<Subtitle> subtitles) {
		this.subtitles = subtitles;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public Metadata getMetadata() {
		return metadata;
	}

	public void setMetadata(Metadata metadata) {
		this.metadata = metadata;
	}
}
