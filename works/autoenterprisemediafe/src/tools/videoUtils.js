import {createUUID} from "@/utils"

export function buildVideoTemplateFromMetadata(fileName, src, path, width, height, duration) {
  return JSON.stringify({
    metadata: {
      width,
      height,
      duration,
    },
    videos: [
      {
        uuid: createUUID(),
        source: src,
        path,
        fileName,
        originalWidth: width,
        originalHeight: height,
        clipStartTime: 0,
        clipEndTime: duration,
        startTime: 0,
        endTime: duration,
        mute: false,
      }
    ],
  })
}

/**
 * 在视频数据提交到接口之前进行格式化，将尺寸数值取整、时间数据格式化到小数点后三位
 * @param videoData
 */
export function formatVideoData(videoData) {
  if (videoData.metadata) {
    videoData.metadata.width = _floor(videoData.metadata.width)
    videoData.metadata.height = _floor(videoData.metadata.height)
    videoData.metadata.duration = _toDecimals(videoData.metadata.duration)
  }

  videoData.videos = videoData.videos.map(item => {
    item.clipStartTime = _toDecimals(item.clipStartTime)
    item.clipEndTime = _toDecimals(item.clipEndTime)
    item.startTime = _toDecimals(item.startTime)
    item.endTime = _toDecimals(item.endTime)
    return item
  })

  videoData.audios = videoData.audios.map(item => {
    item.clipStartTime = _toDecimals(item.clipStartTime)
    item.clipEndTime = _toDecimals(item.clipEndTime)
    item.startTime = _toDecimals(item.startTime)
    item.endTime = _toDecimals(item.endTime)
    return item
  })

  videoData.images = videoData.images.map(item => {
    item.startTime = _toDecimals(item.startTime)
    item.endTime = _toDecimals(item.endTime)
    item.left = _floor(item.left)
    item.top = _floor(item.top)
    item.width = _floor(item.width)
    item.height = _floor(item.height)
    return item
  })

  videoData.subtitles = videoData.subtitles.map(item =>  {
    item.startTime = _toDecimals(item.startTime)
    item.endTime = _toDecimals(item.endTime)
    item.left = _floor(item.left)
    item.top = _floor(item.top)
    item.width = _floor(item.width)
    item.height = _floor(item.height)
    return item
  })

  return videoData
}

function _toDecimals(num) {
  return parseFloat((+num).toFixed(3))
}

function _floor(num) {
  return Math.floor(num)
}

