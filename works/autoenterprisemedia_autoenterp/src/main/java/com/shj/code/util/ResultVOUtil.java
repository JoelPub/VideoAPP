package com.shj.code.util;



public class ResultVOUtil {
	
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static ResultVO success(Object object){
        ResultVO resultVO = new ResultVO();
        resultVO.setData(object);
        resultVO.setMessage(ResultEnum.SYS_SUCCESS.getMessage());
        return resultVO;
    }

    @SuppressWarnings("rawtypes")
	public static ResultVO error(ResultEnum re, String issue) {
        ResultVO resultVO = new ResultVO();
        resultVO.setCode(re.getCode());
        resultVO.setMessage(re.getMessage());
        resultVO.setIssue(issue);
        return resultVO;
    }
}
