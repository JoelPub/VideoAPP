
package com.shj.code.util;

import io.swagger.annotations.ApiModelProperty;
import org.apache.poi.ss.formula.functions.T;

import java.io.Serializable;

/**
 * @author mabo
 */
public class StandardResult<T> implements BaseResultInterface, Serializable {

    private static final long serialVersionUID = -1071412523166004880L;
    @ApiModelProperty(value = "返回状态")
    private Integer status;
    @ApiModelProperty(value = "返回信息")
    private String message;
    @ApiModelProperty(value = "返回对象")
    private T data;

    public StandardResult() {
        this.status = SUCCESS;
        this.message = "";
    }

    public StandardResult(Integer status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }


    public static <T> StandardResult<T> success(T t) {
        StandardResult<T> result = new StandardResult<>();
        result.setStatus(SUCCESS);
        result.setData(t);
        return result;
    }
}
