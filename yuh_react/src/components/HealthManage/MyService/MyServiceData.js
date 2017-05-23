/**
 * Created by Benson on 2017/3/28.
 */
import TimeLineStyle from '../../../styles/tiemLineStyles.css';
import MyServiceStyle from '../../../styles/MyService.css';
import {GetService} from '../../../InterFace/InterfaceAPI';

function getLine(){

  let user = sessionStorage.getItem('userData');
  user = JSON.parse(user);
  let authToken='';
  if(user!=null&&user!=undefined){
    authToken= user.authToken;
  }
  let datas=[];
  $.get(GetService(2,authToken),(rs)=>{
    datas = rs;
  })
    var years = [];
    var datasForView = [];

    var getState = function(state){
        switch (state){
            case 0:
                return ' (<span style="color: #e60012;">未完成</span>) '
                break;
            case 2:
                return ' (<span style="color: #e60012;">代延期</span>) '
                break;
            case 3:
                return ' (<span style="color: #e60012;">已延期</span>) '
                break;
            case 4:
                return ' (<span style="color: #e60012;">已失效</span>) '
                break;
            default:
                return '';
                break;
        }
    }

    var createNewDatas = function(year,date,content,isYear){
        if(isYear){
            datasForView.push({year:year,isYear:isYear});
        }else{
            datasForView.push({year:year,date:date,content:content,isYear:isYear});
        }
    }

    datas.map(function(data,index){
        var year = data.executeBegin.split('-')[0];
        var date = data.executeBegin.split('-')[1]+'-'+data.executeBegin.split('-')[2];
        var content = data.entryName;

        var contents='';
        //获取单日事件和完成情况
        if(content.length>1){
            content.map(function(c_data,c_index){
                contents += c_data.name+getState(c_data.status)+'<br/>';
            })
        }else{
            contents =  content[0].name+getState(content[0].status);
        }
        //创建年份数组years
        if(years.indexOf(year)==-1){
            years.push(year);
            createNewDatas(year,null,null,true);
        }
        createNewDatas(year,date,contents,false);
    })
    //计算年份轴长度
    $("#time_line_left").css('height',52*years.length+40);

    var createYearsHtml = function(years){
        var html='';
        years.map(function(y,i){
            if(i==0)
            html+='<li><a href="#'+y+'">'+y+'年<span className='+[TimeLineStyle.years_flag,TimeLineStyle.years_flag_active].join(" ")+'></span></a></li>';
            else
            html+='<li><a href="#'+y+'">'+y+'年<span class="circle years_flag"></span></a></li>';
        })
        return html;
    }

    $('#years').append(createYearsHtml(years));

    $("#years li").click(function(){
        $("#years li a span").removeClass('years_flag_active');
        $(this).children("a").children('span').addClass('years_flag_active');
    })

    //计算右侧时间轴
    var createDateHtml = function(datasForView,isNew){
        var html = '';
        var index=0;
        datasForView.map(function(data){
            if(data.isYear){
                html+='<li class="timeline-inverted"><div class="tl-circ2"></div><div class="timeline-panel2"><h2 style="line-height:26px" id="'+data.year+'"><b>'+data.year+'</b></h2></div></li>';
            }else{
                if(isNew=='new'){
                    html+=' <li class="timeline-inverted"><div class="tl-circNew"></div><div class="timeline-panel-new"><div class="tl-heading"><h5>'+data.content+'</h5><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> '+data.date+'</small></p></div></div></li>';
                }else{
                    if(index%2==0){
                        html+=' <li><div class="tl-circ"></div><div class="timeline-panel"><div class="tl-heading"><h5>'+data.content+'</h5><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> '+data.date+'</small></p></div></div></li>';
                    }else{
                        html+=' <li class="timeline-inverted"><div class="tl-circ"></div><div class="timeline-panel"><div class="tl-heading"><h5>'+data.content+'</h5><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> '+data.date+'</small></p></div></div></li>';
                    }
                }
                index++;
            }
        })
        return html;
    }

    $('#timeline').append(createDateHtml(datasForView));


    var getNextService = false;
    $('#next_server').click(function(){
        var isOverYear = false;
        if(getNextService){
            return
        }
        $(this).fadeOut(300,function(){
            $(this).html("&nbsp;");
            $(this).fadeIn(300,function(){
                $(this).css('cursor','default');
            });
        });
        var nextService = {
            executeBegin: '2017-3-5',
            entryName: [{
                name: '季度报告',
                status: 0
            }]
        }

        var newNextService = function (nextService){
            var year = nextService.executeBegin.split('-')[0];
            var date = nextService.executeBegin.split('-')[1]+'-'+nextService.executeBegin.split('-')[2];
            var content = nextService.entryName[0].name+getState(nextService.entryName[0].status);
            if(years.indexOf(year)==-1){
                isOverYear = true;
                return [
                    {
                        isYear: true,
                        year: year,
                    },
                    {
                        isYear: false,
                        year: year,
                        date: date,
                        content: content
                    }
                ]
            }
            return [{
                isYear: false,
                year: year,
                date: date,
                content: content
            }]
        }

        var html = createDateHtml(newNextService(nextService),'new');
        if(isOverYear){
            $('#timeline li:eq(0)').before(html);
        }else{
            $('#timeline li:eq(1)').before(html);
        }
        getNextService = true;
    })

  return {
    getYears:()=>{
      return years;
    },
    getDatasForView:()=>{
      return datasForView;
    }
  }
};


export default getLine;
