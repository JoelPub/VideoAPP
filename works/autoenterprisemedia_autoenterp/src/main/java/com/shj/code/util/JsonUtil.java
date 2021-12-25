package com.shj.code.util;

import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Json格式化工具类
 */
public class JsonUtil {
    public static String toJson(Object object) {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setPrettyPrinting();
        Gson gson = gsonBuilder.create();
        return gson.toJson(object);
    }

    public static <T> T toObject(String json, Class<T> tClass) {
        Gson gson=new Gson();
        T object=gson.fromJson(json, tClass);
        return object;
    }


    /**
     * 实体类根据jsonProperty转json报文
     * @param object
     * @return
     */
    public static String toJsonWithJsonProperty(Object object) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(object);
    }

    /**
     * Json字符串转map
     * @param json
     * @return
     * @throws Exception 
     */
    public static Map jsonToMap(String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Map map=mapper.readValue(json, Map.class);
        return map;

    }

    /**
     * 对MapObject类型数据进行解析
     *
     * @param json
     *            要解析的json字符串
     * @return
     */
    public static Map<String, Object> getMapObj(String json){
        return getMapStr(json);
        // throw new SDKException(SDKExceptionEnums.JSONPASE_ERROR);
    }

    /**
     * 对MapString类型数据进行解析
     *
     * @param json
     *            要解析的json字符串
     * @return
     */
    public static Map<String, Object> getMapStr(String json) {
        Map map = JSON.parseObject(json, Map.class);
        Map<String, Object> map2 = JSON.parseObject(json, new TypeReference<Map<String, Object>>() {
        });
        return JSON.parseObject(json, new TypeReference<Map<String, Object>>() {
        });
    }

    public static void main(String[] args) throws Exception {
        String json = "{\n" +
                "\"msg\":\"\",\n" +
                "\"params\":{\"backendToken\":\"ip76w9FgSjaxuN0tajG4Rg==\",\"expiresIn\":7200},\n" +
                "\"resp\":\"00\"\n" +
                "}";
        Map map = jsonToMap(json);
        System.out.println(map);

    }
}
