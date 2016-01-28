package com.dongpo.bmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by AlexBob on 2015/12/15.
 */
@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
@Controller
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * angular route
     *
     * @return
     */
    @RequestMapping(value = "/{path:[^\\.]*}{extension:[^(api)]}")
    public String redirect() {
        return "forward:/";
    }

    @RequestMapping(value = "/{path:[^\\.]*}{extension:[^api]}/{path:[^\\.]*}")
    public String redirectS() {
        return "forward:/";
    }

    @RequestMapping(value = "/404")
    public String notFound() {
        return "forward:/goods/img/not_found_404.jpg";
    }
}
