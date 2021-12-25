package com.shj.code.controller;

import com.shj.code.api.request.RoleRequest;
import com.shj.code.api.request.UserResourceRequest;
import com.shj.code.api.response.ResourceResponse;
import com.shj.code.api.response.RoleResponse;
import com.shj.code.entity.rbac.AccountRoleDO;
import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.entity.rbac.RoleDO;
import com.shj.code.entity.rbac.RoleResourceSetDO;
import com.shj.code.service.rbac.AccountRoleService;
import com.shj.code.service.rbac.ResourceService;
import com.shj.code.service.rbac.RoleService;
import com.shj.code.session.UserToken;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;


/**
 * 角色管理
 *
 * @author wenliluo
 */
@RestController
@RequestMapping("/gtb/api/role")
@Api(tags = "角色管理")
@Slf4j
// @RefreshScope
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private AccountRoleService accountRoleService;

    @GetMapping("/list")
    @ApiOperation("角色列表")
    public List<RoleResponse> getList(@ApiIgnore HttpServletRequest request) {
        UserToken user = getCurrentUser(request);

        RoleDO roleDO = new RoleDO();
        roleDO.setChannelId(user.getChannelId());
        roleDO.setIsDelete(false);
        List<RoleDO> list = roleService.selectList(roleDO);
        List<RoleResponse> result = list.stream().map(x -> {
            RoleResponse response = new RoleResponse();
            BeanUtils.copyProperties(x, response);
            return response;
        }).collect(Collectors.toList());

        return result;
    }

    @GetMapping("/{id}")
    @ApiOperation("角色详情")
    public RoleResponse getDetail(@PathVariable Long id) {
        RoleDO roleDo = roleService.selectById(id);
        RoleResponse response = new RoleResponse();
        BeanUtils.copyProperties(roleDo, response);
        return response;
    }

    @PutMapping
    @ApiOperation("角色修改")
    public void update(@RequestBody RoleRequest param) {
        RoleDO roleDO = new RoleDO();
        roleDO.setName(param.getName());
        roleDO.setId(param.getId());
        roleService.updateSelectiveById(roleDO);
    }


    @PostMapping
    @ApiOperation("角色添加")
    public void create(@RequestBody @Validated RoleRequest param, @ApiIgnore HttpServletRequest request) {
        RoleDO roleDO = new RoleDO();
        roleDO.setName(param.getName());
        roleDO.setChannelId(getCurrentUser(request).getChannelId());
        roleService.insertSelective(roleDO);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("删除")
    public void delete(@PathVariable Long id) {
        RoleDO roleDO = new RoleDO();
        roleDO.setId(id);
        roleService.delete(roleDO);
    }

    @GetMapping("/{id}/auth")
    @ApiOperation("根据角色id获取权限列表")
    public List<RoleResourceSetDO> getAuth(@PathVariable("id") Long id) {
        return resourceService.queryResourcesByRoleId(id);
    }

    @PostMapping("/auth")
    @ApiOperation("设置权限")
    public void auth(@RequestBody UserResourceRequest resources) {
        resourceService.updateRoleResource(resources.getRoleId(), resources.getResourceIds());
    }


    @GetMapping("/menu")
    @ApiOperation("获取当前角色的菜单")
    public List<ResourceResponse> getMenuByRoleId(@ApiIgnore HttpServletRequest request) {
        UserToken user = getCurrentUser(request);
        List<AccountRoleDO> roles = accountRoleService.selectByAccount(Long.valueOf(user.getUserId()));
        if (CollectionUtils.isEmpty(roles)) {
            return null;
        }

        List<Long> roleList = roles.stream().map(AccountRoleDO::getRoleId).collect(Collectors.toList());
        return processResult(resourceService.getMenuByRoleId(roleList));
    }

    private List<ResourceResponse> processResult(List<ResourceDO> result) {
        if (CollectionUtils.isEmpty(result)) {
            return null;
        }

        return result.stream().map(x -> {
            ResourceResponse response = new ResourceResponse();
            BeanUtils.copyProperties(x, response);
            return response;
        }).collect(Collectors.toList());
    }

    @ApiOperation("获取当前角色在某界面的权限")
    @GetMapping("/{pageCode}/subResource")
    public List<ResourceResponse> getResourceByPage(@PathVariable("pageCode") String pageCode, @ApiIgnore HttpServletRequest request) {
        UserToken user = getCurrentUser(request);
        List<AccountRoleDO> roles = accountRoleService.selectByAccount(user.getUserId());
        if (CollectionUtils.isEmpty(roles)) {
            return null;
        }
        List<Long> roleList = roles.stream().map(AccountRoleDO::getRoleId).collect(Collectors.toList());
        return processResult(resourceService.getRoleResourceByPage(roleList, pageCode));
    }

}
