package com.shj.code.util;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
public class DownFileUtils {

	 /** * 从url获取文件内容的字节数组 * @param fileUrl * @return */
    public byte[] loadFileByteFromURL(String fileUrl) {
        if (fileUrl.startsWith("http://")) {
            return this.httpConverBytes(fileUrl);
        } else if (fileUrl.startsWith("https://")) {
            return this.httpsConverBytes(fileUrl);
        } else {
            return null;
        }
    }
	
    /** * @MethodName httpConverBytes * @Description http路径文件内容获取 * * @param path * @return */
    public byte[] httpConverBytes(String fileUrl) {
        BufferedInputStream in = null;
        ByteArrayOutputStream out = null;
        URLConnection conn = null;

        try {
            URL url = new URL(fileUrl);
            conn = url.openConnection();

            in = new BufferedInputStream(conn.getInputStream());

            out = new ByteArrayOutputStream(1024);
            byte[] temp = new byte[1024];
            int size = 0;
            while ((size = in.read(temp)) != -1) {
                out.write(temp, 0, size);
            }
            byte[] content = out.toByteArray();
            return content;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    
    /** * @MethodName httpsConverBytes * @Description https路径文件内容获取 * * @param url * @return */
    private byte[] httpsConverBytes(String fileUrl) {
        BufferedInputStream inStream = null;
        ByteArrayOutputStream outStream = null;

        try {

            TrustManager[] tm = { new TrustAnyTrustManager() };
            SSLContext sc = SSLContext.getInstance("SSL", "SunJSSE");
            sc.init(null, tm, new java.security.SecureRandom());
            URL console = new URL(fileUrl);

            HttpsURLConnection conn = (HttpsURLConnection) console.openConnection();
            conn.setSSLSocketFactory(sc.getSocketFactory());
            conn.setHostnameVerifier(new TrustAnyHostnameVerifier());
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("GET");
            conn.connect();

            inStream = new BufferedInputStream(conn.getInputStream());
            outStream = new ByteArrayOutputStream();

            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = inStream.read(buffer)) != -1) {
                outStream.write(buffer, 0, len);
            }

            byte[] content = outStream.toByteArray();
            return content;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null != inStream) {
                try {
                    inStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (null != outStream) {
                try {
                    outStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return null;
    }
    
    /** * 信任证书的管理器 * @author Administrator * */
    private static class TrustAnyTrustManager implements X509TrustManager {
        public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
        }

        public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
        }

        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[] {};
        }
    }
    
    private static class TrustAnyHostnameVerifier implements HostnameVerifier {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    }
    
    public static String getExtensionName(String filename) {
        if (filename != null && filename.length() > 0) {
            int dot = filename.lastIndexOf('.');
            if (dot > -1 && dot < filename.length() - 1) {
                return filename.substring(dot + 1);
            }
        }
        return filename;
    }
    
    public static void main(String[] args){
    	DownFileUtils fileUrlUtils = new DownFileUtils();
        String fileUrl = "https://iit.axiwenhua.cn/files/posterPictureKV/2021/04/15/3a552d78682749df8452a573d9ebdfac.png";
        try {
            byte[] fileBytes = fileUrlUtils.loadFileByteFromURL(fileUrl);
            if(fileBytes != null){
                System.out.println("fileBytes length:"+fileBytes);
            }else{
                System.out.println("fileBytes == null");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
