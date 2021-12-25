package com.shj.code.controller;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLEncoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;
/***
 * 下载资源
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-文件下载",tags = "后台管理-文件下载")
public class DownFileController {
	
	
	@GetMapping(value="downFile")
    @ApiOperation(value = "下载文件")
	public StandardResult downFile(HttpServletResponse response,HttpServletRequest request){
		StandardResult msg  =  new StandardResult();
		try{
			String fileUrl = request.getParameter("fileUrl");
			System.out.println(fileUrl);
			//String fileUrl = "https://iit.axiwenhua.cn/files/video/2021/04/15/0c865cc9066643148b872c8147fb30e7.mp4";
			download(response,fileUrl);
			msg.setData("ok");
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	
    @SuppressWarnings("static-access")
	public void download(HttpServletResponse response,String fileUrl){
        //为文件的url地址:如文件在tomcat的更目录下的那个地址
        //String fileUrl = "https://iit.axiwenhua.cn/files/video/2021/04/15/0c865cc9066643148b872c8147fb30e7.mp4";
        // 初始化文件流，提供客户端下载
        if(fileUrl!=null && !"".equals(fileUrl)){
            InputStream in = null;
            OutputStream outs=null;
            BufferedInputStream bins=null;
            BufferedOutputStream bouts=null;
            try {
                URL url = new URL(fileUrl);
                in = url.openStream();
                if(in!=null){
                    bins=new BufferedInputStream(in);//放到缓冲流里面
                    outs=response.getOutputStream();//获取文件输出IO流
                    bouts=new BufferedOutputStream(outs);
                    response.setContentType("application/x-download");//设置response内容的类型 普通下载类型
                    //response.setContentType("application/vnd.android.package-archive");//设置response内容的类型 下载安卓应用apk
                    //response.setContentLength((int) file.length());//设置文件大小
                    String fileName = fileUrl.substring(fileUrl.lastIndexOf("/")+1); //文件名
                    response.setHeader("Content-disposition","attachment;filename="+ URLEncoder.encode(fileName, "UTF-8"));//设置头部信息
                    int bytesRead = 0;
                    byte[] buffer = new byte[8192];
                    //开始向网络传输文件流
                    while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {
                        bouts.write(buffer, 0, bytesRead);
                    }
                    bouts.flush();//这里一定要调用flush()方法
 
                }else{
                    response.sendError(response.SC_NOT_FOUND, "下载的文件不存在");
                }
               
            } catch (Exception e) {
                e.printStackTrace();
                try {
                    response.sendError(response.SC_NOT_FOUND, e.getMessage());
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            } finally {
                try {
                    in.close();
                    bins.close();
                    outs.close();
                    bouts.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }else{
            try {
                response.sendError(response.SC_NOT_FOUND, "文件路径不正确");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
