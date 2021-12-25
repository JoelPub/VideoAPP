package com.shj.code.util;

/**
 * @Author	: daixiang
 * @Date	: 2021年3月13日
 */
public class BizException extends RuntimeException{

    private ResultEnum re;

    public BizException(ResultEnum resultEnum) {
        super(resultEnum.getMessage());
    }

    public BizException(String issue) {
        super(issue);
    }
    
    public BizException(ResultEnum re, String issue) {
        super(issue);
        this.re = re;
    }

	public ResultEnum getRe() {
		return re;
	}

	public void setRe(ResultEnum re) {
		this.re = re;
	}
    
}
