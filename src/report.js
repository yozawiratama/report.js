//! report.js
//! version : 0.6
//! authors : Yoza Wiratama and Contributors
//! yozawiratama.github.io/report.js
//! This Lib free to use or re-develop
//! please support us with donate, feedback and do not acknowledge as privately owned
//! support us with donation : (paypal) y_wiratama@yahoo.com

//!!! README before you change this source code
//!!! We share this source code so as you can contribute with this project or help you to understand how report.js works.
//!!! Do not acknowledge as privately owned
//!!! You can re-develop report.js and naming with your own, but dont forget refer report.js and let us know about your creation. 

function ReportJs() {
    var colCounter = 0;
    var rowCounter = 0;
    var headElm = 0;
    var columns = new Array();
    var rows = new Array();
    var headElements = new Array();

    this.paperType = "";

    this.header = {
        text : "",
        custom: "null",
        align: "center",
        config: {
            margin: "2px auto 10px"
        }
    }

    this.title = {
        text : "",
        align: "center",
        custom: "null"
    };

    this.config = {
        width: "",
        height: "",
        margin: "10px auto",
        padding: "10px 0",
        backgroundColor: "white",
        textColor: "",
        cssClass: ""
    }

    this.note = "";
    this.table = {
        config: {
            width: "97%",
            height: "",
            margin: "10px auto",
            padding: "",
            backgroundColor: "",
            textColor: "",
            cssClass : ""
        }
    }
    this.headElement =
        {
            add: function (name, value) {
                headElements[headElm] = {
                    'name': name,
                    'value': value
                }
                this.length = headElements.length;
                headElm++;
            },
            get: function (index) {
                return headElements[index];
            },
            length: -1,
            config: {
                margin: "0 auto",
                padding: "0 20px;",
                cssClass: "",
                backgroundColor: "",
                textColor: ""

            }
        };

    this.column =
    {

        add: function (colName) {
            columns[colCounter] = {
                'name': colName
            }
            this.length = columns.length;
            colCounter++;
        },
        get: function (index) {
            return columns[index].name;
        },
        length: -1,
        config:{
            backgroundColor: "",
            textColor: "",
            cssClass: ""
        }
    };

    this.row = {
        add: function (rowData) {
            var row = rowData;
            rows[rowCounter] = row;
            this.length = rows.length;
            rowCounter++;
        },
        get: function (index) {
            return rows[index];
        },
        length: -1,
        config:{
            backgroundColor: "",
            textColor: "",
            cssClass: ""
        }
    };

    this.footer = {
        text : "",
        align: "center",
        cssClass: "",
        custom: "null",
        config: {
            margin: "10px auto 0px",
            cssClass : "",
            textColor: "",
            backgroundColor: ""

        }
    };
}


function makeReport(selector, report) {
    var obj = $(selector);
    var r = report;

    var paper = new Paper();
    paper = Convert(paper.A4);
    r.config.width = paper.width;
    r.config.height = paper.height;

    obj.css('position', 'relative');
    obj.width(r.config.width);
    obj.height(r.config.height);
    obj.css('margin', r.config.margin);
    obj.css('background-color', r.config.backgroundColor);
    obj.css('padding', r.config.padding);
    obj.css('color', r.config.textColor);
    


    /***** HEADER *****/
    obj.append('<div id=\"reportHeader\"></div>');
    var header = $('#reportHeader');
    header.css('border-bottom', '1px solid #A7A7A7');
    header.css('text-align', r.header.align);
    header.css('margin', r.header.config.margin);
    header.width(r.table.config.width);
    if (r.header.custom == "null") {
        header.append('<h1>' + r.header.text + '</h1>');
    } else {
        header.append(h.header.custom);
    }


    /***** TITLE *****/
    obj.append('<div id=\"reportTitle\"></div>')
    var reportTitle = $('#reportTitle');
    reportTitle.css('text-align', r.title.align);
    if (r.title.custom == "null") {
        reportTitle.append('<h2>' + r.title.text + '</h2>');
    } else {
        reportTitle.append(r.title.custom);
    }


    /***** HEAD ELEMENT *****/
    obj.append('<div id=\"headElement\"><table></table></div>');
    var headElem = $('#headElement');
    headElem.width(r.table.config.width);
    headElem.css('margin', r.headElement.config.margin);
    headElem.css('padding', r.headElement.config.padding);
    if (r.headElement.length > -1) {
        for (var ii = 0; ii < r.headElement.length; ii++) {
            headElem.children('table').append('<tr><td>' + r.headElement.get(ii).name + '</td><td>:</td><td>' + r.headElement.get(ii).value + '</td></tr>');
        }
    }
    


    /***** TABLE *****/
    obj.append('<table id=\"reportTable\"><thead><tr></tr></thead><tbody></tbody></table>');
    var table = $('#reportTable');
    table.css('margin', r.table.config.margin);
    table.css('border', '1px solid #A7A7A7');
    table.children('thead').css('background-color', '#A7A7A7');
    table.children('thead').css('color', 'white');
    table.width(r.table.config.width);
    table.addClass(r.table.config.cssClass);
    for (var ii = 0; ii < r.column.length; ii++) {
        table.children('thead').children('tr').append('<th>' + r.column.get(ii) + '</th>');
    }
    table.children('thead').children('tr').children('th').css('background-color', r.column.config.backgroundColor);
    table.children('thead').children('tr').children('th').css('color', r.column.config.textColor);
    for (var ii = 0; ii < r.row.length; ii++) {
        var rowItem = "";
        for (var jj = 0; jj < r.column.length; jj++) {
            rowItem += "<td>" + r.row.get(ii)[jj] + "</td>";
        }
        table.children('tbody').append('<tr>' + rowItem + '</tr>');

    }

    /***** FOOTER *****/
    obj.append('<div id=\"reportFooter\"></div>');
    var footer = $('#reportFooter');
    footer.css('border-top', '1px solid #A7A7A7');
    footer.css('margin', r.footer.config.margin);
    footer.css('position', 'absolute');
    footer.css('bottom', '0px');
    var objWidth = obj.width();
    var tblWidth = table.width();
    var leftMargin = (objWidth - tblWidth) / 2;
    footer.css('margin-left', leftMargin);
    footer.width(r.table.config.width);
    footer.addClass(r.footer.cssClass);
    if (r.footer.custom == "null") {
        footer.append('<p style=\"text-align:' + r.footer.align + ';\">' + r.footer.text + '</p>');
    } else {
        footer.append(r.footer.custom);
    }
    
}


function Convert(paper) {
    var width = $(document).width();
    var p = new Paper();
    p.width = width * 80 / 100;
    p.height = p.A4.height * p.width / p.A4.width;
    return p;
}

function Paper() {
    this.width = "";
    this.height = "";
    this.A4 = {
        width: 2480,
        height: 3508
    }
}



