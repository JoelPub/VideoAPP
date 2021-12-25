package com.shj.code.service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.shj.code.util.*;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class WebVideoService{
	
	//public static String tempTsFile = "D:\\BaiduNetdiskDownload\\xxx.mp4";

	public String merge(VideoMerge vm) {
	
		long _startTime=System.currentTimeMillis();  //获取开始时间
		
		if(ObjectUtils.isEmpty(vm)){
			throw new BizException(ResultEnum.SYS_ERROR,"处理失败,请求参数为空");
		}
		
		List<Video> list=vm.getVideos();
		if(CollectionUtils.isEmpty(list)){
			throw new BizException(ResultEnum.SYS_ERROR,"处理失败,请求参数为空");
		}
		
		
		//备份视频地址链接集合
		List<String> pendingList = new ArrayList<String>();
		
		try {
			
			List<String> videoList = new ArrayList<String>();	//已过滤是否静音的视频集合 保证vm.getVideos()数量一致
			
			//裁剪视频尺寸大小
			Metadata metadata = vm.getMetadata();
			
			for (Video video : list) {
				boolean isMute = video.isMute();
				
				String filePath = FfmpegUtils.cutVideo(video.getPath(), video.getClipStartTime(), video.getClipEndTime());
				pendingList.add(filePath);
				
				if (!ObjectUtils.isEmpty(metadata)) {
					Integer finallyWidth = metadata.getWidth();
					Integer finallyHeight = metadata.getHeight();

					String _path = FfmpegUtils.videoMetadata(filePath, finallyWidth, finallyHeight,video);
					pendingList.add(_path);
					filePath=_path;
				}
				
				
				//指定视频播放倍率
				String setptsPath = FfmpegUtils.setptsVideo(filePath,video);
				pendingList.add(setptsPath);
				
				/** 无声视频 **/
				if (isMute) {
					int startTime=video.getStartTime();
					int endTime=video.getEndTime();
					String cropVideoSizePath = FfmpegUtils.getVideoFromAudio(setptsPath,startTime,endTime);
					pendingList.add(cropVideoSizePath);
					
					videoList.add(cropVideoSizePath);	
				}else{
					
					videoList.add(setptsPath);
				}
				
			}
			
			if(CollectionUtils.isEmpty(videoList)){
				throw new BizException(ResultEnum.SYS_ERROR,"视频处理异常");
			}
			
			String path="";
			if(videoList.size()>1){
				//多视频拼接合并为一个mp4格式视频
				path=FfmpegUtils.mergeVideos(videoList);
				pendingList.add(path);
			}else{
				path=videoList.get(0);
			}
			
			
			//添加图片水印
			List<Image> picList = vm.getImages();
			if(!CollectionUtils.isEmpty(picList)){
				for(Image pic:picList){
					String picPath = FfmpegUtils.addMark(path,pic);
					pendingList.add(picPath);
					path=picPath;
				}
			}
			
			//添加视频字体
			List<Subtitle> textList=vm.getSubtitles();
			if(!CollectionUtils.isEmpty(textList)){
				for(Subtitle text:textList){
					String textPath = FfmpegUtils.addVideoText(path,text);
					pendingList.add(textPath);
					path=textPath;
				}
			}
			
			//添加音频---第一步先转换音频
			List<Audio> audioList=vm.getAudios();
			List<Audio> audioEocList=new ArrayList<>();
			if(!CollectionUtils.isEmpty(audioList)){
				
				for(Audio audio:audioList){
					//截取音频---路径
					String audioPath=audio.getPath();
					Integer audioStartTime=audio.getClipStartTime();
					Integer audioEndTime=audio.getClipEndTime();
					
					String audioEocPath = FfmpegUtils.cutAudio(audioPath,audioStartTime,audioEndTime);
					pendingList.add(audioEocPath);
					
					//指定音频播放倍率
					String setptsPath = FfmpegUtils.setptsAudio(audioEocPath,audio);
					pendingList.add(setptsPath);
					
					Audio entity=new Audio();
					entity.setPath(setptsPath);
					entity.setStartTime(audio.getStartTime());
					audioEocList.add(entity);
				}
				
			}
			//添加音频---第二步添加至视频
			if(!CollectionUtils.isEmpty(audioEocList)){
				
				for(Audio audioBase:audioEocList){
					String _path=FfmpegUtils.addAutio(path,audioBase.getPath(),String.valueOf(audioBase.getStartTime()));
					pendingList.add(_path);
					path=_path;
				}
			}
			
			String removeIndex=path;
			pendingList = pendingList.stream().filter(item -> !item.equals(removeIndex)).collect(Collectors.toList());
			return path;
		} catch (Exception e) {
			e.printStackTrace();
			//log.error(e.getMessage(),e);
			throw new BizException(ResultEnum.SYS_ERROR,"系统异常");
		} finally {
			
			FileUtils.delAlls(FfmpegUtils.tempMediaPath);
			
			/**--清除备份视频文件--**/
			for (String delPath : pendingList) {
				FileUtils.deleteFile(delPath);
				System.out.println(delPath+"--已删除");
			}
			
			long _endTime=System.currentTimeMillis(); 	//获取结束时间
			System.out.println("-------运行耗时时间： "+(_endTime-_startTime)+"ms");
			//log.info("-------运行耗时时间： "+(_endTime-_startTime)+"ms");
		}
		
	}
	
}
