package com.shj.code.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileUtils {
	
	/**
     * -普通java文件下载方法，适用于所有框架 
     * -注意：
     *     1.  response.setContentType设置下载内容类型，常用下载类型：
     *         application/octet-stream（二进制流，未知文件类型）；
     *         application/vnd.ms-excel（excel）；
     *         text/plain（纯文本）； text/xml（xml）；text/html（html）；image/gif（GIF）；image/jpeg（JPG）等
     *         如果不写，则匹配所有；
     *     2.  response.setHeader("Content-Disposition","attachment; filename="+fileName +".zip"); 设置下载文件名；
     *         文件名可能会出现乱码，解决名称乱码：fileName  = new String(fileName.getBytes(), "iso8859-1");
     */ 
	public static String downloadFilesTest(HttpServletRequest request,HttpServletResponse res) throws IOException {
	    try{
			
	    	res.reset();
	    	
	    	//获取文件根目录，不同框架获取的方式不一样，可自由切换  
		    String basePath = request.getSession().getServletContext().getRealPath("/upload/fileDir");  
	
		    //获取文件名称（包括文件格式）  
		    String fileName = IdUtil.createUUID();  
	
		    //组合成完整的文件路径  
		    String targetPath = basePath+File.separator+fileName;  
	
		    //模拟多一个文件，用于测试多文件批量下载  
		    String targetPath1 = basePath+File.separator+"2.jpg";  
		    //模拟文件路径下再添加个文件夹，验证穷举
		    String targetPath2 = basePath+File.separator+"test";
		    
		    System.out.println("文件名："+fileName);  
		    System.out.println("文件路径："+targetPath);  
	
		    //方法1：IO流实现下载的功能  
		    res.setCharacterEncoding("UTF-8"); //设置编码字符
		    res.setContentType("application/octet-stream;charset=UTF-8"); //设置下载内容类型
		    res.setHeader("Content-disposition", "attachment;filename="+fileName);//设置下载的文件名称  
		    OutputStream out = res.getOutputStream();   //创建页面返回方式为输出流，会自动弹出下载框   
	
	
	/*	  //方法1-1：IO字节流下载，用于小文件  
		    System.out.println("字节流下载");  
		    InputStream is = new FileInputStream(targetPath);  //创建文件输入流  
		    byte[] Buffer = new byte[2048];  //设置每次读取数据大小，即缓存大小  
		    int size = 0;  //用于计算缓存数据是否已经读取完毕，如果数据已经读取完了，则会返回-1  
		    while((size=is.read(Buffer)) != -1){  //循环读取数据，如果数据读取完毕则返回-1  
		        out.write(Buffer, 0, size); //将每次读取到的数据写入客户端  
		    }
		    is.close();
	 */  
	    

	/*	  //方法1-2：IO字符流下载，用于大文件  
		    System.out.println("字符流");  
		    File file = new File(targetPath);  //创建文件  
		    FileInputStream fis=new FileInputStream(file);  //创建文件字节输入流  
		    BufferedInputStream bis=new BufferedInputStream(fis); //创建文件缓冲输入流  
		    byte[] buffer = new byte[bis.available()];//从输入流中读取不受阻塞
			bis.read(buffer);//读取数据文件
			bis.close();
			out.write(buffer);//输出数据文件
			out.flush();//释放缓存
			out.close();//关闭输出流
	*/   
	
		    //方法1-3：将附件中多个文件进行压缩，批量打包下载文件  
		    //创建压缩文件需要的空的zip包  
		    String zipBasePath=request.getSession().getServletContext().getRealPath("/upload/zip");  
		    String zipName = "temp.zip";
		    String zipFilePath = zipBasePath+File.separator+zipName;  
	
		    //创建需要下载的文件路径的集合
		    List<String> filePaths = new ArrayList<String>();  
		    filePaths.add(targetPath);  
		    filePaths.add(targetPath1); 
		    filePaths.add(targetPath2);
		    
		    //压缩文件
		    File zip = new File(zipFilePath);  
		    if (!zip.exists()){     
		        zip.createNewFile();     
		    }
		    //创建zip文件输出流  
		    ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zip));
		    zipFile(zipBasePath,zipName, zipFilePath,filePaths,zos);
		    zos.close();
		    res.setHeader("Content-disposition", "attachment;filename="+zipName);//设置下载的压缩文件名称
	
		    //将打包后的文件写到客户端，输出的方法同上，使用缓冲流输出  
		    BufferedInputStream bis = new BufferedInputStream(new FileInputStream(zipFilePath));  
		    byte[] buff = new byte[bis.available()];  
		    bis.read(buff);
		    bis.close();
			out.write(buff);//输出数据文件
			out.flush();//释放缓存
			out.close();//关闭输出流
	
	    }catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 压缩文件
	 * @param zipBasePath 临时压缩文件基础路径
	 * @param zipName 临时压缩文件名称
	 * @param zipFilePath 临时压缩文件完整路径
	 * @param filePaths 需要压缩的文件路径集合
	 * @throws IOException
	 */
	public static String zipFile(String zipBasePath, String zipName, String zipFilePath, List<String> filePaths,ZipOutputStream zos) {
		BufferedInputStream bis=null;
	    try {
			//循环读取文件路径集合，获取每一个文件的路径  
			for (String filePath : filePaths) {
				File inputFile = new File(filePath); //根据文件路径创建文件  
				if (inputFile.exists()) { //判断文件是否存在  
					if (inputFile.isFile()) { //判断是否属于文件，还是文件夹  
						//创建输入流读取文件  
						bis = new BufferedInputStream(new FileInputStream(inputFile));

						//将文件写入zip内，即将文件进行打包
						zos.putNextEntry(new ZipEntry(System.currentTimeMillis()+inputFile.getName()));

						//写入文件的方法，同上                  
						int size = 0;
						byte[] buffer = new byte[1024]; //设置读取数据缓存大小
						while ((size = bis.read(buffer)) > 0) {
							zos.write(buffer, 0, size);
						}
						//关闭输入输出流  
						zos.closeEntry();
						bis.close();

					} else { //如果是文件夹，则使用穷举的方法获取文件，写入zip  
						try {
							File[] files = inputFile.listFiles();
							List<String> filePathsTem = new ArrayList<String>();
							for (File fileTem : files) {
								filePathsTem.add(fileTem.toString());
							}
							return zipFile(zipBasePath, zipName, zipFilePath, filePathsTem, zos);
						} catch (Exception e) {
							e.printStackTrace();
							//log.error(e.getMessage(),e);
						}
					}
				}
			} 
		} catch (Exception e) {
			e.printStackTrace();
			//log.error(e.getMessage(),e);
			return null;
		} finally {
            if(null != zos) {
            	try {
            		zos.closeEntry();
            		zos.close();
            	} catch (IOException e) {
            		e.printStackTrace();
            	}
            }
            if(null != bis) {
            	try {
            		bis.close();
            	} catch (IOException e) {
            		e.printStackTrace();
            	}
            }
        }
		return null;
	}
	
	
	/**
	 * 删除文件夹（强制删除）
	 */
	public static void deleteAllFilesOfDir(File path) {
		if (null != path) {
			if (!path.exists())
				return;
			if (path.isFile()) {
				boolean result = path.delete();
				int tryCount = 0;
				while (!result && tryCount++ < 10) {
					System.gc(); // 回收资源
					result = path.delete();
				}
			}
			File[] files = path.listFiles();
			if (null != files) {
				for (int i = 0; i < files.length; i++) {
					deleteAllFilesOfDir(files[i]);
				}
			}
			path.delete();
		}
	}


	/**
	 * 添加文件
	 */
	public static boolean creatFile(String pathname) throws IOException{
		boolean result = false;
		File file = new File(pathname);
		if (!file.exists()) {
			file.createNewFile();
			result = true;
		}
		return result;
	}
	
	/**
	 * 删除文件
	 */
	public static boolean deleteFile(String pathname){
		boolean flag = false;
    	File file = new File(pathname);
    	// 推断文件夹或文件是否存在  
        if (!file.exists()) {  // 不存在返回 false  
            return flag;  
        } else {  
            // 推断是否为文件  
            if (file.isFile()) {  // 为文件时调用删除文件方法  
                file.delete();
                flag = true;
            } 
        }
        return flag;
	}


	/** 
	 * 删除单个文件或文件夹 
	 */  
	public static void deleat(File file) {
		//检查文件是否存在，如果不存在直接返回，不进行下面的操作
		 //检查文件是否存在，如果不存在直接返回，不进行下面的操作
        if(!file.exists()){
            return;
        }
        //如果是文件删除，就删除文件，然后返回，不进行下面的操作
        if(file.isFile()){
            file.delete();
            return;
        }
        //是文件夹
        if(file.isDirectory()){
        	 //循环所有文件夹里面的内容并删除
            File[] files=file.listFiles();
            if (files!=null) {
            	for (File f : files) {
            		//使用迭代，调用自己
                    deleat(f);
                }
            }
        }
	}
	
	/**
	 * 递归遍历指定目录下的所有文件
	 * 文件名路径保存至List<String>
	 * @param path
	 */
	public static List<String> recursiveQueryFile(List<String> filePaths,String path) {
        try {
			File file = new File(path);
			if (file.exists()) {
				File[] files = file.listFiles();
				if (null != files) {
					for (File file2 : files) {
						if (file2.isDirectory()) {
							System.out.println("文件夹:" + file2.getAbsolutePath());
							recursiveQueryFile(filePaths,file2.getAbsolutePath());
						} else {
							System.out.println("文件:" + file2.getName());
							filePaths.add(file2.getAbsolutePath());
						}
					}
				}
			} else {
				System.out.println("文件不存在!");
			}
			
			return filePaths;
		} catch (Exception e) {
			//log.error(e.getMessage(),e);
			throw new RuntimeException();
		}
    }
	
	/**
	 * 删除某目录下所有文件
	 */
	public static boolean delAlls(String filePath) {
		boolean flag = true;
		if(filePath != null) {
			File file = new File(filePath);
	          if(file.exists()) {
	              File[] filePaths = file.listFiles();
	              for(File f : filePaths) {
	                  if(f.isFile()) {
	                      f.delete();
	                 }
	                 if(f.isDirectory()){
	                     String fpath = f.getPath();
	                     delAlls(fpath);
	                     f.delete();
	                 }
	             }
	         }
	     }else {
	    	 flag = false;
	     }
		return flag;
	}
	
}
