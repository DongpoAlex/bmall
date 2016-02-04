package com.dongpo.bmall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

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
    public String redirect(HttpServletResponse response) {
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

    @RequestMapping(value = "/download/app/{name}", method = RequestMethod.GET)
    public void downloadFile(@PathVariable("name") String name,HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.android.package-archive");
        response.setHeader("Content-Disposition", String.format("inline; filename=\"" + name +".apk\""));
        InputStream inputStream =  new FileSystemResource("D:/bmall/app_setup/"+name+".apk").getInputStream();
        FileCopyUtils.copy(inputStream, response.getOutputStream());
    }
}
