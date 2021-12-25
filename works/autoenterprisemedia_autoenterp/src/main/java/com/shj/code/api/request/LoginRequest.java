package com.shj.code.api.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginRequest {
    @NotNull
    private String account;

    @NotNull
    private String password;
}
