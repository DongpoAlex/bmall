package com.dongpo.bmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.webjars.WebJarAssetLocator;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

/**
 * Created by AlexBob on 2015/12/15.
 */
@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
@Controller
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @ResponseBody
    @RequestMapping("/webjarslocator/{webjar}/**")
    public ResponseEntity locateWebjarAsset(@PathVariable String webjar, HttpServletRequest request) {
        try {
            String mvcPrefix = "/webjarslocator/" + webjar + "/"; // This prefix must match the mapping path!
            String mvcPath = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
            String fullPath = new WebJarAssetLocator().getFullPath(webjar, mvcPath.substring(mvcPrefix.length()));
            return new ResponseEntity(new ClassPathResource(fullPath), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * angular route
     * @return
     */
    @RequestMapping(value = "/{path:[^\\.]*}{extension:[^(api)]}")
    public String redirect() {return "forward:/";}
    @RequestMapping(value = "/{path:[^\\.]*}{extension:[^api]}/{path:[^\\.]*}")
    public String redirectS() {return "forward:/";}

    @CrossOrigin
    @RequestMapping("/api/user")
    @ResponseBody
    public Principal user(Principal user) {return user;}

}
