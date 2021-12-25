import ajax from '../http/index'

export default class Api extends ajax {
  userLogin(data) {
    return this.get('gtb/api/login', data)
  }

  userRes(data) {
    return this.post('gtb/api/regin', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  updateUserinfo(data) {
    return this.post('gtb/api/updateUserInfo', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  getUserinfo(data) {
    return this.get('gtb/api/findUserById', data)
  }

  getDisInfo(data) {
    return this.get('gtb/api/selectDistributorInfo', data)
  }

  addMerchant(data) {
    return this.post('gtb/api/saveUser', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  getMerchantMap(data) {
    return this.get('gtb/api/userInfoList', data)
  }

  updateMerchantMap(data) {
    return this.get('gtb/api/InformationUser', data)
  }

  updateMerchant(data) {
    return this.get('gtb/api/userStatus', data)
  }

  updateMerchants(data) {
    return this.post('gtb/api/batchUpdata', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  updateInfoReadList(data) {
    return this.get('gtb/api/readList', data)
  }

  // 历史素材
  myassetsList(data) {
    return this.get('gtb/api/selectUserWorksInfo', data)
  }

  collectTemplate(data) {
    return this.get('gtb/api/collectTemplate', data)
  }

  selectInfoBycarModel(data) {
    return this.get('gtb/api/selectVlookup', data)
  }

  // 排序
  selectVlookupByTime(data) {
    return this.get('gtb/api/selectVlookupByTime', data)
  }

  // 历史收藏
  historyCollectList(data) {
    return this.get('gtb/api/selectUserTemplateInfo', data)
  }

  temPlateList(data) {
    return this.get('gtb/api/selectInfoByMake', data)
  }

  // 历史编辑
  historyEditList(data) {
    return this.get('gtb/api/selectInfoByIsEdit', data)
  }

  // 时间排序（编辑和收藏）
  temSortList(data) {
    return this.get('gtb/api/timeSortByType', data)
  }

  // 素材排序
  matTimeSort(data) {
    return this.get('gtb/api/timeSort', data)
  }

  upLoadFile(data) {
    return this.post('gtb/api/uploadFile', data)
  }

  getCarInfoList(data) {
    return this.get('gtb/api/getCarInfoList', data)
  }

  getCategoryInfoList(data) {
    return this.get('gtb/api/getCategoryInfoList', data)
  }

  selectInfoByMaterialType(data) {
    return this.get('gtb/api/selectInfoByMaterialType', data)
  }

  searchTemplate(data) {
    return this.get('gtb/api/searchTemplate', data)
  }

  searchUserTemplate(data) {
    return this.get('gtb/api/searchUserTemplate', data)
  }

  templateEditDel(data) {
    return this.get('gtb/api/deleteUserInfo', data)
  }

  templatHistoryDel(data) {
    return this.get('gtb/api/deleteTemplate', data)
  }

  saveWorksInfo(data) {
    return this.post('gtb/api/saveWorksInfo', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  savaPoster(data) {
    return this.post('gtb/api/savaPoster', data, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  getDownloadUrl(data) {
    return this.get('gtb/api/getDownload', data)
  }

  downFile(data) {
    return this.get('gtb/api/downFile', data, 'arraybuffer')
  }

  // 超级管理员删除素材
  deleteMedia (data) {
    return this.get('gtb/api/deleteMedia', data)
  }


  /**
   * 海报编辑个人中心图片
   */
  H5GetImgListUser(data) {

    return this.get('gtb/api/getPictureList', data)

  }


  /**
   * 海报编辑公共素图片列表
   */
  H5GetImgListCommon(data) {

    return this.get('gtb/api/materialInfo', data)

  }

  /**
   * 海报详情查看接口
   */
  H5GetInfoById(data){
    return this.get('gtb/api/findByIdWorksInfo', data)
  }

  /**
   * 查看详情总部区域
   */
  GetInfoByIdPublic(data){
    return this.get('gtb/api/findByIdTemplateInfo', data)
  }


  /**
   * 海报编辑形状列表
   */
  H5GetXZList(data) {
    return this.get('gtb/api/iconList', data)
  }

  // VideoGetImgList(data){
  //    return this.get('api/getVideoList', data)
  // }

  VideoGetVideoList(data){
    return this.get('gtb/api/getVideoList', data)
  }

  // 上传图片作为主图
  UploadFile(formData) {
    return this.post('gtb/api/uploadFile', formData,{'Content-Type':'multipart/form-data'})
  }

  // 保存海报、视频
  SaveWorksInfo(data) {
    return this.post('gtb/api/saveWorksInfos', data, {'Content-Type':'application/json'})
  }

  SavePosters(data) {
    return this.post('gtb/api/savaPosters', data, {'Content-Type':'application/json'})
  }

  //更新海报、视频
  UpdateWorksInfo(data){
    return this.post('gtb/api/updateWorksInfo', data, {'Content-Type':'application/json'})
  }

  //总部区域编辑
  UpdatePoster(data){
    return this.post('gtb/api/updatePoster', data, {'Content-Type':'application/json'})
  }

  // 批量上传文件
  SaveWorksInfos(data) {
    return this.post('gtb/api/saveWorksInfo', data, {'Content-Type':'application/json'})
  }

  //删除个人中心素材

  DelteUserInfo(data){
    return this.get('gtb/api/deleteUserInfo', data)
  }

  DoShare(data) {
    return this.post('gtb/api/userShare', data,{'Content-Type':'application/json'})
  }

  // 添加免责声明
    saveDisclaimer (data) {
      return this.get('gtb/api/saveDisclaimer', data)
    }


    // 查询
    selectDisclaimer (data) {
      return this.get('gtb/api/selectDisclaimer', data)
    }

    parsePsd(formData) {
      return this.post('/node', formData)
    }
  // 经销商查看视频信息
  findByIdWorksInfo(data) {
    return this.get('gtb/api/findByIdWorksInfo',data)
  }

  // 总部查看视频信息
  findByIdTemplateInfo(data) {
    return this.get('gtb/api/findByIdTemplateInfo',data)
  }

  // 新建接口
  videoMerge(data) {
    return this.post('gtb/api/merge',data,{'Content-Type':'application/json'})
  }

  //总部保存
  savaPosters(data){
    return this.post('gtb/api/savaPosters',data,{'Content-Type':'application/json'})
  }

  // 获取音频列表
  getAudioList(data) {
    return this.get('gtb/api/getAudioList', data)
  }

  // 获取公共视频素材
  getPublicVideos(data) {
    return this.get('gtb/api/materialVideoInfo', data)
  }
}
