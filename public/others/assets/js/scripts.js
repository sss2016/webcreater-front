
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */    
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
        e.preventDefault();
    	
    	$(this).find('form-control').each(function(){

    		if( $(this).val() == "" ) {
    			
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
        });
        var form = $(this);
        $.ajax(
                {
                    url: form.attr("action"),
                    type: 'post',
                    data: form.serialize(),
                    dataType: "json",
                    success: function (data)
                    {
                        $("#article").html(data);
                    }
                }
            );
        });
    
    
});
