package com.shj.code.controller;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.shj.code.util.StandardResult;
import com.shj.code.util.UUIDGenerator;
import it.sauronsoftware.jave.Encoder;
import it.sauronsoftware.jave.EncoderException;
import it.sauronsoftware.jave.InputFormatException;
import it.sauronsoftware.jave.MultimediaInfo;
/***
 * 资源上传模块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-文件上传",tags = "后台管理-文件上传")
public class UploadFileController {
	
	@Value("${bootdo.uploadPath}")
	private String uploadPath;
	
	@Value("${bootdo.vistPath}")
	private String host;
	
	/**
	 * 资源上传
	 * List<String>
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@PostMapping(value="uploadFile")
	@ApiOperation(value = "资源上传")
	public StandardResult uploadFile(@RequestBody List<MultipartFile> file, HttpServletRequest request) {
		System.err.println("上传资源开始");
		StandardResult msg = new StandardResult();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try{
			if (file != null && file.size() > 0) {
				System.err.println("文件长度：" + file.size());
				Date date = new Date();
				SimpleDateFormat format1 = new SimpleDateFormat("yyyy");
				SimpleDateFormat format2 = new SimpleDateFormat("MM");
				SimpleDateFormat format3 = new SimpleDateFormat("dd");
				for (int i = 0; i < file.size(); i++) {
					MultipartFile multipartFile = file.get(i);
					String uuid = UUIDGenerator.getUUID();
					Long sizeName = multipartFile.getSize();
					String newFileName = "";
					String fileName = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".")).replace(".", "");
					Map<String, Object> map = new HashMap<String, Object>();
					BufferedImage img = ImageIO.read(multipartFile.getInputStream());
					if("psd".equals(fileName)||"jpg".equals(fileName)||"png".equals(fileName)){
						//PSD 20M JPG、PNG 2M 海报KV
						if("psd".equals(fileName)){
							if(sizeName<=524288000){
								 newFileName = "posterPSDKV" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
										+ format3.format(date) + "/" + uuid + multipartFile.getOriginalFilename()
												.substring(multipartFile.getOriginalFilename().lastIndexOf("."));
							}else{
								msg.setStatus(StandardResult.FAIL);
								msg.setData("您上传的文件大小超过标准，请压缩好后重新上传");
								msg.setMessage("您上传的文件大小超过标准，请压缩好后重新上传");
								return msg;
							}
						}else{
							if(sizeName<=2097152){
								newFileName = "posterPictureKV" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
										+ format3.format(date) + "/" + uuid + multipartFile.getOriginalFilename()
												.substring(multipartFile.getOriginalFilename().lastIndexOf("."));
								map.put("pictureWidth", img.getWidth());
								map.put("pictureHeight", img.getHeight());
							}else{
								msg.setStatus(StandardResult.FAIL);
								msg.setData("您上传的文件大小超过标准，请压缩好后重新上传");
								msg.setMessage("您上传的文件大小超过标准，请压缩好后重新上传");
								return msg;
							}
							
						}
					}else if("mov".equals(fileName)||"mp4".equals(fileName)||"mv".equals(fileName)||"avi".equals(fileName)){
						//视频 100M
						if(sizeName<=104857600){
							 /*newFileName = "video" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
									+ format3.format(date) + "/" + uuid + multipartFile.getOriginalFilename()
											.substring(multipartFile.getOriginalFilename().lastIndexOf("."));*/
							 newFileName = "video" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
										+ format3.format(date) + "/" + uuid + ".mp4";
						}else{
							msg.setStatus(StandardResult.FAIL);
							msg.setData("您上传的文件大小超过标准，请压缩好后重新上传");
							msg.setMessage("您上传的文件大小超过标准，请压缩好后重新上传");
							return msg;
						}
					}else if("mp3".equals(fileName)){
						//音频 20M
						if(sizeName<=20971520){
							 newFileName = "music" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
									+ format3.format(date) + "/" + uuid + multipartFile.getOriginalFilename()
											.substring(multipartFile.getOriginalFilename().lastIndexOf("."));
						}else{
							msg.setStatus(StandardResult.FAIL);
							msg.setData("您上传的文件大小超过标准，请压缩好后重新上传");
							msg.setMessage("您上传的文件大小超过标准，请压缩好后重新上传");
							return msg;
						}
					}else if("zip".equals(fileName)||"rar".equals(fileName)){
						newFileName = "zipRar" + "/" + format1.format(date) + "/" + format2.format(date) + "/"
								+ format3.format(date) + "/"  + uuid + multipartFile.getOriginalFilename()
								.substring(multipartFile.getOriginalFilename().lastIndexOf("."));
					}else{
						msg.setStatus(StandardResult.FAIL);
						msg.setData("暂不支持该格式");
						msg.setMessage("暂不支持该格式");
						return msg;
					}
					String path = uploadPath + newFileName;
					File saveDir = new File(path);
					if (!saveDir.getParentFile().exists()) {
						saveDir.getParentFile().mkdirs();
					}
					multipartFile.transferTo(saveDir);
					if("mov".equals(fileName)||"mp4".equals(fileName)||"mv".equals(fileName)||"avi".equals(fileName)){
						 Encoder encoder = new Encoder();
						 MultimediaInfo m = encoder.getInfo(saveDir);
						 map.put("pictureWidth", m.getVideo().getSize().getWidth());
						 map.put("pictureHeight", m.getVideo().getSize().getHeight());
						 map.put("duration", m.getDuration()/1000);
					}
					map.put("sourceUrl", host+newFileName);
					map.put("absolutelyUrl", path);
					list.add(map);
				}
				msg.setStatus(StandardResult.SUCCESS);
				msg.setData(list);
				msg.setMessage("success");
				return msg;
			}else{
				msg.setStatus(StandardResult.FAIL);
				msg.setData("文件资源暂未选中");
				msg.setMessage("文件资源暂未选中");
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setStatus(StandardResult.FAIL);
			msg.setData("系统异常");
			msg.setMessage("error");
			return msg;
		}
	}
	
	public static void main(String[] args) throws InputFormatException, EncoderException {
		 File file = new File("C:/Users/Administrator/Desktop/1.mp4");
		 Encoder encoder = new Encoder(); 
		 MultimediaInfo m = encoder.getInfo(file);
		 System.out.println(m.getVideo().getSize().getWidth());
		 System.out.println(m.getVideo().getSize().getHeight());
	}
}
