/**
 * 
 */
package com.shj.code.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class UUIDGenerator {

	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public static String getShortUUID() {
		Date date = new Date();
		long time = date.getTime();
		String tStr = String.valueOf(time);
		return tStr.substring(0, 4) + tStr.substring(tStr.length() - 4, tStr.length());
	}

	public static String getOrderId(String prefix) {
		Date date = new Date();
		long time = date.getTime();
		String tStr = String.valueOf(time);
		int j = (int) (Math.random() * 900) + 100;
		return prefix + tStr + j;
	}

	public static String buildRandom() {
		String dateStr=new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		StringBuffer uuid=new StringBuffer(dateStr);
		for (int i = 0; i < 8; i++) {
			double random = Math.random();
			int a=(int) (random*10);
			uuid.append(a);
		}
		return uuid.toString();

	}

	public static String getNumOrder() {
		return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + (int) (Math.random() * 90000 + 10000);
	}
}
