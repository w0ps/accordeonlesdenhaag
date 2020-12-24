$('ul#menu li').on('click', function(){
  $(this).find('a').trigger('click');
});

$('ul#menu a').on('click', function(){
  var href = $(this).attr('href')
  $('section:visible').fadeOut(function(){
    $(href).fadeIn();
  });
  return false;
});

$('#switchNl').on('click', function(){
  $(document.body).removeClass('en').addClass('nl');
  setNavWidth();
  //$('a[href=#accordion]').trigger('click');
});

$('#switchEn').on('click', function(){
  $(document.body).removeClass('nl').addClass('en');
  setNavWidth();
  //$('a[href=#accordion]').trigger('click');
});

function setNavWidth(){
  var width = 0;
  $('ul#menu li').each(function(i,o){
    var $this = $(this);
    width += $this.outerWidth() + parseInt($this.css('margin-left'), 10);
  });
  $('ul#menu').width(width);
  $('#menuwrap').width(width);
  $('#wrapper').width(width);
}

//$(document).ready(function(){setNavWidth(); });