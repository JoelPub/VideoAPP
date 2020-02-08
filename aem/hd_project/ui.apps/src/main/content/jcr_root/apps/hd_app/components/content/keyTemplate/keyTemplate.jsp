<%@include file="/libs/foundation/global.jsp"%>
<h1><%= properties.get("title", currentPage.getTitle()) %></h1>
<%
  
io.github.joelpub.core.services.KeyService keyService = sling.getService(io.github.joelpub.core.services.KeyService.class);
keyService.setKey(10) ; 
String ff = keyService.getKey();
  
%>
  
<h2>This page invokes the AEM KeyService</h2>
<h3>The value of the key is: <%=ff%></h3>