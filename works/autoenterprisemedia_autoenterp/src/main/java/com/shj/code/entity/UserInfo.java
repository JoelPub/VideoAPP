package com.shj.code.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
@ApiModel("用户")
public class UserInfo{
	@ApiModelProperty(value = "id")
	private String id;
	@ApiModelProperty(value = "总数")
	private String accountNumber;
	@ApiModelProperty(value = "密码")
	private String passWord;
	@ApiModelProperty(value = "用户名称")
	private String userName;
	@ApiModelProperty(value = "手机")
	private String phone;
	@ApiModelProperty(value = "邮箱")
	private String email;
	@ApiModelProperty(value = "描述")
	private String position;
	@ApiModelProperty(value = "区域")
	private String region;
	@ApiModelProperty(value = "村庄")
	private String village;
	@ApiModelProperty(value = "省份")
	private String province;
	@ApiModelProperty(value = "城市")
	private String city;
	@ApiModelProperty(value = "详细名称")
	private String distrName;
	@ApiModelProperty(value = "详细代码")
	private String disCode;
	@ApiModelProperty(value = "角色")
	private Integer role;
	@ApiModelProperty(value = "更新时间")
	private String updataData;
	@ApiModelProperty(value = "创建时间")
	private Date creatData;
	@ApiModelProperty(value = "状态")
	private Integer status;
	@ApiModelProperty(value = "修改")
	private Integer modify;
	@ApiModelProperty(value = "更新状态")
	private Integer updataStatus;
	@ApiModelProperty(value = "阅读状态")
	private Integer readStatus;

	public Integer getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(Integer readStatus) {
		this.readStatus = readStatus;
	}

	public Integer getUpdataStatus() {
		return updataStatus;
	}

	public void setUpdataStatus(Integer updataStatus) {
		this.updataStatus = updataStatus;
	}

	public Integer getModify() {
		return modify;
	}

	public void setModify(Integer modify) {
		this.modify = modify;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrName() {
		return distrName;
	}

	public void setDistrName(String distrName) {
		this.distrName = distrName;
	}

	public String getDisCode() {
		return disCode;
	}

	public void setDisCode(String disCode) {
		this.disCode = disCode;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public String getUpdataData() {
		return updataData;
	}

	public void setUpdataData(String updataData) {
		this.updataData = updataData;
	}

	public Date getCreatData() {
		return creatData;
	}

	public void setCreatData(Date creatData) {
		this.creatData = creatData;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
