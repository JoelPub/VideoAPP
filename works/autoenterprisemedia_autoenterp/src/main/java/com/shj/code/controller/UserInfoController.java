package com.shj.code.controller;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.shj.code.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import com.github.pagehelper.PageInfo;
import com.shj.code.entity.DistributorCity;
import com.shj.code.entity.DistributorCode;
import com.shj.code.entity.DistributorInfo;
import com.shj.code.entity.DistributorMain;
import com.shj.code.entity.DistributorProvince;
import com.shj.code.entity.DistributorSmall;
import com.shj.code.entity.UserInfo;
import com.shj.code.util.BaseResultInterface;
import com.shj.code.util.StandardResult;
import com.shj.code.util.UUIDGenerator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/***
 * 用户板块
 * @author mabo
 *
 */
@RestController
@RequestMapping("/gtb/api")
@Api(value = "后台管理-用户",tags = "后台管理-用户")
public class UserInfoController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private DistributorCityService distributorCityService;
	
	@Autowired
	private DistributorCodeService distributorCodeService;
	
	@Autowired
	private DistributorInfoService distributorInfoService;
	
	@Autowired
	private DistributorMainService distributorMainService;
	
	@Autowired
	private DistributorProvinceService distributorProvinceService;
	
	@Autowired
	private DistributorSmallService distributorSmallService;

	@Autowired
	private TokenService tokenService;
	
	/***
	 * 区域注册
	 * @param entity
	 * @return
	 */
	@PostMapping(value="regin")
	@ApiOperation(value = "区域注册")
	public StandardResult regin(@RequestBody UserInfo entity){
		StandardResult msg  =  new StandardResult();
		try{
			if(entity.getRole().intValue()==1){
				List<DistributorCode> list =distributorCodeService.getList();
				for(int i = 0;i<list.size();i++){
					String code = list.get(i).getCode();
					if(code.equals(entity.getDisCode())){
						Integer userCount = userInfoService.getUserCount(entity.getDisCode());
						if(userCount>=2){
							msg.setData("允许同家经销商注册2个账号");
							msg.setMessage("允许同家经销商注册2个账号");
							msg.setStatus(BaseResultInterface.SYSTEM_ERROR);
							return msg;
						}else{
							//处理
							UserInfo un = userInfoService.regin(entity.getDisCode(),entity.getPosition());
							if(un!=null){
								msg.setData("允许同家经销商职位注册1个账号");
								msg.setMessage("允许同家经销商职位注册1个账号");
								msg.setStatus(BaseResultInterface.SYSTEM_ERROR);
								return msg;
							}else{
								UserInfo ue = userInfoService.logins(entity.getAccountNumber(), entity.getPassWord());
								if(ue!=null){
									msg.setData("账号密码已注册");
									msg.setMessage("账号密码已注册");
									msg.setStatus(BaseResultInterface.SYSTEM_ERROR);
									return msg;
								}else{
									ue = new UserInfo();
									ue.setId(UUIDGenerator.getUUID());
									ue.setAccountNumber(entity.getAccountNumber());
									ue.setPassWord(entity.getPassWord());
									ue.setDisCode(entity.getDisCode());
									ue.setDistrName(entity.getDistrName());
									ue.setEmail(entity.getEmail());
									ue.setPhone(entity.getPhone());
									ue.setPosition(entity.getPosition());
									ue.setProvince(entity.getProvince());
									ue.setRegion(entity.getRegion());
									ue.setRole(entity.getRole());
									ue.setStatus(1);
									ue.setModify(1);
									ue.setUpdataData(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
									ue.setCreatData(new Date());
									ue.setUserName(entity.getUserName());
									ue.setVillage(entity.getVillage());
									ue.setCity(entity.getCity());
									ue.setReadStatus(1);
									userInfoService.saveUser(ue);
									msg.setData(ue);
									msg.setMessage("success");
									msg.setStatus(BaseResultInterface.SUCCESS);
									return msg;
								}
							}
						}
					}
				}
				msg.setData("该经销商未查到，请检查code是否正确");
				msg.setMessage("该经销商未查到，请检查code是否正确");
				msg.setStatus(BaseResultInterface.ORDER_RESOURCE_NOT_EXIST);
				return msg;
			}else{
				UserInfo uo = userInfoService.logins(entity.getAccountNumber(), entity.getPassWord());
				if(uo!=null){
					msg.setData("账号密码已注册");
					msg.setMessage("账号密码已注册");
					msg.setStatus(BaseResultInterface.FAIL);
					return msg;
				}else {
					uo = new UserInfo();
					uo.setId(UUIDGenerator.getUUID());
					uo.setAccountNumber(entity.getAccountNumber());
					uo.setPassWord(entity.getPassWord());
					uo.setUserName(entity.getUserName());
					uo.setEmail(entity.getEmail());
					uo.setPhone(entity.getPhone());
					uo.setDisCode(entity.getAccountNumber());
					uo.setRole(entity.getRole());
					uo.setStatus(1);
					uo.setModify(1);
					uo.setDisCode("0");
					uo.setReadStatus(1);
					uo.setUpdataData(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
					userInfoService.saveUser(uo);
					msg.setData(uo);
					msg.setMessage("success");
					msg.setStatus(BaseResultInterface.SUCCESS);
					return msg;
					
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	
	/***
	 * 登录
	 * @param accountNumber
	 * @param passWord
	 * @return
	 */
	@GetMapping(value="login")
	@ApiOperation(value = "登录")
	public StandardResult login(String accountNumber, String passWord){
		StandardResult msg  =  new StandardResult();
		try{
			List<UserInfo> list = userInfoService.getUserListLogin(accountNumber, passWord);
			UserInfo uf = null;
			if(list.size()>0){
				uf = list.get(0);
				if(uf!=null&&uf.getStatus().intValue()==1){
					msg.setData(uf);
					msg.setMessage("success");
//					msg.setMessage(tokenService.generateToken(Long.valueOf(uf.getId())));
					msg.setStatus(BaseResultInterface.SUCCESS);
					return msg;
				}else if(uf!=null&&uf.getStatus().intValue()==2){
					msg.setData("登录失败");
					msg.setMessage("用户已被禁用");
					msg.setStatus(BaseResultInterface.FAIL);
					return msg;
				}else{
					msg.setData("登录失败");
					msg.setMessage("您输入的账号密码错误");
					msg.setStatus(BaseResultInterface.FAIL);
					return msg;
				}
			}else{
				msg.setData("登录失败");
				msg.setMessage("您输入的账号密码错误");
				msg.setStatus(BaseResultInterface.FAIL);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 修改 个人信息
	 * @param entity
	 * @return
	 */
	@PostMapping(value="updateUserInfo")
	@ApiOperation(value = "修改 个人信息")
	public StandardResult updateUserInfo(@RequestBody UserInfo entity){
		StandardResult msg  =  new StandardResult();
		try{
			UserInfo uf = userInfoService.findById(entity.getId());
			if(uf!=null){
				uf.setPassWord(entity.getPassWord());
				uf.setUserName(entity.getUserName());
				uf.setPhone(entity.getPhone());
				uf.setPosition(entity.getPosition());
				uf.setEmail(entity.getEmail());
				uf.setRegion(entity.getRegion());
				uf.setVillage(entity.getVillage());
				uf.setProvince(entity.getProvince());
				uf.setCity(entity.getCity());
				uf.setDistrName(entity.getDistrName());
				uf.setDisCode(entity.getDisCode());
				uf.setUpdataData(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
				uf.setCreatData(new Date());
				uf.setModify(2);
				uf.setReadStatus(2);
				userInfoService.updateUser(uf);
				msg.setData(uf);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
		return null;
	}
	
	/***
	 * 查看个人信息
	 * @param id
	 * @return
	 */
	@GetMapping(value="findUserById")
	@ApiOperation(value = "查看个人信息")
	public StandardResult<UserInfo> findUserById(String id){
		StandardResult msg  =  new StandardResult();
		try{
			msg.setData(userInfoService.findById(id));
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}

	/***
	 * 五级联动
	 * @return
	 */
	@GetMapping(value="selectDistributorInfo")
	@ApiOperation(value = "五级联动")
	public StandardResult selectDistributorInfo(String mainId,String smallId,String provinceId,String cityId){
		StandardResult msg  =  new StandardResult();
		try{
			List<DistributorMain> listMain = distributorMainService.getList();
			if(("".equals(mainId)&&"".equals(smallId)&&"".equals(provinceId)&&"".equals(cityId))
				||(mainId==null&&smallId==null&&provinceId==null&&cityId==null)){
				msg.setStatus(StandardResult.SUCCESS);
				msg.setData(listMain);
				msg.setMessage("success");
				return msg;
			}else if(StringUtils.isNotBlank(mainId)){
				List<DistributorSmall> listSmall = distributorSmallService.getList(mainId);
				msg.setData(listSmall);
				msg.setMessage("success");
				msg.setStatus(StandardResult.SUCCESS);
				return msg;
			}else if(StringUtils.isNotBlank(smallId)){
				List<DistributorProvince> listProvince =distributorProvinceService.getList(smallId);
				msg.setData(listProvince);
				msg.setMessage("success");
				msg.setStatus(StandardResult.SUCCESS);
				return msg;
			}else if(StringUtils.isNotBlank(provinceId)){
				List<DistributorCity> listCity = distributorCityService.getList(provinceId);
				msg.setData(listCity);
				msg.setMessage("success");
				msg.setStatus(StandardResult.SUCCESS);
				return msg;
			}else if(StringUtils.isNotBlank(cityId)){
				List<DistributorInfo> listInfo = distributorInfoService.getList(cityId);
				msg.setData(listInfo);
				msg.setMessage("success");
				msg.setStatus(StandardResult.SUCCESS);
				return msg;
			}else {
				msg.setData("参数不允许为空");
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.CUSTOM_FAIL);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 账号启用禁用
	 * @param id
	 * @return
	 */
	@GetMapping(value="userStatus")
	@ApiOperation(value = "账号启用禁用")
	public StandardResult userStatus(String id){
		StandardResult msg  =  new StandardResult();
		try{
			UserInfo uf = userInfoService.findById(id);
			uf.setUpdataData(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			uf.setCreatData(new Date());
			userInfoService.updateUser(uf);
			if(uf.getStatus().intValue()==1){
				jdbcTemplate.execute("update user_info set status = 2 where id ='"+id+"'");
			}else{
				jdbcTemplate.execute("update user_info set status = 1 where id ='"+id+"'");
			}
			UserInfo uu = userInfoService.findById(id);
			msg.setData(uu);
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 新增经销商
	 * @param entity
	 * @return
	 */
	@PostMapping(value="saveUser")
	@ApiOperation(value = "新增经销商")
	public StandardResult saveUser(@RequestBody DistributorInfo entity){
		StandardResult msg  =  new StandardResult();
		try{
			DistributorInfo in = distributorInfoService.findCode(entity.getCode());
			if(in!=null){
				msg.setData("该经销商已添加");
				msg.setMessage("该经销商已添加");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else{
				DistributorInfo df = new DistributorInfo();
				df.setCityId(entity.getCityId());
				df.setName(entity.getName());
				df.setCode(entity.getCode());
				distributorInfoService.save(entity);
			}
			msg.setData("ok");
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 经销商列表
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@GetMapping(value="userInfoList")
	@ApiOperation(value = "经销商列表")
	public StandardResult<Map<String, Object>> userInfoList(String pageIndex,String pageSize){
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		StandardResult msg  =  new StandardResult();
		try{
			PageInfo<UserInfo> list = userInfoService.getUserList(startIndex, maxResults);
			Map<String, Object> map = new HashMap<>();
			map.put("userList", list);
			map.put("count", userInfoService.getUserCountInfo());
			msg.setData(map);
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 已读判断
	 * @return
	 */
	@GetMapping(value="readList")
	@ApiOperation(value = "已读判断")
	public StandardResult readList(){
		StandardResult msg  =  new StandardResult();
		try{
			jdbcTemplate.execute("update user_info set modify = 1 where updataStatus =1");
			msg.setData("ok");
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	/***
	 * 信息更新
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@GetMapping(value="InformationUser")
	@ApiOperation(value = "信息更新")
	public StandardResult<Map<String, Object>> InformationUser(String pageIndex,String pageSize,String search){
		StandardResult msg  =  new StandardResult();
		int startIndex=1,maxResults=10;
		if(StringUtils.isNotBlank(pageIndex)){
			startIndex=Integer.valueOf(pageIndex);
		}
		if(StringUtils.isNotBlank(pageSize)){
			maxResults=Integer.valueOf(pageSize);
		}
		try{
			PageInfo<UserInfo> list = userInfoService.getUserInfoList(startIndex, maxResults,search);
			if(list.getList().size()>0){
				JSONArray jsa = new JSONArray();
				JSONObject jso = null;
				UserInfo uf = null;
				for(int i=0;i<list.getList().size();i++){
					jso = new JSONObject();
					uf = list.getList().get(i);
					if(uf.getReadStatus().intValue()==2){
						jso.put("id", uf.getId());
						jso.put("distrName", uf.getDistrName());
						jso.put("disCode", uf.getDisCode());
						jso.put("userName", uf.getUserName());
						jso.put("position", uf.getPosition());
						jso.put("phone", uf.getPhone());
						jso.put("email", uf.getEmail());
						jso.put("passWord", uf.getPassWord());
						jso.put("accountNumber", uf.getAccountNumber());
						jso.put("updataData", uf.getUpdataData());
					}else{
						jso.put("id", uf.getId());
						jso.put("distrName", uf.getDistrName());
						jso.put("disCode", uf.getDisCode());
						jso.put("userName", uf.getUserName());
						jso.put("position", uf.getPosition());
						jso.put("phone", uf.getPhone());
						jso.put("email", uf.getEmail());
						jso.put("passWord", uf.getPassWord());
						jso.put("accountNumber", uf.getAccountNumber());
					}
					jsa.element(jso);
				}
				PageInfo<UserInfo> listed = new PageInfo<>(jsa);
				listed.setTotal(list.getTotal());
				listed.setPages(list.getPages());
				listed.setPageNum(list.getPageNum());
				listed.setPageSize(list.getPageSize());
				listed.setSize(list.getSize());
				listed.setStartRow(list.getStartRow());
				listed.setEndRow(list.getEndRow());
				Map<String, Object> map = new HashMap<>();
				map.put("userList", listed);
				msg.setData(map);
				msg.setMessage("success");
				msg.setStatus(BaseResultInterface.SUCCESS);
				return msg;
			}else{
				msg.setData("暂无信息");
				msg.setMessage("暂无信息");
				msg.setStatus(BaseResultInterface.CUSTOM_FAIL);
				return msg;
			}
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	
	/***
	 * 批量修改信息
	 * @param jsonInfo
	 * @return
	 */
	@PostMapping(value="batchUpdata")
	@ApiOperation(value = "批量修改信息")
	public Object batchUpdata(@RequestBody String arrayStr){
		StandardResult msg = new StandardResult();
		try{
			//JSONObject jsonObject = JSONObject.parseObject(arrayStr);
			JSONArray json = JSONArray.fromObject(net.sf.json.JSONObject.fromObject(arrayStr).get("arrayStr"));
			//JSONArray json = JSONArray.fromObject(jsonObject.get("arrayStr"));
			if(json.size()>0){
				for(int i=0;i<json.size();i++){
					UserInfo su = userInfoService.findById(json.getJSONObject(i).getString("id"));
					if(su!=null){
						su.setUserName(json.getJSONObject(i).getString("userName"));
						su.setPassWord(json.getJSONObject(i).getString("passWord"));
						su.setPhone(json.getJSONObject(i).getString("phone"));
						su.setEmail(json.getJSONObject(i).getString("email"));
						su.setPosition(json.getJSONObject(i).getString("position"));
						userInfoService.updateUser(su);
					}
				}
			}
			msg.setData("ok");
			msg.setMessage("success");
			msg.setStatus(BaseResultInterface.SUCCESS);
			return msg;
		}catch(Exception e){
			e.printStackTrace();
			msg.setData("error");
			msg.setMessage("系统异常");
			msg.setStatus(BaseResultInterface.FAIL);
			return msg;
		}
	}
	
	public static void main(String[] args) {
		//数字
		System.out.println((int)((Math.random()*9+1)*100000));
		//字母
		System.out.println("生成的10为随机数为：" + getCharAndNumr(8));
		
		System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		
		System.out.println(new Date());
	}
	
	/**
	 * java生成随机数字和字母组合
	 * @param length[生成随机数的长度]
	 * @return
	*/
	public static String getCharAndNumr(int length) {
	  String val = "";
	  Random random = new Random();
	  for (int i = 0; i < length; i++) {
	   // 输出字母还是数字
	   String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
	   // 字符串
	   if ("char".equalsIgnoreCase(charOrNum)) {
	    // 取得大写字母还是小写字母
	    int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
	    val += (char) (choice + random.nextInt(26));
	   } else if ("num".equalsIgnoreCase(charOrNum)) { // 数字
	    val += String.valueOf(random.nextInt(10));
	   }
	  }
	  return val;
	 }
}
