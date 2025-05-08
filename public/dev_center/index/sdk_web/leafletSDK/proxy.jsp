<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URL"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String[] serverUrls = {
"https://www.baidu.com"
};
try {
  String reqUrl = request.getQueryString();
  String [] urlKeyValue=  reqUrl.split("url\\=");
  String urlStr =   urlKeyValue[1];

  		URL url = new URL(urlStr);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setDoOutput(true);
        con.setRequestMethod(request.getMethod());
        if(request.getContentType() != null) {
          con.setRequestProperty("Content-Type", request.getContentType());
        }
  		con.setRequestProperty("Referer", request.getHeader("Referer"));
        
        InputStream in = con.getInputStream();
        
        BufferedReader read = new BufferedReader(new InputStreamReader(in,"utf-8"));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = read.readLine()) != null){
		     buffer.append(line);
		}
		

		out.write(buffer.toString());
		out.flush();
        
        }catch(Exception e){
        	e.printStackTrace();
        }
 
%>


