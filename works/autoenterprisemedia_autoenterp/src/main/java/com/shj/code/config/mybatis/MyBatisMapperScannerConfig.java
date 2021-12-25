// package com.shj.code.config.mybatis;
// import org.mybatis.spring.mapper.MapperScannerConfigurer;
// import org.springframework.boot.autoconfigure.AutoConfigureAfter;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// /**
//  * mybatis 扫描类配置
//  * @author like
//  *
//  */
// @Configuration
// //注意，由于MapperScannerConfigurer执行的比较早，所以必须有下面的注解
// @AutoConfigureAfter(MybatisConf.class)
// public class MyBatisMapperScannerConfig {
// 	@Bean
//     public MapperScannerConfigurer mapperScannerConfigurer() {
//         MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
//         mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
//         mapperScannerConfigurer.setBasePackage("com.shj.code.mapper");
//         return mapperScannerConfigurer;
//     }
// }
