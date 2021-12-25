package com.shj.code.controller;
import com.google.common.collect.Lists;
import com.shj.code.util.*;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
@Transactional
public class WebVideoControllerTest {
    @Autowired
    WebVideoController controller;

    @Test
    public void merge() {
//        Video video = new Video();
//        video.setPath("");
//        video.setSource("");
//        video.setStartTime(0);
//        video.setEndTime(0);
//        video.setClipStartTime(0);
//        video.setClipEndTime(0);
//        video.setMute(false);
//        video.setOriginalWidth(0);
//        video.setOriginalHeight(0);
//
//        Audio audio = new Audio();
//        audio.setPath("");
//        audio.setSource("");
//        audio.setClipStartTime(0);
//        audio.setClipEndTime(0);
//        audio.setStartTime(0);
//        audio.setEndTime(0);
//
//        Subtitle subtitle = new Subtitle();
//        subtitle.setText("");
//        subtitle.setStartTime(0);
//        subtitle.setEndTime(0);
//        subtitle.setFontSize("");
//        subtitle.setFontWeight("");
//        subtitle.setColor("");
//        subtitle.setTextAlign("");
//        subtitle.setLeft(0);
//        subtitle.setTop(0);
//        subtitle.setWidth(0);
//        subtitle.setHeight(0);
//
//        Image image = new Image();
//        image.setPath("");
//        image.setSource("");
//        image.setStartTime(0);
//        image.setEndTime(0);
//        image.setLeft(0);
//        image.setTop(0);
//        image.setWidth(0);
//        image.setHeight(0);
//
//        Metadata metadata = new Metadata();
//        metadata.setWidth(0);
//        metadata.setHeight(0);
//        metadata.setDuration(0);
//
//        VideoMerge videoMerge = new VideoMerge();
//        videoMerge.setVideos(Lists.newArrayList(video));
//        videoMerge.setAudios(Lists.newArrayList(audio));
//        videoMerge.setSubtitles(Lists.newArrayList(subtitle));
//        videoMerge.setImages(Lists.newArrayList(image));
//        videoMerge.setMetadata(metadata);
//
//        StandardResult<Map<String, Object>> result = controller.merge(videoMerge);
//        assert  result.getStatus().equals(200);
    }

    @Test
    public void cutVideoTest() {
//        controller.cutVideoTest()
    }
}