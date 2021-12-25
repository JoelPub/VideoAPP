package com.shj.code.service;

import com.shj.code.entity.Disclaimer;
import com.shj.code.mapper.DisclaimerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/***
 * @author Cdl
 * @date 2021/4/25 17:11
 * @describe: TODO
 */
@Service
public class DisclaimerService {
    @Autowired
    private DisclaimerMapper disclaimerMapper;

    public void saveDisclaimer(Disclaimer disclaimer){
        disclaimerMapper.saveDisclaimer(disclaimer);
    }

    public Disclaimer selectDisclaimer(String userId){
        Disclaimer disclaimer=disclaimerMapper.selectDisclaimer(userId);
        return disclaimer;
    }
}
