import _ from "lodash"

export default {
  state: {
    width: 1280,
    height: 720,
    currentPlaybackPosition: 0, // 当前播放的位置（秒）
    // 编辑器的视频数据
    videoData: {
      videos: [], // 视频片段
      images: [], // 图片
      audios: [], // 音频
      subtitles: [], // 字幕
    },
    // 当前选中的元素的 UUID，没有任何选中时值为 null
    selectedItemUUID: null,
    // 历史操作数据用于undo redo
    historyCache: [],
    // 当前编辑器数据的回放指针
    currentHistoryIndex: -1,
    // 是否正在播放
    isPlaying: false,
  },
  mutations: {
    /**
     * 重置所有数据
     */
    RESET_DATA(state) {
      state.currentPlaybackPosition = 0
      state.videoData = {
        videos: [], // 视频片段
        images: [], // 图片
        audios: [], // 音频
        subtitles: [], // 字幕
      }
      state.selectedItemUUID = null
      state.historyCache = []
      state.currentHistoryIndex = -1
      state.isPlaying = false
    },
    /**
     * 插入指定类型的媒体数据
     * @param state
     * @param type
     * @param data
     */
    INSERT_MEDIA(state, {type, data}) {
      data.type = type
      state.videoData[type + "s"].push(data)
    },
    /**
     * 设置选中的项目
     * @param state
     * @param {{uuid: String}|String} itemUUID
     */
    SET_SELECTED_ITEM(state, itemUUID) {
      state.selectedItemUUID = itemUUID.uuid || itemUUID
    },
    /**
     * 删除指定 ID 的元素
     * @param state
     * @param itemUUID
     */
    DELETE_VIDEO_ITEM(state, itemUUID) {
      const uuid = itemUUID.uuid || itemUUID
      state.videoData.images = state.videoData.images.filter(item => item.uuid !== uuid)
      state.videoData.videos = state.videoData.videos.filter(item => item.uuid !== uuid)
      state.videoData.audios = state.videoData.audios.filter(item => item.uuid !== uuid)
      state.videoData.subtitles = state.videoData.subtitles.filter(item => item.uuid !== uuid)
    },
    /**
     * 新增一条历史纪录
     * @param state
     */
    ADD_HISTORY_CACHE(state) {
      if (state.currentHistoryIndex + 1 < state.historyCache.length) {
        state.historyCache.splice(state.currentHistoryIndex + 1)
      }
      state.historyCache.push({
        videoData: _.cloneDeep(state.videoData),
      })
      // 限制undo 纪录步数，最多支持100步操作undo
      state.historyCache.splice(100)
      state.currentHistoryIndex++
    },
    /**
     * 设置视频数据
     */
    SET_VIDEO_DATA(state, data) {
      state.videoData = data
    },
    /**
     * 设置播放状态
     */
    SET_PLAY_STATUS(state, isPlaying) {
      state.isPlaying = isPlaying
      if (isPlaying) {
        state.selectedItemUUID = null
      }
    },
    SET_VIDEO_SIZE(state, {width, height}) {
      state.width = width
      state.height = height
    },
    relapceVideoState(state, data) {
      state.videoData = _.cloneDeep(data.videoData)
    },
    /**
     *
     * @param state
     */
    videoUndo(state) {
      state.currentHistoryIndex--
    },
    /**
     *
     * @param state
     */
    videoRedo(state) {
      state.currentHistoryIndex++
    },
  },
  actions: {
    videoUndo({commit, state, getters}) {
      if (!getters.isVideoCanUndo) {
        return
      }
      const prevState = state.historyCache[state.currentHistoryIndex - 1]
      commit("relapceVideoState", _.cloneDeep(prevState))
      commit("videoUndo")
    },

    videoRedo({commit, getters, state}) {
      if (!getters.isVideoCanRedo) {
        return
      }
      const prevState = state.historyCache[state.currentHistoryIndex + 1]
      commit("relapceVideoState", _.cloneDeep(prevState))
      commit("videoRedo")
    },
    // 初始化视频数据
    INIT_VIDEO_DATA(ctx, data) {
      data = Object.assign({}, {
        videos: [], // 视频片段
        images: [], // 图片
        audios: [], // 音频
        subtitles: [], // 字幕
      }, data || {})
      ctx.commit("RESET_DATA")
      ctx.commit("SET_VIDEO_DATA", data)
      ctx.commit("ADD_HISTORY_CACHE")
    },
    /**
     * 插入媒体
     */
    INSERT_MEDIA(ctx, {type, data}) {
      ctx.commit("INSERT_MEDIA", {
        type,
        data,
      })
      ctx.commit("ADD_HISTORY_CACHE")
    },
    /**
     * 删除指定的视频元素
     * @param ctx
     * @param itemUUID
     * @constructor
     */
    DELETE_VIDEO_ITEM(ctx, itemUUID) {
      ctx.commit("DELETE_VIDEO_ITEM", itemUUID)
      ctx.commit("ADD_HISTORY_CACHE")
    },
  },
  getters: {
    isVideoCanUndo(state) {
      return state.currentHistoryIndex > 0
    },
    isVideoCanRedo(state) {
      return state.historyCache.length > state.currentHistoryIndex + 1
    },
    // 计算视频的总时长（最大时长）
    videoDuration(state) {
      const media = [].concat(
        state.videoData.videos,
        state.videoData.images,
        state.videoData.audios,
        state.videoData.subtitles,
      )
      return Math.max(...media.map(item => item.endTime))
    },
    // 当前选中的对象
    selectedItem(state) {
      if (!state.selectedItemUUID) {
        return null
      }
      const result = []
        .concat(
          state.videoData.videos,
          state.videoData.images,
          state.videoData.audios,
          state.videoData.subtitles,
        )
        .filter(item => item.uuid === state.selectedItemUUID)
      return result.length ? result[0] : null
    },
  },
}
