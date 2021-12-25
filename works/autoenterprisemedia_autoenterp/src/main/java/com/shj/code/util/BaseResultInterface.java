package com.shj.code.util;
public interface BaseResultInterface {

	/**
	 * 成功
	 */
	public static final Integer SUCCESS = 200;

	/**
	 * 失败
	 */
	public static final Integer FAIL = 500;

	/**
	 * 没有对应的接口
	 */
	public static final Integer SERVICE_NOT_LEGITIMATE = 401;

	/**
	 * 签名认证错误
	 */
	public static final Integer SIGN_ERROR = 403;
	
	/**
	 * 参数不全
	 */
	public static final Integer PARAM_MISSING = 402;
	
	/**
	 * 系统错误
	 */
	public static final Integer SYSTEM_ERROR = 501;
	
	/**
	 * ORDER_RESOURCE未授权，在系统中不存在
	 */
	public static final Integer ORDER_RESOURCE_NOT_EXIST = 502;
	/**
	 * token无效
	 */
	public static final Integer TOKEN_OVER = 503;
	/**
	 * 时间搓错误
	 */
	public static final Integer TIME_STEMP_ERROR = 504;
	/**
	 * 自定义错误
	 */
	public static final Integer CUSTOM_FAIL = 505;

}
