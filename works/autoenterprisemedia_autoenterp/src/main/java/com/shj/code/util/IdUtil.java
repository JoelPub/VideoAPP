package com.shj.code.util;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

/**
 * @desc 主键生成工具类
 * 
 * */
public class IdUtil {
	/**
	 * @desc 生成20长度的唯一字符串
	 * 
	 * */
	public static synchronized String createUUID(){
		//
		return createUUIDByDATE();
	}
	
	
	public static synchronized String createUUID(String flag){
		//
		return createUUIDByDATE(flag);
	}


	/**
	 * @desc 字符串为null或是空字符串，返回true
	 * 
	 * */
	public static boolean isNull(String str){
		if(str == null || str.length() == 0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * @desc List为null 或 size = 0，返回true
	 * 
	 * */
	public static boolean isNull(List list){
		if(list == null || list.size() == 0){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 生成token
	 * @return
	 */
	private static synchronized String createUUIDByJDK(){
		//字段长度为36
		return UUID.randomUUID().toString();
	}
	private static String createUUIDByDATE(){        
	    //字段长度为20
	    return DateUtil.getDateStyleFromID().format(new Date()) + String.valueOf(new Random().nextInt(999));
	}
	
	private static String createUUIDByDATE(String flag) {
		//字段长度为20
	    return flag + DateUtil.getDateStyle1FromID().format(new Date())+ String.valueOf(new Random().nextInt(900)+100);
	}
	
	/**
	 * 获取一个指定长度的随机数
	 * @param step 长度
	 * @return int 随机数
	 */
    public static int getRandomNum (int step){
	    int min=(int)Math.pow(10,step-1);
        int max=min*10-1;
        Random random = new Random();
        int s = random.nextInt(max)%(max-min+1) + min;
	    return s;
	}
	
	public static void main(String[] args){
		for(int i=0;i<10;i++){
			String id  =IdUtil.createUUID("NA");
			System.out.println("UUID:"+id);
		}
		for(int i=0;i<10;i++){
			String id  =IdUtil.createUUIDByJDK();
			System.out.println("TOKEN:"+id);
		}
		System.out.println();
	}
}
