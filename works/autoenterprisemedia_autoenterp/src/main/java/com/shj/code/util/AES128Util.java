package com.shj.code.util;

import java.security.AlgorithmParameters;
import java.security.Key;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

public class AES128Util {
	// 算法名
	public static final String KEY_NAME = "AES";
	// 加解密算法/模式/填充方式
	// ECB模式只用密钥即可对数据进行加密解密，CBC模式需要添加一个iv
	public static final String CIPHER_ALGORITHM = "AES/CBC/PKCS7Padding";

	/**
	 * 微信 数据解密<br/>
	 * 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充<br/>
	 * 对称解密的目标密文:encrypted=Base64_Decode(encryptData)<br/>
	 * 对称解密秘钥:key = Base64_Decode(session_key),aeskey是16字节<br/>
	 * 对称解密算法初始向量:iv = Base64_Decode(iv),同样是16字节<br/>
	 *
	 * @param encrypted 目标密文
	 * @param session_key 会话ID
	 * @param iv 加密算法的初始向量
	 */
	public static String wxDecrypt(String encrypted, String session_key, String iv) {
		String json = null;
		byte[] encrypted64 = Base64.decodeBase64(encrypted);
		byte[] key64 = Base64.decodeBase64(session_key);
		byte[] iv64 = Base64.decodeBase64(iv);
		//byte[] data;
		try {
			init();
			json = new String(decrypt(encrypted64, key64, generateIV(iv64)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return json;
	}

	/**
	 * 初始化密钥
	 */
	public static void init() throws Exception {
		Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
		KeyGenerator.getInstance(KEY_NAME).init(128);
	}

	/**
	 * 生成iv
	 */
	public static AlgorithmParameters generateIV(byte[] iv) throws Exception {
		// iv 为一个 16 字节的数组，这里采用和 iOS 端一样的构造方法，数据全为0
		// Arrays.fill(iv, (byte) 0x00);
		AlgorithmParameters params = AlgorithmParameters.getInstance(KEY_NAME);
		params.init(new IvParameterSpec(iv));
		return params;
	}

	/**
	 * 生成解密
	 */
	public static byte[] decrypt(byte[] encryptedData, byte[] keyBytes, AlgorithmParameters iv)
			throws Exception {
		Key key = new SecretKeySpec(keyBytes, KEY_NAME);
		Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM);
		// 设置为解密模式
		cipher.init(Cipher.DECRYPT_MODE, key, iv);
		return cipher.doFinal(encryptedData);
	}

	public static void main(String[] args) {
		// 微信demo中的测试数据
		/*String encrypted = "5Ujl50QZecMtB8HbrBKLYoccwX60EVyZq8psSpSqLJfiIXKf6ut+SD/muW9Fxz8VPsz3Hutktjwnh1yVDr9Zy/WH+jMXlKxNmLFYYYkaC/jz1Rxs5tTc2oKnGwH9fzoDspQfVmGtv9srdezNY42JacqDufP5SLMk7++XugEaS2Vn4Sl5AobofjYvbtCxwR3328vMqHKg/K5Q5FhkOB3e2A==";
		String session_key = "uS/QLkS7f8SQjAIC4M4lXg==";
		String iv = "qyMJLxVxxVYT4PEY5j0uPg==";
		String json = wxDecrypt(encrypted, session_key, iv);
		System.out.println(json);*/
		// 微信demo中的测试数据
		String encrypted = "ZEazyodjNJug3DEIr122bwZjscfaCJSS4Lxf+OGwYgJcQLeVKI/Y4nbHTkSIv3nSwygSOFpXdzG/+bjiJxPKZ/LDXhkqLdMAk0HKBMEyVQ6fLrLO/slaTHTOMiplk4ueKmOLIJ8JS/Sq47MSWfGGqYaMVBPN4tCN5nCjq+/D7WByUwo3UolEdWW4DuspVUmJeLQk3oPGFGm4CSxv0NjDAg==";
		String session_key = "KMKZkCvBbGOni0/nF3d2RQ==";
		String iv = "etM0lJDnG5FVGiim1dTlJw==";
		String json = wxDecrypt(encrypted, session_key, iv);
		System.out.println(json);
	}
}