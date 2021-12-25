package com.shj.code.controller;


import com.shj.code.service.TokenService;
import com.shj.code.session.UserToken;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

/**
 * @author steven
 */
@Data
@Slf4j
public abstract class BaseController {

    @Autowired
    private TokenService tokenService;

    public UserToken getCurrentUser(HttpServletRequest request) {
        return tokenService.getUserInfo(request);
    }


}
