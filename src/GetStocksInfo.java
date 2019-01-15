import com.sun.net.httpserver.HttpServer;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

public class GetStocksInfo extends HttpServlet{
    private HashMap<String,Stock> stocks;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //返回两只股票的价格信息
        double sz = Math.random()*20;
        double pf = Math.random()*0.5;
        boolean flagsz = ((int)(Math.random()*10))%2 == 0;
        boolean flagpf = ((int)(Math.random()*10))%2 == 0;

        Stock szzs = stocks.get("300001");
        Stock pfyh = stocks.get("000001");
        double temp;

        if (flagsz){
            temp = szzs.getNow() + sz;
        } else {
            temp = szzs.getNow() - sz;
        }
        //变为小数点后两位
        temp = (int)(temp*100)/100.0;
        szzs.setNow(temp);

        if (flagpf){
            temp = pfyh.getNow() + pf;
        } else {
            temp = pfyh.getNow() - pf;
        }
        temp = (int)(temp*100)/100.0;
        pfyh.setNow(temp);

        //在页面输出股票变动结果
        resp.setContentType("text/html;charset=gb2312");
        PrintWriter out = resp.getWriter();
        //out.println(szzs + "<br />" + pfyh);
        //采用JSON返回股票的信息
        StringBuilder builder = new StringBuilder();
        //数组的方式传回两个对象
//        builder.append("[{name:\"").append(szzs.getName()).append("\",id:\"").append(szzs.getId())
//                .append("\",yes:").append(szzs.getYesterday()).append(",tod:").append(szzs.getToday())
//                .append(",now:").append(szzs.getNow())
//                .append("},")
//                .append("{name:\"").append(pfyh.getName()).append("\",id:\"").append(pfyh.getId())
//                .append("\",yes:").append(pfyh.getYesterday()).append(",tod:").append(pfyh.getToday())
//                .append(",now:").append(pfyh.getNow())
//                .append("}])");
        //对象的方式传（加括号避免报错（输出了\r\n））
        builder.append("({")
                .append("\"").append(szzs.getId()).append("\":{name:\"").append(szzs.getName())
                .append("\",yes:").append(szzs.getYesterday()).append(",tod:").append(szzs.getToday())
                .append(",now:").append(szzs.getNow())
                .append("},")
                .append("\"").append(pfyh.getId()).append("\":{name:\"").append(pfyh.getName())
                .append("\",yes:").append(pfyh.getYesterday()).append(",tod:").append(pfyh.getToday())
                .append(",now:").append(pfyh.getNow())
                .append("}})");

        out.print(builder);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    //初始化
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        stocks = new HashMap<String, Stock>();
        Stock szzs = new Stock(3000.0,2990.1,"上证指数","300001");
        Stock pfyh = new Stock(23.22,23.50,"浦发银行","000001");

        stocks.put(szzs.getId(),szzs);
        stocks.put(pfyh.getId(),pfyh);

        //System.out.println(stocks);
    }
}
