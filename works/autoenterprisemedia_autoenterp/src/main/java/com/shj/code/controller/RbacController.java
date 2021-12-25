package com.shj.code.controller;

import com.shj.code.annotation.RequiresPermissions;
import com.shj.code.api.request.LoginRequest;
import com.shj.code.api.request.RoleAccountRequest;
import com.shj.code.api.response.ResourceGetResponse;
import com.shj.code.entity.rbac.AccountDO;
import com.shj.code.entity.rbac.AccountRoleSetDO;
import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.service.TokenService;
import com.shj.code.service.rbac.AccountRoleService;
import com.shj.code.service.rbac.AccountService;
import com.shj.code.service.rbac.ResourceService;
import com.shj.code.session.UserToken;
import com.shj.code.util.BizException;
import com.shj.code.util.StandardResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/***
 * 车型板块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api/rbac")
@Api(tags = "后台管理-用户权限管理demo")
public class RbacController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private AccountRoleService accountRoleService;


    @PostMapping(value = "login")
    @ApiOperation(value = "登录")
    public StandardResult<String> login(@RequestBody LoginRequest param) {
        AccountDO login = accountService.login(param);
        if (login == null) {
            throw new BizException("登录失败");
        }

        String token = tokenService.generateToken(login.getId());

        return StandardResult.success(token);
    }


    @GetMapping(value = "menu")
    @ApiOperation(value = "查询当前用户菜单权限列表")
    public StandardResult<List<ResourceGetResponse>> getCarInfoList(@ApiIgnore HttpServletRequest request) {
        UserToken userInfo = tokenService.getUserInfo(request);
        List<ResourceDO> list = resourceService.getResourceByAccount(userInfo.getUserId());
        List<ResourceGetResponse> result = list.stream().map(x -> {
            ResourceGetResponse response = new ResourceGetResponse();
            BeanUtils.copyProperties(x, response);
            return response;
        }).collect(Collectors.toList());
        return StandardResult.success(result);
    }

    @PostMapping("/role")
    @ApiOperation("给用户设置角色")
    public void setRole(@RequestBody @Validated RoleAccountRequest param) {
        accountRoleService.updateAccountRole(param.getAccountId(), param.getRoleIdList());
    }

    @GetMapping("{id}/role")
    @ApiOperation("根据id获取账号的角色(全量，带标记)")
    public List<AccountRoleSetDO> getRole(@PathVariable Long id) {
        AccountDO account = accountService.selectById(id);
        if (account == null) {
            throw new BizException("fail");
        }
        List<AccountRoleSetDO> list = accountRoleService.selectRolesByAccountId(id, account.getChannelId());
        return list;
    }


    @GetMapping(value = "test")
    @ApiOperation(value = "测试权限（经销商列表）")
    @RequiresPermissions(value = {"dealer:list"})
    public void test() {

    }
}
