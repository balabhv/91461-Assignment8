/* 
 * Name: Virinchi Balabhadrapatruni                                             
 * Email: Virinchi_Balabhadrapatruni@student.uml.edu                            
 * UMass Lowell Computer Science, 91.461 GUI Programming I                      
 * Date: 11/14/2014                                                               
 * Description: Javascript File created for Assignment #8.
 */

var tabCounter = 3;

$(function () {
    var tabs = $("#tabs").tabs();
    var tabTitle = 'Generated Table #:\t' + (tabCounter - 2),
            tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
    console.log('TabCounter initial value: ' + tabCounter);
    
    //custom validation method for checking whether the start value is less than or equal to the end value.
    // validation is done when the end value is entered
    $.validator.addMethod('greaterThanOrEqualTo', function (value, element, param) {
        if (this.optional(element))
            return true;
        var i = parseInt(value);
        var j = parseInt($(param).val());
        if (isNaN(i)) {
            return true;
        }
        if (isNaN(j)) {
            return true;
        }
        console.log('i = ' + i + ', j = ' + j);
        return i >= j;
    }, "");

    //Advanced validation using the jQuery Validation Plugin
    $('#inputformtag').validate({
        // jQuery Valiation Plugin Rules
        rules: {
            colStart: {
                required: true,
                number: true
            },
            colEnd: {
                number: true,
                greaterThanOrEqualTo: "#firstInput",
                required: true
            },
            rowStart: {
                required: true,
                number: true
            },
            rowEnd: {
                number: true,
                greaterThanOrEqualTo: "#thirdInput",
                required: true
            }
        },
        // error messages
        messages: {
            colStart: {
                required: 'Please enter a column start value.',
                number: 'This value is not an integer.'
            },
            colEnd: {
                required: 'Please enter a column end value.',
                number: 'This value is not an integer.',
                greaterThanOrEqualTo: 'The column start must be less than or equal to the column end.'
            },
            rowStart: {
                required: 'Please enter a row start value.',
                number: 'This value is not an integer.'
            },
            rowEnd: {
                required: 'Please enter a row end value.',
                number: 'This value is not an integer.',
                greaterThanOrEqualTo: 'The row start must be less than or equal to the row end.'
            }
        },
        // place errors in a div on the next line - allows for longer error messages
        errorElement: 'div',
        // wubmit button click function
        submitHandler: function (form) {
            // get the input values.
            var a = $("#firstInput").val();
            var b = $("#secondInput").val();
            var c = $("#thirdInput").val();
            var d = $("#fourthInput").val();


            // get the four values as integers
            var horizStart = parseInt(a);
            var horizEnd = parseInt(b);
            var vertStart = parseInt(c);
            var vertEnd = parseInt(d);

            //print them to the developer console
            console.log('Horizontal Start: ' + horizStart);
            console.log('Horizontal End: ' + horizEnd);
            console.log('Vertical Start: ' + vertStart);
            console.log('Vertical End: ' + vertEnd);


            //create the wrapper div for the table
            var outputDiv = document.createElement("div");
            outputDiv.setAttribute("id", "formoutput_inner");
            var outputTitle = document.createElement("h1");
            outputTitle.innerHTML = 'Form Inputs: ';
            var cs = document.createElement("h2"),
                    ce = document.createElement("h2"),
                    rs = document.createElement("h2"),
                    re = document.createElement("h2");
            cs.innerHTML = 'Column Start: ' + horizStart;
            ce.innerHTML = 'Column End: ' + horizEnd;
            rs.innerHTML = 'Row Start: ' + vertStart;
            re.innerHTML = 'Row End: ' + vertEnd;
            var inDiv = document.createElement('div');
            inDiv.appendChild(cs);
            inDiv.appendChild(ce);
            inDiv.appendChild(rs);
            inDiv.appendChild(re);
            outputDiv.appendChild(outputTitle);
            outputDiv.appendChild(inDiv);
            var outputTitle2 = document.createElement("h1");
            outputTitle2.innerHTML = 'Form Output: ';
            outputDiv.appendChild(outputTitle2);


            // create the table
            var table = document.createElement("table");

            // create the first row (headers)
            var headerRow = document.createElement('tr');

            //create an empty header element, as the table;s top left corner cell should be empty
            var th = document.createElement('th');
            th.setAttribute('id', 'emptyheader');
            th.innerHTML = '';
            headerRow.appendChild(th);

            // for each value between the horizontal start and end,
            // create a header and add it to the row.
            for (var i = horizStart; i <= horizEnd; ++i) {
                var th = document.createElement('th');
                th.innerHTML = i;
                if (i === horizEnd) {
                    // the rightmost header should have no right side border. The rest should.
                    th.setAttribute('id', 'rightmostheader');
                }
                headerRow.appendChild(th);
            }
            table.appendChild(headerRow);

            //for each value between the vertical start and end,
            // create a row and add it to the table.
            for (var i = vertStart; i <= vertEnd; ++i) {

                //given the horizontal start, horizontal end, the current row, and the maximum row number,
                // create a row in the table
                var tablerow = generateTableRow(horizStart, horizEnd, i, vertEnd);
                table.appendChild(tablerow);
            }

            outputDiv.appendChild(table);
            addTab(tabTitle, tabCounter, tabTemplate, tabs, outputDiv);
            tabCounter++;
            tabTitle = 'Generated Table #:\t' + (tabCounter - 2)
            $('#tabs').tabs('load', 1);
            $(form).submit(function (event) {
                event.preventDefault();
            });

        }
    });

    // close icon: removing the tab on click
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
});



// actual addTab function: adds new tab using the input from the form above
function addTab(tabTitle, tabCounter, tabTemplate, tabs, outputDiv) {
    console.log('enter addtab: TabCounter value: ' + tabCounter);
    var label = tabTitle || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
    var tabDiv = document.createElement('div');
    tabDiv.setAttribute('id', id);
    tabDiv.appendChild(outputDiv);
    var tabContentHtml = $(tabDiv);
    tabs.find(".ui-tabs-nav").append(li);
    tabs.append(tabContentHtml);
    tabs.tabs("refresh");
    console.log('exit addtab: TabCounter value: ' + tabCounter);
}

function generateTableRow(horizStart, horizEnd, vert, vertEnd) {
    // create the table row
    var tr = document.createElement('tr');

    // create the table header
    var th = document.createElement('th');

    // if the current row is the last row, add an id.
    // The bottom most header should not have a bottom border
    if (vert === vertEnd) {
        th.setAttribute('id', 'bottommostheader');
    }
    th.innerHTML = vert;
    tr.appendChild(th);
    // do the actual multiplications and fill the cells in the row
    for (var i = horizStart; i <= horizEnd; ++i) {
        var td = document.createElement('td');
        td.innerHTML = i * vert;
        tr.appendChild(td);
    }
    return tr;
}


