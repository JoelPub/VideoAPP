Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    pages: [
        {
            questions: [
                {
                    type: "html",
                    name: "income_intro",
                            "html": "<article class='intro'>    <h1 class='intro__heading intro__heading--income title'>欢迎参加我们的福特品牌调查！</h1>    <div class='intro__body wysiwyg'>       <p>我们感谢您的关注及认真的回答。本调查需要约 1分钟完成。</p>       <p>收集的信息仅用于调查目的:</p>       <ul>        \t<li>        \t\t调查不涉及销售，您的个人信息不会与任何人分享。        \t</li>        \t<li>        \t\t<p>如果您通过移动设备访问本调查，请确保您位于安全位置。</p>        \t</li>  </ul>         </div> </article>"
                },
                {
                    type: "dropdown",
                    name: "yearOfBirth",
                    title: "您生于哪一年？",
                    isRequired: true,
		    requiredErrorText: "必填",
                    colCount: 0,
                    showOptionsCaption : true,
                    optionsCaption : "请选择",
                    choices: [
                        "1960年之前",
                        "1960-1970",
                        "1971-1975",
                        "1976-1980",
                        "1981-1985",
                        "1986-1990",
                        "1991-1995",
                        "1996-2000",
                        "2000年之后",
                        "不愿透露"
                    ]
                },
                {
                    type: "radiogroup",
                    name: "gender",
                    title: "您是……？  ",
                    isRequired: true,
		    requiredErrorText: "必填",
                    colCount: 2,
                    choices: [
                        "先生",
                        "女士"
                    ]
                },
                {
                    type: "multipletext",
                    name: "impressionOfDesign",
                    title: "您对于福特展台的印象是什么，请用三个词来回答",
                    isRequired: true,
		    requiredErrorText: "必填",
                    cssClasses : "hidebottom",
                    items: [
                        {
                            name: "impressionOfDesign1",
                            title: " "
                        }
                    ]
                },

                {
                    type: "multipletext",
                    name: "impressionOfDesign1",
                    title: "您对于福特展台的印象是什么，请用三个词来回答",
                    titleLocation : 'hidden',
                    items: [
                        {
                            name: "impressionOfDesign2",
                            title: " "
                        }, {
                            name: "impressionOfDesign3",
                            title: " "
                        }
                    ]
                },
                {
                    type: "radiogroup",
                    name: "fordImpression",
                    title: "您对于展台上印象最深刻的区域有哪些？请分别用一个词来描述原因",
                    isRequired: true,
		    requiredErrorText: "必填",
                    choices: [
                        "展台布置颜色", "互动灯光设置", "展台的互动性","寻找隐藏的电马","徽章制作","福特Co-Pilot360TM 弹力球游戏","福特音乐派","势能美学设计作品", "星巴克联名饮品", "车型产品","Mach-E","F-150 LTD","Mustang","全新探险者","锐界","锐际","新一代福克斯","领界S"
                    ],
                    colCount: 0
                },
                {
                  "type": "matrixdynamic",
                  "name": "otherImpression",
                  "title": "在您看过的展台中，你觉得印象深刻的有哪些？不考虑面积的情况下，在展台的呈现上，你觉得其中哪些展台的体验做得比福特好？",
                  "rowCount": 1,
                  "allowAddRows": false,
                  "allowRemoveRows": false,
                    isRequired: true,
		    requiredErrorText: "必填",
                  "columns": [
                      {
                          "name": "otherImpressionBrand1",
                          "cellType": "text",
                          "title": "填写品牌",
                          "isRequired": false
                      }, {
                          "name": "otherImpressionDesc1",
                          "cellType": "text",
                          "title": "填写原因",
                          "isRequired": false
                      }
                  ]
                },
                {
                  "type": "matrixdynamic",
                  "name": "otherImpression1",
                  "title": "在您看过的展台中，你觉得印象深刻的有哪些？不考虑面积的情况下，在展台的呈现上，你觉得其中哪些展台的体验做得比福特好？",
                  titleLocation : 'hidden',
                  "rowCount": 2,
                  "allowAddRows": false,
                  "allowRemoveRows": false,
                  "columns": [
                      {
                          "name": "otherImpressionBrand2",
                          "cellType": "text",
                          "title": "填写品牌",
                          titleLocation : 'hidden',
                          "isRequired": false
                      }, {
                          "name": "otherImpressionDesc2",
                          "cellType": "text",
                          "title": "填写原因",
                          "isRequired": false
                      }
                  ]
                },
                {
                    type: "comment",
                    name: "suggestions",
                    isRequired: true,
		    requiredErrorText: "必填",
                    title: "您认为福特展台上还有待提高的地方是哪里？请指出一点"
                },
                {
                    type: "rating",
                    name: "score",
                    title: "如果您给福特展台打分，满分10分，你会打几分？",
                    isRequired: true,
		    requiredErrorText: "必填",
                },
                {
                    type: "multipletext",
                    name: "fordImpressionDesc",
                    title: "您对于福特势能美学的设计雕塑和呈现内容的印象是什么？请用三个词来回答",
                    colCount: 1,
                    isRequired: true,
		    requiredErrorText: "必填",
                    items: [
                        {
                            name: "fordImpressionDesc1",
                            title: " "
                        }
                    ]
                },
                {
                    type: "multipletext",
                    name: "fordImpressionDesc1",
                    title: "您对于福特势能美学的设计雕塑和呈现内容的印象是什么？请用三个词来回答",
		    titleLocation : 'hidden',
                    colCount: 1,
                    items: [
                        {
                            name: "fordImpressionDesc2",
                            title: " "
                        }, {
                             name: "fordImpressionDesc3",
                             title: " "
                        }
                    ]
                }
            ]
        }
    ],
    "showQuestionNumbers": "off",
    "showNavigationButtons":"none"
};

window.survey = new Survey.Model(json);
var formattedResult = {};
var q = survey.getQuestionByName('score');
var s=survey.getQuestionByName('fordImpression');
q.rateValues = [1,2,3,4,5,6,7,8,9,10];
s.colCount = 1;
survey
    .onAfterRenderQuestion
    .add(function (survey, options) {
        $('.primary-multipletext').parents('.sv-row').css('padding-bottom',0);
        $('.primary-matrixdynamic').parents('.sv-row').css('padding-bottom',0);
	$('.primary-matrixdynamic').css('padding-bottom',0);
	$('.secondary-matrixdynamic').css('padding-top',0);
	$('.secondary-matrixdynamic thead').hide();
        var subQuestions1=[3,4,5,6];
        var subQuestions2=[10,11,12,13,14,15,16,17];
        var domImpression=$('#'+s.id);
        //domImpression.hide();
        $.each(subQuestions1,function(index,value){
            domImpression.find('fieldset').children('div').eq(value).hide();
            domImpression.find('fieldset').children('div').eq(value).css('padding-left','100px')
        });
        $.each(subQuestions2,function(index,value){
            domImpression.find('fieldset').children('div').eq(value).hide();
            domImpression.find('fieldset').children('div').eq(value).css('padding-left','100px')
        });
        $.each(domImpression.find('fieldset').children('div'),function(index,value){
            $(value).addClass('option'+index);
        });
        domImpression.find('fieldset').children('div').click(function(){
            if($(this).hasClass('option2')) {
                $.each(subQuestions1,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).show();
                });
                $.each(subQuestions2,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).hide();
                });
            }
            else if($(this).hasClass('option9')) {
                $.each(subQuestions2,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).show();
                });
                $.each(subQuestions1,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).hide();
                });
            }
            else if($(this).hasClass('option1')||$(this).hasClass('option7')||$(this).hasClass('option8')){
                $.each(subQuestions2,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).hide();
                });
                $.each(subQuestions1,function(index,value){
                    domImpression.find('fieldset').children('div').eq(value).hide();
                });
            }
        })
    });
survey
    .onComplete
    .add(function (result) {
    $('.sv-footer__complete-btn').hide();
    formattedResult.yearOfBirth=result.data.yearOfBirth;
    formattedResult.gender=result.data.gender;
    if(result.data.impressionOfDesign){
        formattedResult.impressionOfDesign1=result.data.impressionOfDesign.impressionOfDesign1;
    }
    if(result.data.impressionOfDesign1){
        formattedResult.impressionOfDesign2=result.data.impressionOfDesign1.impressionOfDesign2;
        formattedResult.impressionOfDesign3=result.data.impressionOfDesign1.impressionOfDesign3;
    }
    if(result.data.fordImpression=='Mach-E'
    ||result.data.fordImpression=='F-150 LTD'
    ||result.data.fordImpression=='Mustang'
    ||result.data.fordImpression=='全新探险者'
    ||result.data.fordImpression=='锐界'
    ||result.data.fordImpression=='锐际'
    ||result.data.fordImpression=='新一代福克斯'
    ||result.data.fordImpression=='领界S'){
        formattedResult.fordImpression='车型产品';
        formattedResult.fordImpressionSub=result.data.fordImpression;
    }
    else if(result.data.fordImpression=='寻找隐藏的电马'
    ||result.data.fordImpression=='徽章制作'
    ||result.data.fordImpression=='福特Co-Pilot360TM 弹力球游戏'
    ||result.data.fordImpression=='福特音乐派'){
       formattedResult.fordImpression='展台的互动性';
       formattedResult.fordImpressionSub=result.data.fordImpression;
    }
    else {
        formattedResult.fordImpression=result.data.fordImpression;
    }
    if(result.data.otherImpression&&result.data.otherImpression[0]){
        formattedResult.otherImpressionBrand1=result.data.otherImpression[0].otherImpressionBrand1;
        formattedResult.otherImpressionDesc1=result.data.otherImpression[0].otherImpressionDesc1;
    }
    if(result.data.otherImpression1&&result.data.otherImpression1[0]){
        formattedResult.otherImpressionBrand2=result.data.otherImpression1[0].otherImpressionBrand2;
        formattedResult.otherImpressionDesc2=result.data.otherImpression1[0].otherImpressionDesc2;
    }
    if(result.data.otherImpression1&&result.data.otherImpression1[1]){
        formattedResult.otherImpressionBrand3=result.data.otherImpression1[1].otherImpressionBrand2;
        formattedResult.otherImpressionDesc3=result.data.otherImpression1[1].otherImpressionDesc2;
    }
    formattedResult.fordImprove=result.data.suggestions;
    formattedResult.score=result.data.score;
    if(result.data.fordImpressionDesc){
        formattedResult.fordImpressionDesc1=result.data.fordImpressionDesc.fordImpressionDesc1;
    }
    if(result.data.fordImpressionDesc1){
        formattedResult.fordImpressionDesc2=result.data.fordImpressionDesc1.fordImpressionDesc2;
        formattedResult.fordImpressionDesc3=result.data.fordImpressionDesc1.fordImpressionDesc3;
    }

                $.ajax({
					url: 'https://autoshow.apps.pp01.cneast.cf.ford.com.cn/survey',
					type: "POST",
  					contentType: 'application/json',
					data:JSON.stringify(formattedResult),
	                success: function (response) {
                            document
                            .querySelector('#surveyResult')
                            .textContent = response.msg;
	                },
	                error: function (res) {
			 		  document
                          .querySelector('#surveyResult')
                          .textContent = "Result JSON:\n" + JSON.stringify(formattedResult, null, 3);
	                }
                });
    });
survey
    .onUpdateQuestionCssClasses
    .add(function (survey, options) {
        var classes = options.cssClasses

        if (options.question.getType() === "multipletext" && options.question.isRequired ) {
            classes.root += " primary-multipletext";
        }
        if (options.question.getType() === "matrixdynamic" && options.question.isRequired ) {
            classes.root += " primary-matrixdynamic";
        }
        if (options.question.getType() === "matrixdynamic"  && !options.question.isRequired ) {
            classes.root += " secondary-matrixdynamic";
        }
    });

$("#surveyElement").Survey({model: survey});
