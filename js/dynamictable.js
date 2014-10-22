/* 
 * Name: Virinchi Balabhadrapatruni                                             
 * Email: Virinchi_Balabhadrapatruni@student.uml.edu                            
 * UMass Lowell Computer Science, 91.461 GUI Programming I                      
 * Date: 10/17/2014                                                               
 * Description: Javascript File created for Assignment #6.
 */

function makeTable(form) {
    var outputWrapper = document.getElementById('formoutput');
    while (outputWrapper.firstChild) {
        outputWrapper.removeChild(outputWrapper.firstChild);
    }

    // Check to see whether any of the textboxes is empty.
    var a = form.firstInput.value;
    var b = form.secondInput.value;
    var c = form.thirdInput.value;
    var d = form.fourthInput.value;


    // This method prevents the logical operators from short-circuiting
    var valid = !!(a != null);
    valid = !!(a != '') && valid;
    valid = !!(b != null) && valid;
    valid = !!(b != '') && valid;
    valid = !!(c != null) && valid;
    valid = !!(c != '') && valid;
    valid = !!(d != null) && valid;
    valid = !!(d != '') && valid;

    var areIntegers = !!(a.indexOf('.') == -1);
    areIntegers = !!(b.indexOf('.') == -1) && areIntegers;
    areIntegers = !!(c.indexOf('.') == -1) && areIntegers;
    areIntegers = !!(d.indexOf('.') == -1) && areIntegers;

    var input = document.getElementById('inputform');

    var error = document.getElementsByClassName('error')[0];
    if (error == null) {
        error = document.createElement('div');
        error.setAttribute('class', 'error');
    } else {
        input.removeChild(error);
    }



    if (!valid) {

        error.innerHTML = 'Please fill in all required fields.';
        input.appendChild(error);
        if (a == null || a == '') {
            form.firstInput.setCustomValidity('Invalid');
        }
        if (b == null || b == '') {
            form.secondInput.setCustomValidity('Invalid');
        }
        if (c == null || c == '') {
            form.thirdInput.setCustomValidity('Invalid');
        }
        if (d == null || d == '') {
            form.fourthInput.setCustomValidity('Invalid');
        }
    } else if (!areIntegers) {
        error.innerHTML = "All inputs must be integer values.";
        input.appendChild(error);
        if (!!(a.indexOf('.') > -1)) {
            form.firstInput.setCustomValidity('Not an integer');
        }
        if (!!(b.indexOf('.') > -1)) {
            form.secondInput.setCustomValidity('Not an integer');
        }
        if (!!(c.indexOf('.') > -1)) {
            form.thirdInput.setCustomValidity('Not an integer');
        }
        if (!!(d.indexOf('.') > -1)) {
            form.fourthInput.setCustomValidity('Not an integer');
        }
    } else {
        form.firstInput.setCustomValidity('');
        form.secondInput.setCustomValidity('');
        form.thirdInput.setCustomValidity('');
        form.fourthInput.setCustomValidity('');

        var horizStart = parseInt(form.firstInput.value);
        var horizEnd = parseInt(form.secondInput.value);
        var vertStart = parseInt(form.thirdInput.value);
        var vertEnd = parseInt(form.fourthInput.value);

        console.log('Horizontal Start: ' + horizStart);
        console.log('Horizontal End: ' + horizEnd);
        console.log('Vertical Start: ' + vertStart);
        console.log('Vertical End: ' + vertEnd);

        //Check if the start is less than or equal to the end.
        //Again, this method is used to prevent short-circuiting.
        var valid2 = !!(horizStart <= horizEnd);
        valid2 = !!(vertStart <= vertEnd) && valid2;
        if (valid2) {
            var outputDiv = document.createElement("div");
            outputDiv.setAttribute("id", "formoutput_inner");
            var outputTitle = document.createElement("h1");
            outputTitle.innerHTML = 'Form Output: ';
            outputWrapper.appendChild(outputTitle);
            var table = document.createElement("table");
            var headerRow = document.createElement('tr');
            var th = document.createElement('th');
            th.setAttribute('id', 'emptyheader');
            th.innerHTML = '';
            headerRow.appendChild(th);
            for (var i = horizStart; i <= horizEnd; ++i) {
                var th = document.createElement('th');
                th.innerHTML = i;
                if (i === horizEnd) {
                    th.setAttribute('id', 'rightmostheader');
                }
                headerRow.appendChild(th);
            }
            table.appendChild(headerRow);
            for (var i = vertStart; i <= vertEnd; ++i) {
                var tablerow = generateTableRow(horizStart, horizEnd, i, vertEnd);
                table.appendChild(tablerow);
            }

            outputDiv.appendChild(table);
            outputWrapper.appendChild(outputDiv);
            outputWrapper.appendChild(document.createElement('br'));
        } else {
            error.innerHTML = 'Invalid input: Start is greater than end.';
            input.appendChild(error);

        }

    }
}

function generateTableRow(horizStart, horizEnd, vert, vertEnd) {
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    if (vert === vertEnd) {
        th.setAttribute('id', 'bottommostheader');
    }
    th.innerHTML = vert;
    tr.appendChild(th);
    for (var i = horizStart; i <= horizEnd; ++i) {
        var td = document.createElement('td');
        td.innerHTML = i * vert;
        tr.appendChild(td);
    }
    return tr;
}


