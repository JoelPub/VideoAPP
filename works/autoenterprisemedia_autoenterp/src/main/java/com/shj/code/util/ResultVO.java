package com.shj.code.util;

/**
 * http请求返回的最外层对象
 */
//@ApiModel(description = "通用返回实体")
public class ResultVO<T> {
    
	/** code码 */
    //@ApiModelProperty(value = "code码")
    private String code;
    
    /** 提示信息 */
   //@ApiModelProperty(value = "提示信息")
    private String message;
    
    /** 指示错误参数的位置 */
    //@ApiModelProperty(value = "指示错误参数的位置")
    private String field;
    
    /** 具体错误原因 */
    //@ApiModelProperty(value = "提示信息")
    private String issue;
    
    /** 具体内容 */
    //@ApiModelProperty(value = "具体返回报文")
    private T data;

    public ResultVO setDate(T t){
        this.data=t;
        return this;
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

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getIssue() {
		return issue;
	}

	public void setIssue(String issue) {
		this.issue = issue;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
