package com.shj.code.filter;

import com.shj.code.util.StandardResult;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 *
 * @author chao.tian
 * @version 1.0.0
 * @date 2021-02-26
 */
@Component
@ControllerAdvice("com.shj.code")
public class ResponseAdvice implements ResponseBodyAdvice {
    @Override
    public Object beforeBodyWrite(Object out, MethodParameter methodParameter,
                                  MediaType mediaType, Class clazz, ServerHttpRequest serverHttpRequest,
                                  ServerHttpResponse serverHttpResponse) {

        if(out instanceof StandardResult) {
            return out;
        }
        return StandardResult.success(out);
    }


    @Override
    public boolean supports(MethodParameter arg0, Class arg1) {
        return true;
    }
}