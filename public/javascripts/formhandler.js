$('form').on('submit', function(e){
  var $this = $(this),
      name = $this.find('[name="name"]').val(),
      email = $this.find('[name="email"]').val(),
      tel = $this.find('[name="tel"]').val(),
      remark = $this.find('[name="remark"]').val(),
      lang = $this.find('[name="lang"]').val(),
      token = $this.find('[name="token"]').val();
  if(name && email && token){
    $.post(
      $this.attr('action'),
      {name: name, email: email, tel: tel, remark: remark, token: token, lang: lang },
      function(){
        $this.children().animate(
          {opacity: 0, height: 0},
          500,
          function(){
            $this.html($this.attr('data-submitmessage'));
          }
        );
      }
    );
  }
  else{
    alert('U heeft niet alles ingevuld!');
  }
  e.preventDefault();
  return false;
});