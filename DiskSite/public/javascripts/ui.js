﻿var courseData = {
  FirstName: null,
  LastName: null,
  Course: null,
  Holes: []
};

(function (window, document) {
  
  var layout = document.getElementById('layout'),
      menu = document.getElementById('menu'),
      menuLink = document.getElementById('menuLink');
  
  function toggleClass(element, className) {
    var classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;
    
    for (; i < length; i++) {
      if (classes[i] === className) {
        classes.splice(i, 1);
        break;
      }
    }
    // The className is not found
    if (length === classes.length) {
      classes.push(className);
    }
    
    element.className = classes.join(' ');
  }
  
  menuLink.onclick = function (e) {
    var active = 'active';
    
    e.preventDefault();
    toggleClass(layout, active);
    toggleClass(menu, active);
    toggleClass(menuLink, active);
  };

}(this, this.document));

$('#SubmitStart').click(function (e) {
  e.preventDefault();
  
  var _firstName = $('#firstName');
  var _lastName = $('#lastName');
  var _course = $('#courseName');
  
  courseData.FirstName = _firstName.val();
  courseData.LastName = _lastName.val();
  courseData.Course = _course.val();
  $('#StartForm').fadeOut();
  $('#HoleForm').fadeIn();
});
$('#nextHole').click(function (e) {
  e.preventDefault();

  var _hole = $('#hole');
  var _score = $('#score');
  var _par = $('#par');

  courseData.Holes.push({ Hole: parseInt(_hole.val()), Score: parseInt(_score.val()), Par: parseInt(_par.val()) });

  _hole.val(parseInt(_hole.val()) + 1);
  _score.val(3);
  _par.val(3);
});
$('#saveCourse').click(function (e) {
  e.preventDefault();
  var _url = '/api/scores';
  $.ajax({
    "url": _url,
    "method": "POST",
    "contentType": 'application/json',
    "dataType": 'json',
    "data": JSON.stringify(courseData),
    "error": function (data) {
      if (data.error) {
        alert(data.message);
      }
    },
    "success": function (data) {
      alert('Saved')
    }
  });

  courseData = {
    FirstName: null,
    LastName: null,
    Course: null,
    Holes: []
  };
});
$('.btn-number').click(function (e) {
  e.preventDefault();
  
  fieldName = $(this).attr('data-field');
  type = $(this).attr('data-type');
  var input = $("input[name='" + fieldName + "']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if (type == 'minus') {
      
      if (currentVal > input.attr('min')) {
        input.val(currentVal - 1).change();
      }
      if (parseInt(input.val()) == input.attr('min')) {
        $(this).attr('disabled', true);
      }

    } else if (type == 'plus') {
      
      if (currentVal < input.attr('max')) {
        input.val(currentVal + 1).change();
      }
      if (parseInt(input.val()) == input.attr('max')) {
        $(this).attr('disabled', true);
      }

    }
  } else {
    input.val(0);
  }
});
$('.input-number').focusin(function () {
  $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function () {
  
  minValue = parseInt($(this).attr('min'));
  maxValue = parseInt($(this).attr('max'));
  valueCurrent = parseInt($(this).val());
  
  name = $(this).attr('name');
  if (valueCurrent >= minValue) {
    $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
  } else {
    alert('Sorry, the minimum value was reached');
    $(this).val($(this).data('oldValue'));
  }
  if (valueCurrent <= maxValue) {
    $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
  } else {
    alert('Sorry, the maximum value was reached');
    $(this).val($(this).data('oldValue'));
  }
    
    
});
$(".input-number").keydown(function (e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});