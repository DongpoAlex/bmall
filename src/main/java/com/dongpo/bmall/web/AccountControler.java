package com.dongpo.bmall.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by AlexBob on 2016/1/22.
 */
@RestController
@RequestMapping("/api")
public class AccountControler {

    private JdbcUserDetailsManager userManager;


    @Autowired
    public AccountControler(DataSource dataSource) {
        userManager = new JdbcUserDetailsManager();
        userManager.setDataSource(dataSource);
    }

    @CrossOrigin
    @RequestMapping("/user")
    @ResponseBody
    public Principal user(Principal user) {
        return user;
    }


    @CrossOrigin
    @RequestMapping("/changePassword")
    public Map<String, Object> changePassword(@RequestParam("oldPwd") String oldPwd,
                                              @RequestParam("newPwd") String newPwd){
        Map<String, Object> model = new HashMap<>();
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        if (currentUser == null) {
            model.put("id", "LE500");
            model.put("content", "系统认证错误，请重新登陆！");
            model.put("status", "500");
            return model;
        }
        String username = currentUser.getName();
        UserDetails user = userManager.loadUserByUsername(username);
        if(user.getPassword()!=oldPwd){
            model.put("id", "LE501");
            model.put("content", "原始登陆密码错误,请重试.");
            model.put("status", "500");
            return model;
        }
        userManager.changePassword(oldPwd, newPwd);
        SecurityContextHolder.clearContext();
        model.put("id", "LE200");
        model.put("content", "密码修改成功!");
        model.put("status", "200");
        return model;
    }
}
