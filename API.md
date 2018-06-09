#TTMS1.0

## 1.play接口
    String pid;  //id
    String showName; //电影名字
    String poster;  //海报
    float score;  //评分
    String director;  //导演
    String starring;  //主演
    String plot;  //类型
    String country;  //国家
    String language;  //语言
    int duration;  //时长
    String introduction;  //介绍
    String picture;  //照片
    int status;  //状态（0：未上映， 1：上映， 0：下架）
    int sort; //不计入前段

    url:119.27.174.87:8080/ttms2.0/playServlet?method= ---
            1.showAll：展示数据库内所有电影信息，当状态为1时，表示已上映，状态为0时，表示未上映（返回json数组）
            2.selectOne&pid= --- :根据id去查询特定剧目的信息（演出计划介绍...）（返回json）
            0.showAllLimitOnCurrent：查询当前上映电影的前五名（返回json数组）
            4.showAllLimitOnSoon：查询当前未上映电影的前五名（返回json数组）
            //待
            5.selectOnPolt&polt= ---:根据类型查询电影（返回json数组）
            6.selectOnCountry&country= --- :根据国籍查询电影（返回json数组）

## 2.user接口
    String uid; //不计入前端
    String name; //用户名
    String password;
    String phoneNumber; //手机号
    String address; //地址
    String email; //
    String icon; //头像（保留）
    String birthday; //生日（保留）
    String code; //验证码，不计入前端
    int state; //激活状态，不计入前端（0：已注册，未激活， 2：已激活）

    url:119.27.174.87:8080/ttms2.0/userServlet
        1.（post）data:{...,method=regist}:注册
            成功返回邮箱注册
            失败返回错误信息
        2.（post）data:(...,method=login):登录
            成功返回跳转页面的字符串
            失败返回错误信息

## 0.schedule接口
    private String sid;  //演出计划id
    private Date startTime;  //上映时间
    private Date endTime;  //下映时间
    private int status;  //状态（0：演出计划可用， 1：演出计划过期， 2：演出计划作废）
    private double price;  //票价
    private Studio studio;  //演出计划对应的演出厅
    private int[][] seatArray;  //座位的数组

    urt:119.27.174.87:8080/ttms2.0/scheduleServlet?method=
        1.selectScheduleById&sid=？ //根据演出计划的id去查询演出计划的详细信息

## 4.studio接口
    private String sid;  //演出厅id
    private String name;  //演出厅名字
    private int row;  //演出厅行
    private int col;  //演出厅列
    private String introduction;  //演出厅介绍
    private int status;  //演出厅状态（1：可使用， 2：禁用）

## 5.seat接口
    private String sid;  //座位id
    private int row;  //座位的行
    private int col;  //座位的列
    private int status;   //座位的状态（0：禁用状态， 1：正常使用）
    private Studio studio;  //座位对应的演出厅

## 6.ticket接口
    private String tid;  //票id
    private String showName;  //电影名称
    private Date startTime;  //开始时间
    private Date endTime;  //结束时间
    private String name;  //影厅名字
    private String price;  //票价
    private int row;  //对应座位的行
    private int col;  //对应座位的列
    private int status;  //票状态（0：不显示座位,1：可正常选取，2：已被选取）
    private Date lockTime;  //票被上锁的时间


# 数据库图鉴
![](http://119.27.174.87:8080/ttms2.0/img/ttms.png)
