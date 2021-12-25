package com.shj.code.config.spring;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Component
@Configuration
class WebConfigurer extends WebMvcConfigurerAdapter {
	
	@Value("${bootdo.uploadPath}")
	private String uploadPath;
	
	@Value("${bootdo.ffmpegPath}")
	private String ffmpefMedia;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/files/**").addResourceLocations("file:///"+uploadPath);
		registry.addResourceHandler("/ffmpegMedia/**").addResourceLocations("file:///"+ffmpefMedia);
	}
	
	/*@Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 多个拦截器组成一个拦截器链
        // addPathPatterns 用于添加拦截规则
        // excludePathPatterns 用户排除拦截
		registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
        super.addInterceptors(registry);
    }*/
}