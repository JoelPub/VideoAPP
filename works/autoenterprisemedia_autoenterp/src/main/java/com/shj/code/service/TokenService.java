package com.shj.code.service;

import com.shj.code.entity.rbac.ResourceDO;
import com.shj.code.enumration.ErrorEnum;
import com.shj.code.exception.CommonJsonException;
import com.shj.code.mapper.rbac.AccountMapper;
import com.shj.code.service.rbac.AccountRoleService;
import com.shj.code.service.rbac.ResourceService;
import com.shj.code.service.rbac.RoleResourceService;
import com.shj.code.session.UserToken;
import com.shj.code.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class TokenService {

    @Autowired
    AccountMapper loginDao;

    @Autowired
    ResourceService resourceService;

    @Autowired
    RoleResourceService roleResourceService;

    @Autowired
    AccountRoleService accountRoleService;

    @Autowired
    StringRedisTemplate redisTemplate;

    /**
     * 用户登录验证通过后(sso/帐密),生成token,记录用户已登录的状态
     */
    public String generateToken(Long userId) {
        MDC.put("userId", String.valueOf(userId));
        String token = UUID.randomUUID().toString().replace("-", "").substring(0, 20);
        //设置用户信息缓存
        setCache(token, userId);
        return token;
    }

    public UserToken getUserInfo(HttpServletRequest request) {
        String token = MDC.get("token");
        return getUserInfoFromCache(request.getHeader("token"));
    }

    /**
     * 根据token查询用户信息
     * 如果token无效,会抛未登录的异常
     */
    private UserToken getUserInfoFromCache(String token) {
        if (StringUtils.isEmpty(token)) {
            throw new CommonJsonException(ErrorEnum.E_20011);
        }
        log.debug("根据token从缓存中查询用户信息,{}", token);
        UserToken info = JsonUtil.toObject(redisTemplate.opsForValue().get("token_" + token), UserToken.class);
        if (info == null) {
            log.info("没拿到缓存 token={}", token);
            throw new CommonJsonException(ErrorEnum.E_20011);
        }
        return info;
    }

    private void setCache(String token, Long userId) {
        UserToken info = getUserInfoByUsername(userId);
        log.info("设置用户信息缓存:token={} , username={}, info={}", token, userId, info);
        redisTemplate.opsForValue().set("token_" + token, JsonUtil.toJson(info), 24, TimeUnit.HOURS);
    }

    /**
     * 退出登录时,将token置为无效
     */
    public void invalidateToken() {
        String token = MDC.get("token");
        if (!StringUtils.isEmpty(token)) {
        }
        log.debug("退出登录,清除缓存:token={}", token);
    }

    private UserToken getUserInfoByUsername(Long userId) {
        UserToken userInfo = loginDao.getUserInfo(userId);
        if (userInfo.getAdmin().equals(1)) {
            //管理员,查出全部按钮和权限码
            userInfo.setResourceList(resourceService.getAllMenus());
        } else {
            List<ResourceDO> roles = resourceService.getResourceByAccount(userId);
            userInfo.setResourceList(roles);
        }
        return userInfo;
    }
}
