# 基于java镜像创建新镜像
FROM openjdk:8u191-jdk-alpine3.9
# 作者
MAINTAINER gtb
# 将jar包添加到容器中并更名为app.jar
ADD  target/gtb-zht-0.0.1-SNAPSHOT.jar zht.jar
# 运行jar包
ENTRYPOINT ["nohup","java","-jar","zht.jar","&"]
