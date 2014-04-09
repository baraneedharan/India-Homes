/*homeLoan*/
function validateForm() {
    calculateLoanEMI();
    $('#status2').removeClass('active');
    $('#status3').addClass('active');
    $('#wizard').removeClass('wizardClass1');
    $('#wizard').addClass('wizardClass2');
    $('#page2').hide("slow");
    $('#wizard').height(800);
}


//
function calculateLoanEMI() {
    var loanAmt = document.forms["loanform"]["loanAmoutRequired"].value;
    var rateofInt = document.forms["loanform"]["rateOfInterest"].value;
    var durofLoan = document.forms["loanform"]["durationOfLoan"].value;

    var P = loanAmt;
    var years = durofLoan;
    var annualInterest = rateofInt;

    var I = Number(annualInterest) / (12 * 100);
    var n = Number(years) * 12;
    var emi = (Number(P) * Number(I)) * (Math.pow((1 + Number(I)),Number(n)) / (Math.pow((1 + Number(I)),Number(n)) - 1));

//    var monthlyInterestRate = Number(rateofInt) / (12 * 1000);
//    var noOfMonths = Number(durofLoan) * 12;
//
//    var emi = (Number(loanAmt) * Number(monthlyInterestRate)) * Math.pow((1 + Number(monthlyInterestRate)), Number(noOfMonths)) / (Math.pow((1 + Number(monthlyInterestRate)), Number(noOfMonths)) - 1);
//    var emi = (Number(loanAmt) * Number(monthlyInterestRate)) * (Math.pow((1 + Number(monthlyInterestRate)),Number(noOfMonths)) / (Math.pow((1 + Number(monthlyInterestRate)),Number(noOfMonths)) - 1));

    //now for individual rows
    var totalInterest = 0;
    var totalPrinciple = 0;
    var grandTotal = 0;

    var htmlStr = "";
    //These values declared in jspf already
    /*<tr align=\"center\" class=\"heading\" bgcolor=\"#90a8cf\"><th height=\"35\" class=\"overview_border\">Month</th><th class=\"overview_border\">EMI</th><th class=\"overview_border\">Principal</th><th class=\"overview_border\">Interest</th><th class=\"overview_border\">Loan Balance</th></tr>*/
    for (var i = 1; i <= n; i++) {
        var fractionPrinciple = (Number(emi) - (Number(I) * Number(P))) * Math.pow((Number(I) + 1), (i - 1));
        var fractionInterest = Number(emi) - Number(fractionPrinciple);

        grandTotal = Number(grandTotal) +  Number(emi);
        totalPrinciple = Number(totalPrinciple) + Number(fractionPrinciple);
        totalInterest = Number(totalInterest) + Number(fractionInterest);

        htmlStr += "<tr " + (i % 2 == 1 ? "bgcolor=\"#ffffff\"" : "bgcolor=\"#f7f7f8\"") + " >";
        htmlStr += "<td height=\"25\" align=\"center\" class=\"overview_border\">" + Math.round(Number(i)) + "</td>";
        htmlStr += "<td height=\"25\" align=\"center\" class=\"overview_border\">" + Math.round(Number(emi)) + "</td>";
        htmlStr += "<td height=\"25\" align=\"center\" class=\"overview_border\">" + Math.round(Number(fractionPrinciple)) + "</td>";
        htmlStr += "<td height=\"25\" align=\"center\" class=\"overview_border\">" + Math.round(Number(fractionInterest)) + "</td>";
        htmlStr += "<td height=\"25\" align=\"center\" class=\"overview_border\">" + Math.round((Number(loanAmt) - Number(totalPrinciple))) + "</td>";
        htmlStr += "</tr>";
    }

    htmlStr += "<tr bgcolor=\"#f7f7f8\"><td height=\"25\" align=\"center\" class=\"overview_border\"><strong>Totals</strong></td><td align=\"center\" class=\"overview_border\"><strong>" + Math.round(Number(grandTotal) / 100) * 100 + "</strong></td><td align=\"center\" class=\"overview_border\"><strong>" + Math.round(Number(totalPrinciple) / 100) * 100 + "</strong></td><td align=\"center\" class=\"overview_border\"><strong>" + Math.round(Number(totalInterest) / 100) * 100 + "</strong></td><td>&nbsp;</td><tr>";
    $('#loanCalculationTable').html(htmlStr);

    //show chart div
    $('#mp').html('INR <span>' + Math.round(Number(emi)) + '</span>');
    $('#tip').html('INR <span>' + Math.round(totalInterest) + '</span>');
    $('#tp').html('INR <span>' + Math.round(grandTotal) + '</span>');
    amcharts(Math.round(totalPrinciple), Math.round(totalInterest));
}

function amcharts(prpamt, totint) {
    $('#chartdiv').html('<span style="font-size: 18px; font-weight: bold; color: #000000; position: relative; z-index: 1; left: 25px; top: 20px;">Break-up of Total Payment</span>');

    var chart;
    var legend;

    var chartData = [
        {
            interest:"Principal Loan Amount",
            value:prpamt
        },
        {
            interest:"Total Interest",
            value:totint
        }
    ];

//    AmCharts.ready(function () {
    // PIE CHART
    chart = new AmCharts.AmPieChart();
    chart.dataProvider = chartData;
    chart.titleField = "interest";
    chart.valueField = "value";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 2;
    chart.labelText = "";
    // this makes the chart 3D
    chart.depth3D = 15;
    chart.angle = 30;
    chart.radius = "40%";
    chart.colors = ["#9dce2c", "#f3b850"];

    // LEGEND
    legend = new AmCharts.AmLegend();
    legend.align = "right";
    legend.markerType = "square";
    legend.valueText = "";
    legend.position = "right";
    chart.addLegend(legend);

    // WRITE
    chart.write("chartdiv");
//    });
}

function cityBasedSearchURL(city,location) {

    var finalString = "";
    var finalStringBudget = "";
    var finalStringBedroom = "";
    var finalStringArea = "";
    var finalStringRegion = "";
    var finalStringPropertyTpe = "";
    var cName="";
    var  cVal="";
    if(location==null){
        $("input[type='checkbox']:checked").each(
            function()
            {
                cName = $(this).attr('name');
                cVal =  $(this).attr('rel') ;

                if(cName == 'regions'){
                    finalStringRegion += cVal + ",";
                }

                if(cName == 'areas'){
                    finalStringArea += cVal + ",";
                }
                if (cName == 'budget') {
                    finalStringBudget += cVal + ",";
                }
                if (cName == 'bedrooms') {
                    finalStringBedroom += cVal + ",";
                }
                if (cName == 'expertCorner' || cName == 'channelName' || cName == 'projectStatus') {
                    finalStringPropertyTpe += cVal + ",";
                }
            }
        );
    }

    else if(location=='area'){
        $('input[name=regions]').attr('checked', false);
        $("input[type='checkbox']:checked").each(
            function()
            {
                cName = $(this).attr('name');
                cVal =  $(this).attr('rel') ;

                if(cName == 'areas'){
                    finalStringArea += cVal + ",";
                }
                if (cName == 'budget') {
                    finalStringBudget += cVal + ",";
                }
                if (cName == 'bedrooms') {
                    finalStringBedroom += cVal + ",";
                }
                if (cName == 'expertCorner' || cName == 'channelName' || cName == 'projectStatus') {
                    finalStringPropertyTpe += cVal + ",";
                }
            }
        );
    }
    else{
        $('input[name=areas]').attr('checked', false);
        $("input[type='checkbox']:checked").each(
            function()
            {
                cName = $(this).attr('name');
                cVal =  $(this).attr('rel') ;

                if(cName == 'regions'){
                    finalStringRegion += cVal + ",";
                }
                if (cName == 'budget') {
                    finalStringBudget += cVal + ",";
                }
                if (cName == 'bedrooms') {
                    finalStringBedroom += cVal + ",";
                }
                if (cName == 'expertCorner' || cName == 'channelName' || cName == 'projectStatus') {
                    finalStringPropertyTpe += cVal + ",";
                }
            }
        );
    }

    if(finalStringBudget != ''){
        finalStringBudget = finalStringBudget.substring(0, finalStringBudget.length -1);
        finalString +=  "budgetOpt =" + finalStringBudget +"&";
    }
    if(finalStringBedroom != ''){
        finalStringBedroom = finalStringBedroom.substring(0, finalStringBedroom.length -1);
        finalString +=  "bedroomOpt =" +finalStringBedroom +"&"
    }
    if(finalStringRegion != ''){
        finalStringRegion = finalStringRegion.substring(0, finalStringRegion.length -1);
        finalString += "regionOpt =" +finalStringRegion +"&"
    }
    if(finalStringArea != ''){
        finalStringArea = finalStringArea.substring(0, finalStringArea.length -1);
        finalString += "areaOpt =" +finalStringArea +"&"
    }
    if(finalStringPropertyTpe != ''){
        finalStringPropertyTpe = finalStringPropertyTpe.substring(0, finalStringPropertyTpe.length -1);
        finalString += "propertyOpt =" +finalStringPropertyTpe +"&"
    }

    finalString = finalString.substring(0, finalString.length -1);
    return finalString;
}

/*homeLoan*/
function submitSearchForm(formName, sortOrder,location) {

    var f = document.getElementById(formName);
    if (f) {
        if (sortOrder != null)
            f.sortOn.value = sortOrder;
        var finalAction  = "/projects.html?action=search&searchSource=" + f.searchSource.value + "&cityName=" + f.city.value;
        var searchUrl = cityBasedSearchURL(f.city.value,location);
        finalAction +="&"+ searchUrl;
        f.action = finalAction;
        window.setTimeout(function () {
            $('#progressDivOuter').show();
            $('#progressDivText').html('<p>Searching projects for you.</p>');
        }, 200);
        window.setTimeout(function () {
            $('#progressDivOuter').hide();
            $('#progressDivText').fadeIn(0).html('');
        }, 2000);
        f.submit();
    }
}

function strip_tags(input, allowed)
{
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}


function clearregioncheckboxes(){
    $('input:checkbox[name=regions]').attr('checked',false);

}
