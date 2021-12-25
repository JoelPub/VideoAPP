package com.shj.code.util;

public enum ResultEnum {
	
	SYS_SUCCESS("100000", "处理成功"),
	
	SYS_ERROR("100001", "系统错误"),
	
	SYS_DOWN("100002", "服务下线"),
	
	SYS_NOT_USE("100003","服务不可用"),
	
	SYS_NOT_FIND("100004","请求的资源不存在"),
	
	SYS_SIGN_ERROR("100005","签名验证错误"),
	
	SYS_TIMER_OUT("100006","请求频率超过限制"),
	
	SYS_AUTHOR_ERROR("100007","权限错误"),
	
	SYS_PARAM_ERROR("100101","请求参数错误"),
	
	SYS_CONFICT("100102","请求冲突");

    private String code;

    private String message;

    ResultEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
