// package com.shj.code.config.mybatis;
//
// import java.sql.SQLException;
// import java.util.Properties;
//
// import org.apache.ibatis.plugin.Interceptor;
// import org.apache.ibatis.session.SqlSessionFactory;
// import org.mybatis.spring.SqlSessionFactoryBean;
// import org.mybatis.spring.SqlSessionTemplate;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
// import org.springframework.core.io.support.ResourcePatternResolver;
// import org.springframework.jdbc.datasource.DataSourceTransactionManager;
// import org.springframework.transaction.PlatformTransactionManager;
// import org.springframework.transaction.annotation.EnableTransactionManagement;
// import org.springframework.transaction.annotation.TransactionManagementConfigurer;
//
// import com.alibaba.druid.pool.DruidDataSource;
// import com.github.pagehelper.PageHelper;
//
// @Configuration
// @EnableTransactionManagement
// public class MybatisConf implements TransactionManagementConfigurer{
//
// 	private Logger logger = LoggerFactory.getLogger(MybatisConf.class);
//
//     @Autowired
//     private MybatisProp prop;
//
//     @Value("${spring.datasource.url}")
//     private String dbUrl;
//
//     @Value("${spring.datasource.username}")
//     private String username;
//
//     @Value("${spring.datasource.password}")
//     private String password;
//
//     @Value("${spring.datasource.driverClassName}")
//     private String driverClassName;
//
//     @Value("${spring.datasource.initialSize}")
//     private int initialSize;
//
//     @Value("${spring.datasource.minIdle}")
//     private int minIdle;
//
//     @Value("${spring.datasource.maxActive}")
//     private int maxActive;
//
//     @Value("${spring.datasource.maxWait}")
//     private int maxWait;
//
//     @Value("${spring.datasource.timeBetweenEvictionRunsMillis}")
//     private int timeBetweenEvictionRunsMillis;
//
//     @Value("${spring.datasource.minEvictableIdleTimeMillis}")
//     private int minEvictableIdleTimeMillis;
//
//     @Value("${spring.datasource.validationQuery}")
//     private String validationQuery;
//
//     @Value("${spring.datasource.testWhileIdle}")
//     private boolean testWhileIdle;
//
//     @Value("${spring.datasource.testOnBorrow}")
//     private boolean testOnBorrow;
//
//     @Value("${spring.datasource.testOnReturn}")
//     private boolean testOnReturn;
//
//     @Value("${spring.datasource.poolPreparedStatements}")
//     private boolean poolPreparedStatements;
//
//     @Value("${spring.datasource.maxPoolPreparedStatementPerConnectionSize}")
//     private int maxPoolPreparedStatementPerConnectionSize;
//
//     @Value("${spring.datasource.filters}")
//     private String filters;
//
//     @Value("{spring.datasource.connectionProperties}")
//     private String connectionProperties;
//
//     /**
//      *
//      * @return
//      */
//     @Bean(name="dataSource")
//     public DruidDataSource createDataSource(){
//         DruidDataSource druidDataSource = new DruidDataSource();
//         druidDataSource.setUrl(dbUrl);
//         druidDataSource.setDriverClassName(driverClassName);
//         druidDataSource.setUsername(username);
//         druidDataSource.setPassword(password);
//         druidDataSource.setInitialSize(initialSize);
//         druidDataSource.setMinIdle(minIdle);
//         druidDataSource.setMaxActive(maxActive);
//         druidDataSource.setMaxWait(maxWait);
//         druidDataSource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
//         druidDataSource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
//         druidDataSource.setValidationQuery(validationQuery);
//         druidDataSource.setTestWhileIdle(testWhileIdle);
//         druidDataSource.setTestOnBorrow(testOnBorrow);
//         druidDataSource.setTestOnReturn(testOnReturn);
//         druidDataSource.setPoolPreparedStatements(poolPreparedStatements);
//         druidDataSource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
//         try {
//         	druidDataSource.setFilters(filters);
//         } catch (SQLException e) {
//             e.printStackTrace();
//             logger.error("druid configuration initialization filter", e);
//         }
//         druidDataSource.setConnectionProperties(connectionProperties);
//         return druidDataSource;
//     }
//
//     /**
//      * 分页插件
//      * @return
//      */
//     @Bean(name = "sqlSessionFactory")
//     public SqlSessionFactory sqlSessionFactoryBean(){
//         SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
//         bean.setDataSource(createDataSource());
//         //别名包
//         bean.setTypeAliasesPackage(prop.getTypeAliasesPackage());
//         //分页插件
//         PageHelper pageHelper = new PageHelper();
//         Properties properties = new Properties();
//         properties.setProperty("reasonable", "false");
//         properties.setProperty("supportMethodsArguments", "true");
//         properties.setProperty("returnPageInfo", "check");
//         properties.setProperty("params", "count=countSql");
//         pageHelper.setProperties(properties);
//
//         //添加插件
//         bean.setPlugins(new Interceptor[]{pageHelper});
//         //添加XML目录
//         ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
//         try {
//             //设置mapper 目录，这些都可以配置到配置文件中，直接注入进来接可以了
//             bean.setMapperLocations(resolver.getResources(prop.getMapperLocations()));
//             return bean.getObject();
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new RuntimeException(e);
//         }
//
//
//     };
//
//     /**
//      * 整合 spring +mybaits
//      * @param sqlSessionFactory
//      * @return
//      */
//     @Bean
//     public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
//         return new SqlSessionTemplate(sqlSessionFactory);
//     }
//
//
//     /*
//      * 配置注解事物
//      * 相当于xml
//      <!-- spring 事务 -->
//     <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
//         <property name="dataSource" ref="dataSource"/>
//     </bean>
//     <!-- 开启注解事务-->
//     <tx:annotation-driven transaction-manager="transactionManager"/>
//      */
//     public PlatformTransactionManager annotationDrivenTransactionManager() {
//         return new DataSourceTransactionManager(createDataSource());
//     }
// }
